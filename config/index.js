if(process.env.NODE_ENV ==="production"){

    module.exports = {
        jwtSecret:process.env.jwtSecret,
        mongoURI:process.env.mongoURI,
        emailUser:process.env.emailUser,
        emailPass:process.env.emailPass
    }
}