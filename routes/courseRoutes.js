const {Router}  = require("express");

const courseRoute = Router();

courseRoute.get('/purchased', (req, res) => {
    res.send("list of ur purchased course")
})


courseRoute.get('/allCourse', (req, res)=> {
    res.send("list of all course");
})


module.exports = {
    courseRoute : courseRoute
}