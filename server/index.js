const express = require('express')
require('dotenv').config()
const app = express()
const massive = require('massive')
const session = require('express-session')
const ctrl = require('./controller')

app.use(express.json())


//Session is a function that takes an object as the argument
const { SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //converting milliseconds into a day
    }
}))

massive(CONNECTION_STRING)
.then(database => {
    app.set('db', database)
    console.log('Database: working')
    app.listen(SERVER_PORT, () => {
        console.log(`Server: ${SERVER_PORT}`)
    })
})

app.get('/api/users', ctrl.getUsers)
app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)