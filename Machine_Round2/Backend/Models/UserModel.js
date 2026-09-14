let mongoose=require("mongoose");

let UserSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:['user','admin'],
        default:"user"
    }
})

let Users=mongoose.model("Users_MachineRound_2", UserSchema);
module.exports=Users;