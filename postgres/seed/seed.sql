BEGIN TRANSACTION;

INSERT INTO users (name, email) values ('francois', 'francois@gmail.com');
INSERT INTO login (email, hash) values ('francois@gmail.com', '$2a$10$NPG6/GjaTVa0I.npy7YSTeeAxJK0rbEFXPBIuxR2Hf/zigNPY22Ia');
INSERT INTO users (name, email) values ('a', 'a@a.com');
INSERT INTO login (email, hash) values ('a@a.com', '$2a$10$NPG6/GjaTVa0I.npy7YSTeeAxJK0rbEFXPBIuxR2Hf/zigNPY22Ia'); 

-- hash = test

COMMIT;