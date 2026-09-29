-- Sideral: simulador de negocios. Todo vive en el esquema "sideral" para no mezclarse
-- con otras aplicaciones del mismo proyecto de Supabase.

create schema if not exists sideral;
grant usage on schema sideral to anon, authenticated, service_role;

-- ---------------------------------------------------------------------------
-- Perfiles
-- ---------------------------------------------------------------------------
create table if not exists sideral.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique check (username ~ '^[a-z0-9_.]{3,24}$'),
  display_name text not null check (char_length(display_name) between 2 and 40),
  avatar text not null default 'orbita',
  role text not null default 'estudiante' check (role in ('estudiante', 'docente', 'admin')),
  institution text check (institution is null or char_length(institution) <= 80),
  xp integer not null default 0,
  level integer not null default 1,
  streak integer not null default 0,
  best_streak integer not null default 0,
  last_active date,
  week_key text,
  weekly_xp integer not null default 0,
  league integer not null default 1,
  games_played integer not null default 0,
  games_won integer not null default 0,
  best_score integer not null default 0,
  onboarded boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists profiles_weekly_idx on sideral.profiles (week_key, weekly_xp desc);
create index if not exists profiles_xp_idx on sideral.profiles (xp desc);

-- ---------------------------------------------------------------------------
-- Aulas (grupos de un docente)
-- ---------------------------------------------------------------------------
create table if not exists sideral.classrooms (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null check (char_length(name) between 2 and 60),
  teacher_id uuid not null references sideral.profiles (id) on delete cascade,
  institution text,
  created_at timestamptz not null default now()
);
create table if not exists sideral.classroom_members (
  classroom_id uuid not null references sideral.classrooms (id) on delete cascade,
  user_id uuid not null references sideral.profiles (id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (classroom_id, user_id)
);
create index if not exists classroom_members_user_idx on sideral.classroom_members (user_id);

-- ---------------------------------------------------------------------------
-- Partidas
-- ---------------------------------------------------------------------------
create table if not exists sideral.games (
  id uuid primary key default gen_random_uuid(),
  code text unique,
  name text not null,
  mode text not null check (mode in ('libre', 'carrera', 'sala', 'torneo', 'duelo')),
  status text not null default 'activa' check (status in ('lobby', 'activa', 'finalizada', 'cancelada')),
  host_id uuid not null references sideral.profiles (id) on delete cascade,
  classroom_id uuid references sideral.classrooms (id) on delete set null,
  industry text not null,
  difficulty integer not null check (difficulty between 1 and 4),
  total_rounds integer not null check (total_rounds between 1 and 16),
  round integer not null default 1,
  config jsonb not null default '{}'::jsonb,
  state jsonb,
  history jsonb not null default '[]'::jsonb,
  deadline timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  finished_at timestamptz
);
create index if not exists games_host_idx on sideral.games (host_id, updated_at desc);
create index if not exists games_classroom_idx on sideral.games (classroom_id);

-- Guion oculto de la partida (noticias y situaciones de cada trimestre). Solo el servidor lo lee.
create table if not exists sideral.game_secrets (
  game_id uuid primary key references sideral.games (id) on delete cascade,
  script jsonb not null
);

create table if not exists sideral.companies (
  id uuid primary key default gen_random_uuid(),
  game_id uuid not null references sideral.games (id) on delete cascade,
  idx integer,
  name text not null check (char_length(name) between 2 and 32),
  color text not null default '#f5f5f7',
  created_at timestamptz not null default now(),
  unique (game_id, idx)
);
create index if not exists companies_game_idx on sideral.companies (game_id);

create table if not exists sideral.company_members (
  company_id uuid not null references sideral.companies (id) on delete cascade,
  game_id uuid not null references sideral.games (id) on delete cascade,
  user_id uuid not null references sideral.profiles (id) on delete cascade,
  role text not null default 'miembro' check (role in ('lider', 'miembro')),
  joined_at timestamptz not null default now(),
  primary key (company_id, user_id),
  unique (game_id, user_id)
);
create index if not exists company_members_user_idx on sideral.company_members (user_id);

create table if not exists sideral.decisions (
  company_id uuid not null references sideral.companies (id) on delete cascade,
  game_id uuid not null references sideral.games (id) on delete cascade,
  round integer not null,
  data jsonb not null default '{}'::jsonb,
  forecast jsonb,
  intel jsonb,
  submitted boolean not null default false,
  submitted_by uuid,
  submitted_at timestamptz,
  updated_by uuid,
  updated_at timestamptz not null default now(),
  primary key (company_id, round)
);
create index if not exists decisions_game_idx on sideral.decisions (game_id, round);

create table if not exists sideral.rounds (
  game_id uuid not null references sideral.games (id) on delete cascade,
  round integer not null,
  result jsonb not null,
  created_at timestamptz not null default now(),
  primary key (game_id, round)
);

-- ---------------------------------------------------------------------------
-- Progreso y gamificación
-- ---------------------------------------------------------------------------
create table if not exists sideral.xp_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references sideral.profiles (id) on delete cascade,
  amount integer not null,
  reason text not null,
  ref text not null,
  meta jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, ref)
);
create index if not exists xp_events_user_idx on sideral.xp_events (user_id, created_at desc);

