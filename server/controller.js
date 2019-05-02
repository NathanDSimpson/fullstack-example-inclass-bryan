const bcrypt = require('bcryptjs')


module.exports = {

    getUsers: (req, res) => {
        const db = req.app.get('db')
        db.getAllUsers().then( data => {
            res.status(200).send(data)
        })
    },

    register: async (req, res) => {
        const db = req.app.get('db')
        const { email, firstname, lastname, username, password} = req.body
        const { session } = req
        let emailTaken = await db.checkEmail({email}) 
        // checkEmail is a sql file to check if user exists in our db
        // We pass an object as the argument for our sql file/command
        emailTaken = +emailTaken[0].count 
        //checkEmail.sql returned an array with an object at index 0, containing an attribute 'count'. We turn this from string to int
        if(emailTaken !== 0) {
            return res.sendStatus(409) //stop  execution and send an error. The user already exists.
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const user_id = await db.registerUser({
            email,
            firstname,
            lastname,
            username,
            hash
        })
        session.user = {
            username,
            hash,
            login_id: user_id[0].balance_id 
        }
        res.sendStatus(200)
    },

    login: async (req, res) => {
        const db = req.app.get('db') // get access to our db
        const { session } = req // get the session object
        const {loginUsername : username} = req.body // this is destructuring w/ aliasing
        // called loginUsername because it is different than the 'username' from register
        try {
            let user = await db.login({username})  // our sql file, will return info about the user associated with the username entered
            session.user = user[0] // adding our user to the session object
            const authenticated = bcrypt.compareSync(req.body.loginPassword, user[0].password) // comparing password hashes
            if(authenticated){
                res.status(200).send({authenticated, user_id: user[0].login_id})
            } else {
                throw new Error(401)
            }
        } catch(err){
            res.sendStatus(401)
        }
    }
}