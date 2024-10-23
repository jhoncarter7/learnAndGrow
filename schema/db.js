const {Schema, default:mongoose} = require('mongoose');


const userSchema = new Schema({
     firstName:{
        type: String,
        require: true
     },
     lastName:{
        type: String,
        require: true
     },
     userName:{
        type: String,
        require: [true, "can't be blank"],
        unique: true,
        lowerCase: true,
      //   match:  [/^[a-zA-Z0-9]+$/, 'is invalid'],
     },
     email:{
      type: String,
      unique: true,
      lowerCase: true,
      require: true
     },
     password:{
        type: String,
        require: true,
     }
}, {timestamps: true})

const adminSchema = new Schema({
   firstName:{
      type: String,
      require: true
   },
   lastName:{
      type: String,
      require: true
   },
   userName:{
      type: String,
      require: [true, "can't be blank"],
      unique: true,
      lowerCase: true,
    //   match:  [/^[a-zA-Z0-9]+$/, 'is invalid'],
   },
   email:{
      type: String,
      unique: true,
      lowerCase: true,
      require: true,
   },
   password:{
      type: String,
      require: true,
   }
}, {timestamps: true})


const courseSchema = new Schema({
   title: String,
   description: String,
   price: Number,
   imageUrl: String,
   creatorId: Schema.Types.ObjectId,

})

const purchaseSchema = new Schema({
   courseId: Schema.Types.ObjectId,
   userId: Schema.Types.ObjectId
})
 const userModel = mongoose.model("user", userSchema);
 const adminModel = mongoose.model("admin", adminSchema);
 const courseModel = mongoose.model("course", courseSchema);
 const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports ={
   userModel,
   adminModel,
   courseModel,
   purchaseModel
}
