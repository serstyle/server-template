const redis = require('redis');
const redisClient = require('./signin').redisClient;

const handleSignout = (req, res) => {
    const {authorization} = req.headers;
    delToken(authorization)
    .then(resp => res.json(resp))
    .catch(err => console.log(err))
}

const delToken=(token) =>{
    return Promise.resolve(redisClient.del(token));
}

module.exports = { handleSignout }