let mongoose=require("mongoose")

let userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
})

let Users=mongoose.model("users",userSchema)

module.exports=Users;