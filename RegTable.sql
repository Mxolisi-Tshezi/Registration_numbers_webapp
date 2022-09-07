CREATE TABLE Towns (
    id serial primary key, 
    town_name text not null
    );


INSERT INTO Towns(town_name) VALUES ('CA'),('CL'),('CY');

CREATE TABLE Registration(
   id serial primary key,
   registration_num VARCHAR(255) not null,
   town_id integer not null,
   FOREIGN KEY(town_id) REFERENCES Towns(id)
);