let mongoose=require("mongoose");

let UserSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:['user','admin'],
        default:"user"
    },
    resetToken:String,
    resetTokenExpiry:Date,
})

let Users=mongoose.model("Users_forgotPassword", UserSchema);
module.exports=Users;