let mongoose=require("mongoose");

let UserSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
})

let Users=mongoose.model("user_machineRound",UserSchema);

module.exports=Users;