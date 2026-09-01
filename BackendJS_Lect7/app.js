let express=require("express");
const { default: mongoose } = require("mongoose");
let bcryptjs=require("bcryptjs");
let app=express();
let jwt=require("jsonwebtoken");
let cors=require("cors");

let Users=require("./config/db");

let connectDb=async()=>{
    await mongoose.connect(
        "mongodb://localhost:27017/vedamDb"
    )
    console.log("Db connected...");
}

connectDb();

app.use(express.json())
app.use(cors());

app.post("/signup",async(req,res)=>{
    let {name, email, password, role}=req.body;
    let userData= await Users.findOne({email});

    if(userData){
        return res.send("You are already signed up. Please log in");
    }
    let updatedPassword=await bcryptjs.hash(password,8);
    let newUser=await Users.create({
        name, email, 
        password:updatedPassword,
        role:role || "user"
    })

    res.send("User signed up successfully")
})

app.post("/login",async (req,res)=>{
    let {email, password}=req.body;
    let userData=await Users.findOne({email});

    if(!userData){
        return res.send("User not found, Please Sign Up");
    }

    let checkPassword=await bcryptjs.compare(password, userData.password);

    if(!checkPassword){
        return res.send("Wrong Password")
    }

    let token=jwt.sign({email: userData.email, role:userData.role},"1234");
    console.log("Token created:\n",token);
    res.send("Logged In successfully");
})

let auth=(req, res, next)=>{
    let token=req.headers.authorization;
    console.log(token)

    if(!token){
        return res.send("You are not logged in");
    }

    next();
}

let admin=(req, res, next)=>{
    let token=req.headers.authorization;

    let decode=jwt.verify(token, "1234");
    if(decode.role!=="user"){
        return res.send("You are not allowed");
    }

    next();
}

app.get("/authorize", auth, admin, (req, res)=>{
    console.log("Hello User!!!");
    res.send("Access granted");
})


app.listen(3000, ()=>{
    console.log("Server running....")
})