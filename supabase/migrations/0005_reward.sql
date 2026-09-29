-- Una sola llamada registra todo lo que gana una persona: experiencia, racha, liga,
-- estadísticas, misión e insignias. Antes eran entre 8 y 12 viajes a la base de datos.
create or replace function sideral.reward(
  p_user uuid,
  p_events jsonb,
  p_keys text[],
  p_rules jsonb,
  p_ach_xp jsonb,
  p_counters jsonb default '{}'::jsonb,
  p_sets jsonb default '{}'::jsonb,
  p_finish jsonb default null,
  p_mission jsonb default null
) returns jsonb
language plpgsql security definer set search_path = sideral, public as $$
declare
  v_p sideral.profiles%rowtype;
  v_today date := sideral.today();
  v_week text := sideral.week_key(sideral.today());
  v_stats jsonb;
  v_key text;
  v_val jsonb;
  v_list jsonb;
  v_event jsonb;
  v_rows integer;
  v_granted jsonb := '[]'::jsonb;
  v_total integer := 0;
  v_level_before integer;
  v_streak integer;
  v_league integer;
  v_weekly integer;
  v_prev_stars integer := 0;
  v_prev_best integer := 0;
  v_prev_attempts integer := 0;
  v_prev_done timestamptz;
  v_new_stars integer := 0;
  v_mission jsonb := null;
  v_missions_done integer := 0;
  v_rule jsonb;
  v_value numeric;
  v_keys text[] := coalesce(p_keys, array[]::text[]);
  v_new text[] := array[]::text[];
  v_amount integer;
