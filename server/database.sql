-- RUNNING POSTGRES 12
-- DATABASE: perntodo
-- USER: postgres
-- PASSWORD: ---
-- PORT: 5432
-- HOST: LOCALHOST


-- CREATE DATABASE
CREATE DATABASE perntodo;

-- CREATE TABLE
CREATE TABLE todo
(
    -- Create a unique primary key field
    todo_id SERIAL PRIMARY KEY,
    -- Description Attribute with a max char len of 255
    description VARCHAR(255)
);