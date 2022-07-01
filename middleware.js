const jwt = require('jsonwebtoken')
const tokenSecret = "portlords"

exports.verify = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) res.status(403).json({error: 'please provide a token'})
    else {
        jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
            if(err) res.status(500).json({error: 'failed to authenticate a token'})
            req.user = value.data
            next()
        })
    }
}
