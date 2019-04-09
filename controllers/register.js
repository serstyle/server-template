const jwt = require('jsonwebtoken');
const redis = require('redis');
const redisClient = require('./signin').redisClient;

const handleRegister = (req, res, db, bcrypt) =>{
    const {name, email, hash} = req.body
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const password = bcrypt.hashSync(hash, salt);
    console.log(password)
    return db.transaction(trx =>{
        trx.insert({hash:password, email})
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email:loginEmail[0],
                name: name
            })
            .then(data => data[0])
            .catch(err => console.log(err))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
}

// add jwt when register for two days
//create a session with token
const createSession = (user) => {
    //JWT Token return user id
    const {id, email} = user;
    const token = signToken(email);
    return setToken(token, id)
    .then(()=>{
      return {success:'true', userId: id, token}
    })
    .catch(console.log)
  }
  //create the token for the session 
  const signToken = ( email ) =>{
    const jwtPayload = { email };
    return jwt.sign(jwtPayload, 'JWT_SECRET', {expiresIn:'2 days'});
  }
  
  //set token in the redis db
  const setToken = (token, id) => {
    return Promise.resolve(redisClient.set(token, id))
  }

// authenticate
  const registerAuthentication = (req, res, db, bcrypt) =>{
    return handleRegister(req, res, db, bcrypt)
    .then(data => {
      return data.id && data.email ?
      createSession(data):Promise.reject(data)
    })
    .then(session => res.json(session))
    .catch(err => res.status(400).json('error'))
  }


module.exports = {registerAuthentication};