const jwt = require('jsonwebtoken');

const handleSignin = (req, res, db, bcrypt) =>{
    const {email, hash} = req.body;
    db.select('*').from('login')
    .where('email', '=', email)
    .then(data => {
        console.log(data)
        if(hash === data[0].hash){
            db.select('*').from('users')
            .where('email', '=', email)
            .then(user => res.json(setToken(user[0].email)))
            .catch(err => Promise.reject(err))
        } 
        else {
            Promise.reject('wrong credentials')
      }
    })
}

//put the token in a redis db with id and token
const setToken = (email) =>{
   return jwt.sign({email}, 'tokensecret', { expiresIn : '120sec' })
}

module.exports = { handleSignin };