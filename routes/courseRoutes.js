const {Router}  = require("express");

const courseRoute = Router();

courseRoute.post('/purchase', (req, res) => {
    res.send("list of ur purchased course")
})


courseRoute.get('/preview', (req, res)=> {
    res.send("list of all course");
})


module.exports = {
    courseRoute : courseRoute
}