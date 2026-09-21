let mongoose=require("mongoose");

let UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
    }
});

let Users=mongoose.model("Users_Lect11_Structure", UserSchema);

module.exports=Users;