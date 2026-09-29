-- Estadísticas acumuladas del jugador y salas con varios mercados paralelos.
alter table sideral.profiles add column if not exists stats jsonb not null default '{}'::jsonb;

alter table sideral.games add column if not exists parent_id uuid references sideral.games (id) on delete cascade;
alter table sideral.games add column if not exists market integer not null default 1;
alter table sideral.games add column if not exists board jsonb not null default '[]'::jsonb;
create index if not exists games_parent_idx on sideral.games (parent_id);

-- Una sala es la partida raíz más sus mercados hijos.
create or replace function sideral.room_of(p_game uuid) returns uuid
language sql stable security definer set search_path = sideral, public as $$
  select coalesce(g.parent_id, g.id) from sideral.games g where g.id = p_game;
$$;

create or replace function sideral.in_room(p_game uuid) returns boolean
language sql stable security definer set search_path = sideral, public as $$
  select exists (
    select 1 from sideral.company_members m
    join sideral.games g on g.id = m.game_id
    where m.user_id = auth.uid() and coalesce(g.parent_id, g.id) = sideral.room_of(p_game)
  );
$$;
grant execute on function sideral.room_of(uuid), sideral.in_room(uuid) to authenticated, service_role;

-- Quien participa en una sala puede ver la ficha de la sala (no los resultados de otros mercados).
drop policy if exists games_read on sideral.games;
create policy games_read on sideral.games for select to authenticated
  using (host_id = (select auth.uid()) or sideral.is_member(id) or (parent_id is null and sideral.in_room(id)));

drop policy if exists companies_read on sideral.companies;
create policy companies_read on sideral.companies for select to authenticated
  using (sideral.is_member(game_id) or sideral.is_host(game_id) or sideral.in_room(game_id));

drop policy if exists company_members_read on sideral.company_members;
create policy company_members_read on sideral.company_members for select to authenticated
  using (user_id = (select auth.uid()) or sideral.is_member(game_id) or sideral.is_host(game_id) or sideral.in_room(game_id));

-- Suma contadores en las estadísticas del perfil.
create or replace function sideral.bump_stats(p_user uuid, p_counters jsonb, p_sets jsonb default '{}'::jsonb) returns jsonb
language plpgsql security definer set search_path = sideral, public as $$
declare
  v_stats jsonb;
  v_key text;
  v_val jsonb;
  v_list jsonb;
begin
  select stats into v_stats from sideral.profiles where id = p_user for update;
  if not found then return '{}'::jsonb; end if;
  for v_key, v_val in select * from jsonb_each(coalesce(p_counters, '{}'::jsonb)) loop
    v_stats := jsonb_set(v_stats, array[v_key], to_jsonb(coalesce((v_stats ->> v_key)::numeric, 0) + (v_val #>> '{}')::numeric));
  end loop;
  -- p_sets agrega valores a listas sin repetir, por ejemplo industrias jugadas.
  for v_key, v_val in select * from jsonb_each(coalesce(p_sets, '{}'::jsonb)) loop
    v_list := coalesce(v_stats -> v_key, '[]'::jsonb);
    if not v_list @> jsonb_build_array(v_val) then
      v_list := v_list || jsonb_build_array(v_val);
    end if;
    v_stats := jsonb_set(v_stats, array[v_key], v_list);
  end loop;
  update sideral.profiles set stats = v_stats where id = p_user;
  return v_stats;
end;
$$;
revoke execute on function sideral.bump_stats(uuid, jsonb, jsonb) from public, anon, authenticated;
grant execute on function sideral.bump_stats(uuid, jsonb, jsonb) to service_role;
