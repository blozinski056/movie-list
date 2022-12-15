CREATE DATABASE movielist;

CREATE TABLE users(
  username VARCHAR(255),
  password VARCHAR(255),
  PRIMARY KEY (username)
);

CREATE TABLE movies(
  movieid INT,
  username VARCHAR(255),
  watched BOOLEAN,
  FOREIGN KEY (username) REFERENCES users (username)
);

CREATE TABLE friends(
  friend1 VARCHAR(255),
  friend2 VARCHAR(255),
  FOREIGN KEY (friend1) REFERENCES users (username),
  FOREIGN KEY (friend2) REFERENCES users (username)
);