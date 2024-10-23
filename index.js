const express = require('express');
const { default: mongoose } = require('mongoose');
const cookieParser = require("cookie-parser")
const cors = require('cors')
require('dotenv').config()


const { userRoute } = require('./routes/userRoutes')
const { courseRoute } = require("./routes/courseRoutes");
const { adminRoute } = require('./routes/adminRoutes');

const app = express();

app.use(cors({
  origin: ['http://localhost:3001'],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
const port = 3001;



app.use("/api/v1/admin", adminRoute)
app.use('/api/v1/user', userRoute);
app.use("/api/v1/course", courseRoute);




const main = async () => {
  await mongoose.connect(process.env.mongodbPath)
  console.log("connected to db")
  app.listen(port, () => {
    console.log(`I am listening on port: ${port}`)
  })

}

main();
