const {Router} = require('express');
const {userModel} = require('../schema/db')
const userRoute = Router();

userRoute.post("/signup", (req, res)=>{
    res.send("you are on signup page")
})

userRoute.post('/signin', (req, res)=>{
    res.send("your are on sign in page")
})


module.exports = {
    userRoute: userRoute
}