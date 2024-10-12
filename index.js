const express = require('express');
const {userRoute} = require('./routes/userRoutes')
const {courseRoute} = require("./routes/courseRoutes");
const { default: mongoose } = require('mongoose');
require('dotenv').config()
const app = express();
const port = 3000;

// console.log(process.env)

app.use('/user', userRoute);
app.use("/course", courseRoute);
const main = async() =>{
  await  mongoose.connect(process.env.mongodbPath)
  console.log("connected to db")
  app.listen(port, ()=>{
      console.log(`I am listening on port: ${port}`)
  })

}

main();
