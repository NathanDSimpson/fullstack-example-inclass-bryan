-- drop table users;
-- drop table user_login;
-- drop table balances;
-- drop table ballances;

create table users (
    user_id serial primary key,
    firstname varchar(50),
    lastname varchar(50),
    email varchar(50)
);

create table user_login (
    login_id serial primary key,
    username varchar(50),
    password text
);

create table balances (
    balance_id serial primary key,
    balance integer
);

insert into user_login (username, password)
values (
    'nate_simp',
    'asdf1234'
);

insert into users (firstname, lastname, email)
values (
    'Nate',
    'Simpson',
    'NS@gmail.com'
);

insert into balances (balance)
values (0);

select * from users;
select * from balances;
select * from user_login;