create table if not exists sideral.achievements (
  user_id uuid not null references sideral.profiles (id) on delete cascade,
  key text not null,
  earned_at timestamptz not null default now(),
  primary key (user_id, key)
);

create table if not exists sideral.missions (
  user_id uuid not null references sideral.profiles (id) on delete cascade,
  mission_id text not null,
  stars integer not null default 0 check (stars between 0 and 3),
  best_score integer not null default 0,
  attempts integer not null default 0,
  completed_at timestamptz,
  primary key (user_id, mission_id)
);

create table if not exists sideral.daily (
  user_id uuid not null references sideral.profiles (id) on delete cascade,
  day date not null,
  kind text not null check (kind in ('trivia', 'dilema', 'foda', 'equilibrio')),
  score integer not null default 0,
  data jsonb,
  created_at timestamptz not null default now(),
  primary key (user_id, day, kind)
);

create table if not exists sideral.tournaments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  industry text not null,
  difficulty integer not null check (difficulty between 1 and 4),
  rounds integer not null check (rounds between 1 and 16),
  seed integer not null,
  config jsonb not null default '{}'::jsonb,
  classroom_id uuid references sideral.classrooms (id) on delete cascade,
  created_by uuid references sideral.profiles (id) on delete set null,
  official boolean not null default false,
  starts_at timestamptz not null default now(),
  ends_at timestamptz not null,
  created_at timestamptz not null default now()
);
create index if not exists tournaments_ends_idx on sideral.tournaments (ends_at desc);

create table if not exists sideral.tournament_entries (
  tournament_id uuid not null references sideral.tournaments (id) on delete cascade,
  user_id uuid not null references sideral.profiles (id) on delete cascade,
  game_id uuid references sideral.games (id) on delete set null,
  score integer not null default 0,
  finished boolean not null default false,
  finished_at timestamptz,
  created_at timestamptz not null default now(),
  primary key (tournament_id, user_id)
);
create index if not exists tournament_entries_rank_idx on sideral.tournament_entries (tournament_id, score desc);

create table if not exists sideral.duels (
  id uuid primary key default gen_random_uuid(),
  challenger uuid not null references sideral.profiles (id) on delete cascade,
  opponent uuid not null references sideral.profiles (id) on delete cascade,
  industry text not null,
  difficulty integer not null,
  rounds integer not null,
  seed integer not null,
  challenger_game uuid references sideral.games (id) on delete set null,
  opponent_game uuid references sideral.games (id) on delete set null,
  challenger_score integer,
  opponent_score integer,
  status text not null default 'pendiente' check (status in ('pendiente', 'en_juego', 'finalizado', 'rechazado', 'vencido')),
  winner uuid,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '7 days'
);
create index if not exists duels_users_idx on sideral.duels (opponent, status);
create index if not exists duels_challenger_idx on sideral.duels (challenger, status);

