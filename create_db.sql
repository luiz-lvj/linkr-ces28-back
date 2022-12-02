CREATE DATABASE Linkr;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT,
    username TEXT,
    avatar TEXT 
);

CREATE TABLE sessions(
    user_id INT REFERENCES users(id),
    token TEXT,
    loggedAt DATE DEFAULT NOW()
);

CREATE TABLE posts(
    id INT PRIMARY KEY,
    text TEXT,
    link TEXT,
    linkTitle TEXT,
    linkDescription TEXT,
    linkImage TEXT,
    user_id INT REFERENCES users(id)
);

CREATE TABLE likes(
    id INT PRIMARY KEY,
    user_id INT REFERENCES users(id),
    post_id INT REFERENCES posts(id),
    createdAt DATE DEFAULT NOW(),
    updatedAt DATE DEFAULT NOW()
);

CREATE TABLE hashtags(
    id INT PRIMARY KEY,
    name TEXT,
    numberOfMentions INT
);

CREATE TABLE followers(
    follower_id INT REFERENCES users(id),
    followed_id INT REFERENCES users(id)
);

CREATE TABLE comments(
    id INT PRIMARY KEY,
    user_id INT REFERENCES users(id),
    post_id INT REFERENCES posts(id),
    text TEXT
);



