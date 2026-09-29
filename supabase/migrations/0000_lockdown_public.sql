-- El esquema public pertenece a otra aplicación (Estratega v2, que se conecta como postgres vía Prisma).
-- Se retira el acceso de los roles de la API para que la clave pública de Sideral no pueda leerlo.
revoke all on all tables in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;
revoke all on all functions in schema public from anon, authenticated;
alter default privileges for role postgres in schema public revoke all on tables from anon, authenticated;
alter default privileges for role postgres in schema public revoke all on sequences from anon, authenticated;
alter default privileges for role postgres in schema public revoke all on functions from anon, authenticated;
