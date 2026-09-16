let express=require("express");
let app=express();

let router=require("./routes/auth.route");
let connectDb=require("./config/db");
connectDb();

app.use(express.json())
app.use("/auth",router)

module.exports=app;