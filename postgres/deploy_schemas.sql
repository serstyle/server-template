-- Deploy fresh db tables

\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/login.sql'
\i '/docker-entrypoint-initdb.d/tables/game_of_the_day.sql'

\i '/docker-entrypoint-initdb.d/seed/seed.sql'