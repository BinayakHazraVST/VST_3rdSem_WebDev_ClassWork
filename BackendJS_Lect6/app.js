let express= require("express")
let bcryptjs=require("bcryptjs")

let app=express();
let Users=require("./config/db");
let cors=require("cors");

const { default: mongoose } = require("mongoose");

app.use(express.json())
app.use(cors())

let connectDb=async ()=>{
    await mongoose.connect("mongodb://localhost:27017/vedamDb")
    console.log("Database connected...")
}

connectDb();

app.post("/signup",async (req,res)=>{
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

app.post("/login",async (req,res)=>{
    let {email, password}=req.body;
    let userData=await Users.findOne({email})

    if(!userData){
        return res.send("User not found...please sign up")
    }

    let updatedPassword=await bcryptjs.compare(password, userData.password);
    if(!updatedPassword){
        return res.send("password wrong")
    }
    return res.send("Login successfull !!");
})


app.listen(2000,()=>{
    console.log("server...")
})