begin
  select * into v_p from sideral.profiles where id = p_user for update;
  if not found then
    return jsonb_build_object('ok', false);
  end if;
  v_level_before := v_p.level;
  v_stats := v_p.stats;

  -- Estadísticas
  for v_key, v_val in select * from jsonb_each(coalesce(p_counters, '{}'::jsonb)) loop
    v_stats := jsonb_set(v_stats, array[v_key], to_jsonb(coalesce((v_stats ->> v_key)::numeric, 0) + (v_val #>> '{}')::numeric));
  end loop;
  for v_key, v_val in select * from jsonb_each(coalesce(p_sets, '{}'::jsonb)) loop
    v_list := coalesce(v_stats -> v_key, '[]'::jsonb);
    if not v_list @> jsonb_build_array(v_val) then
      v_list := v_list || jsonb_build_array(v_val);
    end if;
    v_stats := jsonb_set(v_stats, array[v_key], v_list);
  end loop;

  -- Misión de la carrera
  if p_mission is not null then
    select stars, best_score, attempts, completed_at into v_prev_stars, v_prev_best, v_prev_attempts, v_prev_done
      from sideral.missions where user_id = p_user and mission_id = p_mission ->> 'id';
    v_prev_stars := coalesce(v_prev_stars, 0);
    v_new_stars := greatest(0, (p_mission ->> 'stars')::integer - v_prev_stars);
    insert into sideral.missions (user_id, mission_id, stars, best_score, attempts, completed_at)
    values (
      p_user, p_mission ->> 'id',
      greatest(v_prev_stars, (p_mission ->> 'stars')::integer),
      greatest(coalesce(v_prev_best, 0), (p_mission ->> 'score')::integer),
      coalesce(v_prev_attempts, 0) + 1,
      coalesce(v_prev_done, case when (p_mission ->> 'passed')::boolean then now() else null end)
    )
    on conflict (user_id, mission_id) do update set
      stars = excluded.stars, best_score = excluded.best_score, attempts = excluded.attempts, completed_at = excluded.completed_at;
    if v_new_stars > 0 then
      p_events := coalesce(p_events, '[]'::jsonb) || jsonb_build_array(jsonb_build_object(
        'amount', v_new_stars * 40, 'reason', 'mision',
        'ref', 'mission:' || (p_mission ->> 'id') || ':' || greatest(v_prev_stars, (p_mission ->> 'stars')::integer)
      ));
    end if;
    v_mission := jsonb_build_object('prevStars', v_prev_stars, 'newStars', v_new_stars);
  end if;
  select count(*) into v_missions_done from sideral.missions where user_id = p_user and stars > 0;

  -- Experiencia (cada referencia cuenta una sola vez)
  for v_event in select * from jsonb_array_elements(coalesce(p_events, '[]'::jsonb)) loop
    v_amount := greatest(0, (v_event ->> 'amount')::integer);
    insert into sideral.xp_events (user_id, amount, reason, ref, meta)
    values (p_user, v_amount, v_event ->> 'reason', v_event ->> 'ref', v_event -> 'meta')
    on conflict (user_id, ref) do nothing;
    get diagnostics v_rows = row_count;
    if v_rows > 0 then
      v_total := v_total + v_amount;
      v_granted := v_granted || jsonb_build_array(jsonb_build_object('ref', v_event ->> 'ref', 'reason', v_event ->> 'reason', 'amount', v_amount));
    end if;
  end loop;

  -- Racha, semana y liga
  v_streak := v_p.streak;
  v_league := v_p.league;
  v_weekly := v_p.weekly_xp;
  if v_total > 0 then
    if v_p.last_active is null or v_p.last_active < v_today - 1 then
      v_streak := 1;
    elsif v_p.last_active = v_today - 1 then
      v_streak := v_p.streak + 1;
    end if;
    if v_p.week_key is distinct from v_week then
      if v_p.week_key is not null then
        if v_p.weekly_xp >= 400 then v_league := least(5, v_p.league + 1);
        elsif v_p.weekly_xp < 60 then v_league := greatest(1, v_p.league - 1);
        end if;
      end if;
      v_weekly := 0;
    end if;
  end if;

  -- Insignias con condición
  for v_rule in select * from jsonb_array_elements(coalesce(p_rules, '[]'::jsonb)) loop
    v_value := case v_rule ->> 'source'
      when 'stat' then coalesce((v_stats ->> (v_rule ->> 'name'))::numeric, 0)
      when 'list' then jsonb_array_length(coalesce(v_stats -> (v_rule ->> 'name'), '[]'::jsonb))
      when 'streak' then v_streak
      when 'level' then sideral.level_for(v_p.xp + v_total)
      when 'missions' then v_missions_done
      else 0 end;
    if v_value >= (v_rule ->> 'min')::numeric then
      v_keys := array_append(v_keys, v_rule ->> 'key');
    end if;
  end loop;

  with ins as (
    insert into sideral.achievements (user_id, key)
    select p_user, k from (select distinct unnest(v_keys) as k) s
    on conflict (user_id, key) do nothing
    returning key
  )
  select coalesce(array_agg(key), array[]::text[]) into v_new from ins;

  foreach v_key in array v_new loop
    v_amount := coalesce((p_ach_xp ->> v_key)::integer, 0);
    if v_amount > 0 then
      insert into sideral.xp_events (user_id, amount, reason, ref)
      values (p_user, v_amount, 'insignia', 'ach:' || v_key)
      on conflict (user_id, ref) do nothing;
      get diagnostics v_rows = row_count;
      if v_rows > 0 then v_total := v_total + v_amount; end if;
    end if;
  end loop;

  update sideral.profiles set
    xp = xp + v_total,
    level = sideral.level_for(xp + v_total),
    streak = v_streak,
    best_streak = greatest(best_streak, v_streak),
    last_active = case when v_total > 0 then v_today else last_active end,
    week_key = case when v_total > 0 then v_week else week_key end,
    weekly_xp = case when v_total > 0 then v_weekly + v_total else weekly_xp end,
    league = v_league,
    stats = v_stats,
    games_played = games_played + case when p_finish is not null then 1 else 0 end,
    games_won = games_won + case when p_finish is not null and (p_finish ->> 'won')::boolean then 1 else 0 end,
    best_score = greatest(best_score, coalesce((p_finish ->> 'score')::integer, 0))
  where id = p_user
  returning * into v_p;

  return jsonb_build_object(
    'ok', true,
    'granted', v_granted,
    'total', v_total,
    'xp', v_p.xp,
    'level', v_p.level,
    'levelBefore', v_level_before,
    'streak', v_p.streak,
    'league', v_p.league,
    'achievements', to_jsonb(v_new),
    'stats', v_p.stats,
    'mission', v_mission
  );
end;
$$;
revoke execute on function sideral.reward(uuid, jsonb, text[], jsonb, jsonb, jsonb, jsonb, jsonb, jsonb) from public, anon, authenticated;
grant execute on function sideral.reward(uuid, jsonb, text[], jsonb, jsonb, jsonb, jsonb, jsonb, jsonb) to service_role;
