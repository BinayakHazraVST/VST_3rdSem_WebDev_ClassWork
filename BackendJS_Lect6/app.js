let express= require("express")
let bcryptjs=require("bcryptjs")
let app=express();
let Users=require("./config/db");
const { default: mongoose } = require("mongoose");

app.use(express.json())

let connectDb=async ()=>{
    await mongoose.connect("mongodb://localhost:27017/vedamDb")
    console.log("Database connected...")
}

connectDb();

app.post("/",async (req,res)=>{
    let {name, email, password}=req.body;
    let userData=await Users.findOne({email})

    if(userData){
        return res.send("User already present")
    }

    let updatedPassword=await bcryptjs.hash(password, 10);
    let newUser=new Users({
        name, email,
        password:updatedPassword,
    })

    await newUser.save();
    res.send("User signed up successfully")
})

app.listen(2000,()=>{
    console.log("server...")
})