create table if not exists sideral.notifications (
  id bigint generated always as identity primary key,
  user_id uuid not null references sideral.profiles (id) on delete cascade,
  kind text not null,
  title text not null,
  body text,
  link text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists notifications_user_idx on sideral.notifications (user_id, read, created_at desc);

-- ---------------------------------------------------------------------------
-- Funciones de apoyo
-- ---------------------------------------------------------------------------
create or replace function sideral.level_for(p_xp integer) returns integer
language sql immutable as $$
  select greatest(1, floor(power(greatest(p_xp, 0)::numeric / 100, 0.625))::integer + 1);
$$;

create or replace function sideral.week_key(p_day date) returns text
language sql immutable as $$
  select to_char(p_day, 'IYYY-"S"IW');
$$;

create or replace function sideral.today() returns date
language sql stable as $$
  select (now() at time zone 'America/Lima')::date;
$$;

create or replace function sideral.is_member(p_game uuid) returns boolean
language sql stable security definer set search_path = sideral, public as $$
  select exists (select 1 from sideral.company_members m where m.game_id = p_game and m.user_id = auth.uid());
$$;

create or replace function sideral.is_host(p_game uuid) returns boolean
language sql stable security definer set search_path = sideral, public as $$
  select exists (select 1 from sideral.games g where g.id = p_game and g.host_id = auth.uid());
$$;

create or replace function sideral.is_company_member(p_company uuid) returns boolean
language sql stable security definer set search_path = sideral, public as $$
  select exists (select 1 from sideral.company_members m where m.company_id = p_company and m.user_id = auth.uid());
$$;

create or replace function sideral.in_classroom(p_classroom uuid) returns boolean
language sql stable security definer set search_path = sideral, public as $$
  select exists (select 1 from sideral.classroom_members m where m.classroom_id = p_classroom and m.user_id = auth.uid())
      or exists (select 1 from sideral.classrooms c where c.id = p_classroom and c.teacher_id = auth.uid());
$$;

create or replace function sideral.teaches(p_user uuid) returns boolean
language sql stable security definer set search_path = sideral, public as $$
  select exists (
    select 1 from sideral.classroom_members m
    join sideral.classrooms c on c.id = m.classroom_id
    where m.user_id = p_user and c.teacher_id = auth.uid()
  );
$$;

create or replace function sideral.round_is_open(p_game uuid, p_round integer) returns boolean
language sql stable security definer set search_path = sideral, public as $$
  select exists (select 1 from sideral.games g where g.id = p_game and g.status = 'activa' and g.round = p_round);
$$;

-- Crea el perfil cuando alguien se registra.
create or replace function sideral.handle_new_user() returns trigger
language plpgsql security definer set search_path = sideral, public as $$
declare
  v_name text;
  v_user text;
  v_role text;
begin
  if coalesce(new.raw_user_meta_data ->> 'app', '') <> 'sideral' then
    return new;
  end if;
  v_name := left(coalesce(nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''), split_part(new.email, '@', 1)), 40);
  if char_length(v_name) < 2 then v_name := 'Gerente'; end if;
  v_user := left(regexp_replace(lower(split_part(new.email, '@', 1)), '[^a-z0-9_.]', '', 'g'), 16);
  if char_length(v_user) < 3 then v_user := 'gerente'; end if;
  v_user := v_user || '_' || substr(md5(new.id::text), 1, 4);
  v_role := case when new.raw_user_meta_data ->> 'role' = 'docente' then 'docente' else 'estudiante' end;
  insert into sideral.profiles (id, username, display_name, role, institution)
  values (new.id, v_user, v_name, v_role, nullif(left(trim(coalesce(new.raw_user_meta_data ->> 'institution', '')), 80), ''))
  on conflict (id) do nothing;
  return new;
exception when others then
  return new;
end;
$$;

drop trigger if exists sideral_on_auth_user_created on auth.users;
create trigger sideral_on_auth_user_created
  after insert on auth.users
  for each row execute function sideral.handle_new_user();

-- Suma experiencia una sola vez por referencia. Actualiza nivel, racha, semana y liga.
create or replace function sideral.award_xp(
  p_user uuid,
  p_amount integer,
  p_reason text,
  p_ref text,
  p_meta jsonb default null
) returns jsonb
language plpgsql security definer set search_path = sideral, public as $$
declare
  v_p sideral.profiles%rowtype;
  v_today date := sideral.today();
  v_week text := sideral.week_key(sideral.today());
  v_inserted integer;
  v_old_level integer;
  v_streak integer;
  v_league integer;
  v_weekly integer;
