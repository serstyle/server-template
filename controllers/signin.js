const jwt = require('jsonwebtoken');
const redis = require('redis');

const redisClient = redis.createClient(process.env.REDIS_URI)

const handleSignin = (req, res, db, bcrypt) =>{
    const {email, hash} = req.body;
    return db.select('*').from('login')
    .where('email', '=', email)
    .then(data => {
        //compare the password to the hashed password
        const isValid = bcrypt.compareSync(hash, data[0].hash);
        return !isValid? Promise.reject('wrong credentials') :
            db.select('*').from('users')
            .where('email', '=', email)
            .then(user => user[0])
            .catch(err => Promise.reject(err))
    })
    .catch(err=> Promise.reject('wrong credentials') )
}


//create a session with token
const createSession = (user) => {
    //JWT Token return user id
    const {id, email} = user;
    const token = signToken(id);
    return setToken(token, id)
    .then(()=>{
      return {success:'true', userId: id, token}
    })
    .catch(console.log)
  }
  //create the token for the session 
  const signToken = ( id ) =>{
    const jwtPayload = { id };
    return jwt.sign(jwtPayload, 'JWT_SECRET', {expiresIn:'2 days'});
  }
  
  //set token in the redis db
  const setToken = (token, id) => {
    return Promise.resolve(redisClient.set(token, id))
  }

// authenticate
  const signinAuthentication = (req, res, db, bcrypt) =>{
    const {authorization} = req.headers;
    return authorization? getAuthTokenId(req, res) :
    handleSignin(req, res, db, bcrypt)
    .then(data => {
      return data.id && data.email ?
      createSession(data):Promise.reject(data)
    })
    .then(session => res.json(session))
    .catch(err => res.status(400).json('error'))
  }


  //if there already is a jwt 
    const getAuthTokenId = (req, res) => {
        const {authorization} = req.headers;
        return redisClient.get(authorization, (err, reply) =>{
          if(err || !reply) {
            return res.status(400).json('usnauthoried')
          }
          return res.json({id: reply})
        })
      }

module.exports = { signinAuthentication, redisClient };