const jwt  = require("jsonwebtoken");

const userMiddleware = async (req, res, next) => {
const token = req.headers.accessToken;
const decode = jwt.verify(token, process.env.JWT_admin)

if(decode){
    req.adminId = decode.id;
    next()
}else{
     res.status(403).json({
        message: "your are not signed in"
     })
}
}

module.exports = {
    userMiddleware: userMiddleware
}