begin
  select * into v_p from sideral.profiles where id = p_user for update;
  if not found then
    return jsonb_build_object('ok', false);
  end if;

  insert into sideral.xp_events (user_id, amount, reason, ref, meta)
  values (p_user, p_amount, p_reason, p_ref, p_meta)
  on conflict (user_id, ref) do nothing;
  get diagnostics v_inserted = row_count;
  if v_inserted = 0 then
    return jsonb_build_object('ok', true, 'granted', 0, 'xp', v_p.xp, 'level', v_p.level, 'levelUp', false, 'streak', v_p.streak);
  end if;

  v_old_level := v_p.level;
  v_streak := v_p.streak;
  if v_p.last_active is null or v_p.last_active < v_today - 1 then
    v_streak := 1;
  elsif v_p.last_active = v_today - 1 then
    v_streak := v_p.streak + 1;
  end if;

  v_league := v_p.league;
  v_weekly := v_p.weekly_xp;
  if v_p.week_key is distinct from v_week then
    if v_p.week_key is not null then
      if v_p.weekly_xp >= 400 then v_league := least(5, v_p.league + 1);
      elsif v_p.weekly_xp < 60 then v_league := greatest(1, v_p.league - 1);
      end if;
    end if;
    v_weekly := 0;
  end if;

  update sideral.profiles set
    xp = xp + p_amount,
    level = sideral.level_for(xp + p_amount),
    streak = v_streak,
    best_streak = greatest(best_streak, v_streak),
    last_active = v_today,
    week_key = v_week,
    weekly_xp = v_weekly + p_amount,
    league = v_league
  where id = p_user
  returning * into v_p;

  return jsonb_build_object(
    'ok', true, 'granted', p_amount, 'xp', v_p.xp, 'level', v_p.level,
    'levelUp', v_p.level > v_old_level, 'streak', v_p.streak, 'league', v_p.league
  );
end;
$$;

-- Guarda el resultado de un trimestre y avanza la partida en una sola transacción.
create or replace function sideral.commit_round(
  p_game uuid,
  p_round integer,
  p_state jsonb,
  p_result jsonb,
  p_history jsonb,
  p_finished boolean,
  p_deadline timestamptz,
  p_intel jsonb default '[]'::jsonb
) returns boolean
language plpgsql security definer set search_path = sideral, public as $$
declare
  v_updated integer;
  v_item jsonb;
begin
  update sideral.games set
    state = p_state,
    round = p_round + 1,
    history = history || p_history,
    status = case when p_finished then 'finalizada' else status end,
    finished_at = case when p_finished then now() else finished_at end,
    deadline = p_deadline,
    updated_at = now()
  where id = p_game and round = p_round and status = 'activa';
  get diagnostics v_updated = row_count;
  if v_updated = 0 then
    return false;
  end if;
  insert into sideral.rounds (game_id, round, result) values (p_game, p_round, p_result);
  update sideral.decisions set submitted = true where game_id = p_game and round = p_round;
  if not p_finished then
    for v_item in select * from jsonb_array_elements(coalesce(p_intel, '[]'::jsonb)) loop
      insert into sideral.decisions (company_id, game_id, round, intel)
      values ((v_item ->> 'company_id')::uuid, p_game, p_round + 1, v_item -> 'intel')
      on conflict (company_id, round) do update set intel = excluded.intel;
    end loop;
  end if;
  return true;
end;
$$;

create or replace function sideral.touch_decision() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  new.updated_by := coalesce(auth.uid(), new.updated_by);
  if new.submitted and (tg_op = 'INSERT' or not old.submitted) then
    new.submitted_at := now();
    new.submitted_by := coalesce(auth.uid(), new.submitted_by);
  end if;
  return new;
end;
$$;
drop trigger if exists decisions_touch on sideral.decisions;
create trigger decisions_touch before insert or update on sideral.decisions
  for each row execute function sideral.touch_decision();

-- ---------------------------------------------------------------------------
-- Permisos y seguridad por fila
-- ---------------------------------------------------------------------------
revoke all on all tables in schema sideral from anon, authenticated;
grant all on all tables in schema sideral to service_role;
grant all on all sequences in schema sideral to service_role;
alter default privileges in schema sideral grant all on tables to service_role;
alter default privileges in schema sideral grant all on sequences to service_role;

grant select on
  sideral.profiles, sideral.classrooms, sideral.classroom_members, sideral.games, sideral.companies,
  sideral.company_members, sideral.decisions, sideral.rounds, sideral.xp_events, sideral.achievements,
  sideral.missions, sideral.daily, sideral.tournaments, sideral.tournament_entries, sideral.duels,
  sideral.notifications
