const express = require('express')
const router = express.Router()
const User = require('../modals/user')
const rounds = 10
const url = require('url')
const axios = require('axios');

const jwt = require('jsonwebtoken')
const tokenSecret = "RANDOM-SECRET-HERE"

const middleware = require('../middleware')


router.get('/login', (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user) res.status(404).json({error: 'no user with that email was found'})
        else {
            bcrypt.compare(req.body.password, user.password, (error, match) => {
                if (error) res.status(500).json(error)
                else if (match) res.status(200).json({token: generateToken(user)})
                else res.status(403).json({error: 'Password does not match'})
            })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })

});

router.get('/jwt-test', middleware.verify, (req, res) => {
    res.status(200).json(req.user)
})

router.post('/signup', (req, res) => {
            const newUser = User({email: req.body.email, password: hash})
            newUser.save()
            .then(user => {
                res.status(200).json(user)
            })
            .catch(error => {
                res.status(500).json(error)
    })
});


function generateToken(user){
    return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'})
}

module.exports = router
