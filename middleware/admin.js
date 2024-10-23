// const jwt  = require("jsonwebtoken");
const jwt = require('jsonwebtoken');

const adminMiddleware = async (req, res, next) => {
    console.log("cooke", req.cookies)
const token = await req.cookies.access_token || req.headers['accessToken']?.split(' ')[1];
if(!token){
    return res.status(403).json({
        message: "jwt token is require", error: token
    })
}
const decode = jwt.verify(token, process.env.JWT_admin)

if(decode){
    req.userId = decode.id;
    next()
}else{
     res.status(403).json({
        message: "your are not signed in"
     })
}
}

module.exports = {
    adminMiddleware: adminMiddleware
}