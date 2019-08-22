//const config = require("config");
const jwt = require("jsonwebtoken");
require('dotenv').config()

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    if(!token) res.status(401).json({ msg : "No token, authorizaton denied"});

    try {
        const decoded = jwt.verify(token,process.env.jwtSecret)

        req.user = decoded;
        next();
    } catch(e) {
        res.status(400).json({ msg : "Token is not Valid"});
    }
    
}

module.exports = auth;