const { Router } = require('express');
const adminRoute = Router();
const { adminModel, courseModel } = require('../schema/db')
const bcrypt = require('bcrypt')
const z = require('zod')
const jwt = require('jsonwebtoken');
const { adminMiddleware } = require('../middleware/admin');


adminRoute.post("/signup", async (req, res) => {

    const signupBody = z.object({
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(3).max(100),
        userName: z.string().min(3).toLowerCase(),
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(100)

    })

    const parseDataWithSuccess = signupBody.safeParse(req.body)
    if (!parseDataWithSuccess.success) {
      return  res.json({
            message: "incorrect formate",
            error: parseDataWithSuccess.error,

        })
    }
    const { userName, email, password, firstName, lastName } = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new adminModel({ firstName, lastName, userName, email, password: hashPassword })
        const savedUser = await user.save()
        res.json(savedUser);
    } catch (error) {
        res.json(error)
    }
})


adminRoute.post('/signin', async (req, res) => {
    const signinBody = z.object({
        userName: z.string().toLowerCase(),
        email: z.string().email(),
        password: z.string()
    }).refine(data=> data.userName || data.email, {
        message: "either userName or email is required",
        path: ["userName", "email"]
    })

    const parseDataWithSuccess = signinBody.safeParse(req.body);

    if (!parseDataWithSuccess.success) {
       return res.json(({
            message: "user, email or password is incorrect",
            error: parseDataWithSuccess.error
        }))
    }
      const {email, userName, password} = req.body;
    try {
        const adminExist = await adminModel.findOne({ $or: [{ email }, { userName }] })
        if (!adminExist) {
           return res.status(401).json({
                message: "admin  not exist "
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, adminExist.password)
        if (!isPasswordCorrect) {
          return  res.status(401).json({
                message: "password is incorrect"
            })
        }
        const token = jwt.sign({ id: adminExist._id }, process.env.JWT_admin, { expiresIn: '1h' })

        res.cookie("access_token", token, {httpOnly: true, secure: false, maxAge: 24*60*60*60 }).status(200).json({
            message: "login successfully"
        })

    } catch (error) {
        res.json({
            message: "incoorect", error: error.message
        })
    }
})


adminRoute.post('/course', adminMiddleware, async (req, res) => {
    const adminId = req.userId;

    const { title, description, price, imageUrl } = req.body;

    try {
        const createCourse = await courseModel.create({
            title, description, price, imageUrl, creatorId: adminId
        })
        res.status(201).json({addedCourse: createCourse, Message: "course Added Successfully"})
    } catch (error) {
      res.json({
        message: "failed to add course"
      })
    }

})

module.exports = {
    adminRoute: adminRoute
}


