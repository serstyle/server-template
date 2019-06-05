BEGIN TRANSACTION;

CREATE TABLE game_of_the_day (
	id serial PRIMARY KEY,
	cup VARCHAR(100),
	team_1 VARCHAR(100),
    team_2 VARCHAR(100),
    odd_1 VARCHAR(20),
    odd_x VARCHAR(20),
    odd_2 VARCHAR(20),
    game_time VARCHAR(100),
    bet_on VARCHAR(20)
);

COMMIT;