select firstname, lastname, email, balance 
from users
join balances
on users.user_id = balances.balance_id
where users.user_id = ${id}; 
--CRUCIAL that we have the same id across all three tables, 
--so everything refers to the same person/account