let express=require("express");
let app=express();
let mongoose=require("mongoose");
let cors=require("cors");
let Users=require("./config/db");
let bcryptjs=require("bcryptjs");
let jwt=require("jsonwebtoken");

let connectDb=async()=>{
    try{
        await mongoose.connect(
            "mongodb://localhost:27017/vedamDb"
        )
        console.log("Database connected");
    }catch(error){
        console.log("Error in connected DB",error);
    }
}

connectDb()

app.use(express.json())
app.use(cors())

app.post("/signup",async (req,res)=>{
    let {name, email, password, role}=req.body;
    let userData=await Users.findOne({email});

    if(userData){
        return res.send("You are already registered. Please log in");
    }

    let updatedPassword=await bcryptjs.hash(password,8);
    let newUser=await Users.create({
        name, email, 
        password:updatedPassword,
        role:role || "user",
    })

    res.send("User signed up successfully");
})

app.post("/login", async (req,res)=>{
    let {email, password}=req.body;
    let userData=await Users.findOne({email});

    if(!userData){
        return res.status(200).json({
            message:"You are not registered. Please sign up"
        });
    }

    let checkPassword=await bcryptjs.compare(password,userData.password);
    if(!checkPassword){
        return res.status(200).json({
            message:"Wrong password"
        });
    }

    let token=jwt.sign({email:userData.email, role:userData.role},"1234")
    res.status(200).json({
        message:"Logged in Successfully",
        token:token,
    });
})

let auth=(req,res,next)=>{
    let token=req.headers.authorization;
    if(!token){
        return res.send("You are not signed in");
    }

    let decode=jwt.verify(token, "1234");
    req.user=decode;

    next();
}

let roleCheck=(role)=>{
    return (req, res, next)=>{
        if(req.user.role!==role){
            return res.send("You are not permitted");
        }
        next();
    }
}

app.get("/authorize",auth,roleCheck("admin"),(req,res)=>{
    console.log("Hello user!!");
    res.send("Access granted");
})

app.listen(3000, ()=>{
    console.log("Server running...")
})