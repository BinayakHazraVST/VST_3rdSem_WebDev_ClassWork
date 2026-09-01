let mongoose=require("mongoose");

let userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
})

let Users=mongoose.model("user_Lect7", userSchema);
module.exports=Users;