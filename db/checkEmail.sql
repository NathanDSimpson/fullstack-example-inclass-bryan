
-- we use count this function returns a 1 if use exists, else 0
select count(*) from users
where email = ${email};