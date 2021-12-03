DROP DATABASE IF EXISTS bct;

CREATE DATABASE bct;

CREATE TABLE users (
    user_id uuid DEFAULT uuid_generate_v4 (),
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password_hash TEXT,
    is_verified BOOLEAN,
    verfication_string TEXT,
    role VARCHAR(30),
    base VARCHAR(30),
    brigade VARCHAR(30),
    battalion VARCHAR(30),
    company VARCHAR(5),
    squad VARCHAR(30),
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS acft (
    points integer NOT NULL,
    mdl integer,
    spt numeric(3,1),
    hrp integer,
    ltk integer,
    sdc interval(4),
    plk interval(4),
    run interval(4)
);

\copy acft(points,mdl,spt,hrp,ltk,sdc,plk,run) FROM './acftscores.csv' CSV HEADER;
