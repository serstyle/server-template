const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');
const jwt = require('jsonwebtoken')

//route
const signin = require('./controllers/signin');
const register = require('./controllers/register');

const app = express()

const db = knex({
    client: 'pg',
    connection: process.env.POSTGRES_URI
  });

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.send('start');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)});

app.post('/profile', verifyToken, (req, res) => { 
    // use redis verify the token and also jwt.verify  
    //If there is token, id so ok 
    jwt.verify(req.token, 'tokensecret', (err, authData)=>{
        if(err){
            res.status(403).send('oopsie')
        }
        else{
            db.select('*').from('users')
            .where('email', '=', authData.email)
            .then(resp => res.json(resp[0]))
        }
    }) 
});

function verifyToken(req, res, next){
    const barearHeader = req.headers['authorization'];
    if(barearHeader){
        const barear = barearHeader.split(' ');
        const barearToken = barear[1];
        req.token = barearToken;
        next();
    }
    else{
        res.status(403).send('not good')
    }
}

app.listen(3000, ()=>{
    console.log('server on 3000');
});