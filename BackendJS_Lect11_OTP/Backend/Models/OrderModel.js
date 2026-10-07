let mongoose=require("mongoose");

let OrderSchema=new mongoose.Schema({
    productName:String,
    amount:Number,
    userId:String,
})

let Orders=mongoose.model("Orders_resetPassword", OrderSchema);
module.exports=Orders;