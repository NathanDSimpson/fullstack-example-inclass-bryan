insert into user_login (username, password) -- this is our hashed password
values (
    ${username},
    ${hash}
)
returning username, password; -- Return these so we can put them onto our session

insert into users 
(firstname, lastname, email)
values (
    ${firstname},
    ${lastname},
    ${email}
);

insert into balances
(balance)
values (
    0
) 
returning balance_id; -- so we can use this in our javascript. This should be the same id for all three tables.