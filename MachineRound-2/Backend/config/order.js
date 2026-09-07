let mongoose=require("mongoose");

let orderSchema=new mongoose.Schema({
    email:String,
    productName:String,
    amount:String,
    userId:String,
})

let Orders=mongoose.model("orders",orderSchema);
module.exports=Orders;