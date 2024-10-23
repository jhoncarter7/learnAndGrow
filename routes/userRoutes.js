const { Router } = require('express');
const { userModel } = require('../schema/db')
const userRoute = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod')



userRoute.post("/signup", async (req, res) => {

    const signupBody = z.object({
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(3).max(100),
        userName: z.string().min(3).toLowerCase(),
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(100)

    })

    const parseDataWithSuccess = signupBody.safeParse(req.body)
    if (!parseDataWithSuccess.success) {
        res.json({
            message: "incorrect formate",
            error: parseDataWithSuccess.error,

        })
    }
    const { userName, email, password, firstName, lastName } = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ firstName, lastName, userName, email, password: hashPassword })
        const savedUser = await user.save()
        res.json(savedUser);
    } catch (error) {
        res.json(error)
    }

})

userRoute.post('/signin', async (req, res) => {

    const signinBody = z.object({
        email: z.string().email(),
        userName: z.string().toLowerCase(),
        password: z.string()
    })

    const parseDataWithSuccess = signinBody.safeParse(req.body)

    if (!parseDataWithSuccess.success) {
        res.json({
            message: "email or password is incorrect",
            error: parseDataWithSuccess.error

        })
    }
    const { email, password, userName } = req.body;

    try {
        const userExist = await userModel.findOne({ $or: [{ email }, { userName }] });
        if (!userExist) {
            res.status(404).json({ message: "user with the email or username not found" })
        }

        
        const confirmPassword = await bcrypt.compare(password, userExist.password)

        if (!confirmPassword) {
            res.status(401).json({ message: "you have entered incorrect password" })
        }

        const token = jwt.sign({ id: userExist._id }, process.env.JWT_key, { expiresIn: "1h" })
        res.status(200).json({
            accessToken: token,
            message: "login succesfully"
        })
    } catch (error) {
        res.status(401).json({
            message: error.message,
            success: false
        })
    }
})


module.exports = {
    userRoute: userRoute
}