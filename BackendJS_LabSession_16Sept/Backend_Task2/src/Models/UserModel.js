let mongoose=require("mongoose")

let UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:"user",
    },
    resetToken:String,
    resetTokenExpiry:Date
})

let Users=mongoose.model("users_devLab_16Sept", UserSchema);
module.exports=Users;