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
 const UserModel = mongoose.model("User", userSchema);
 const adminModel = mongoose.model("admin", adminSchema);
 const courseModel = mongoose.model("course", courseSchema);
 const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.export ={
   UserModel,
   adminModel,
   courseModel,
   purchaseModel
}
