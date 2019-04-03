BEGIN TRANSACTION;

INSERT INTO users (name, email) values ('francois', 'francois@gmail.com');
INSERT INTO login (email, hash) values ('francois@gmail.com', 'test');

COMMIT;