to authenticated;
grant update (username, display_name, avatar, institution, onboarded) on sideral.profiles to authenticated;
grant insert (company_id, game_id, round, data, forecast, submitted) on sideral.decisions to authenticated;
grant update (data, forecast, submitted) on sideral.decisions to authenticated;
grant update (read) on sideral.notifications to authenticated;

revoke execute on all functions in schema sideral from public, anon;
grant execute on function
  sideral.is_member(uuid), sideral.is_host(uuid), sideral.is_company_member(uuid), sideral.in_classroom(uuid),
  sideral.teaches(uuid), sideral.round_is_open(uuid, integer), sideral.level_for(integer), sideral.week_key(date), sideral.today()
to authenticated;
grant execute on all functions in schema sideral to service_role;

alter table sideral.profiles enable row level security;
alter table sideral.classrooms enable row level security;
alter table sideral.classroom_members enable row level security;
alter table sideral.games enable row level security;
alter table sideral.game_secrets enable row level security;
alter table sideral.companies enable row level security;
alter table sideral.company_members enable row level security;
alter table sideral.decisions enable row level security;
alter table sideral.rounds enable row level security;
alter table sideral.xp_events enable row level security;
alter table sideral.achievements enable row level security;
alter table sideral.missions enable row level security;
alter table sideral.daily enable row level security;
alter table sideral.tournaments enable row level security;
alter table sideral.tournament_entries enable row level security;
alter table sideral.duels enable row level security;
alter table sideral.notifications enable row level security;

do $$
declare r record;
begin
  for r in select policyname, tablename from pg_policies where schemaname = 'sideral' loop
    execute format('drop policy %I on sideral.%I', r.policyname, r.tablename);
  end loop;
end $$;

create policy profiles_read on sideral.profiles for select to authenticated using (true);
create policy profiles_update on sideral.profiles for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));

create policy classrooms_read on sideral.classrooms for select to authenticated
  using (teacher_id = (select auth.uid()) or sideral.in_classroom(id));
create policy classroom_members_read on sideral.classroom_members for select to authenticated
  using (user_id = (select auth.uid()) or sideral.in_classroom(classroom_id));

create policy games_read on sideral.games for select to authenticated
  using (host_id = (select auth.uid()) or sideral.is_member(id));
create policy companies_read on sideral.companies for select to authenticated
  using (sideral.is_member(game_id) or sideral.is_host(game_id));
create policy company_members_read on sideral.company_members for select to authenticated
  using (user_id = (select auth.uid()) or sideral.is_member(game_id) or sideral.is_host(game_id));
create policy rounds_read on sideral.rounds for select to authenticated
  using (sideral.is_member(game_id) or sideral.is_host(game_id));

create policy decisions_read on sideral.decisions for select to authenticated
  using (sideral.is_company_member(company_id) or sideral.is_host(game_id));
create policy decisions_insert on sideral.decisions for insert to authenticated
  with check (sideral.is_company_member(company_id) and sideral.round_is_open(game_id, round));
create policy decisions_update on sideral.decisions for update to authenticated
  using (sideral.is_company_member(company_id) and sideral.round_is_open(game_id, round))
  with check (sideral.is_company_member(company_id) and sideral.round_is_open(game_id, round));

create policy xp_read on sideral.xp_events for select to authenticated using (user_id = (select auth.uid()));
create policy achievements_read on sideral.achievements for select to authenticated using (true);
create policy missions_read on sideral.missions for select to authenticated
  using (user_id = (select auth.uid()) or sideral.teaches(user_id));
create policy daily_read on sideral.daily for select to authenticated using (user_id = (select auth.uid()));
create policy tournaments_read on sideral.tournaments for select to authenticated
  using (classroom_id is null or sideral.in_classroom(classroom_id));
create policy tournament_entries_read on sideral.tournament_entries for select to authenticated using (true);
create policy duels_read on sideral.duels for select to authenticated
  using (challenger = (select auth.uid()) or opponent = (select auth.uid()));
create policy notifications_read on sideral.notifications for select to authenticated using (user_id = (select auth.uid()));
create policy notifications_update on sideral.notifications for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
