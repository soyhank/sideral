create unique index if not exists tournaments_official_name_idx on sideral.tournaments (name) where official;
alter table sideral.daily drop constraint if exists daily_kind_check;
alter table sideral.daily add constraint daily_kind_check check (kind in ('trivia', 'dilema', 'foda', 'calculo'));
