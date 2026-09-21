let express=require("express");
let app=express();

let connectDb=require("./config/db");
let signUpRouter=require("./routers/SignUp");

app.use(express.json());
connectDb();

app.use("/user", signUpRouter);

module.exports=app;
