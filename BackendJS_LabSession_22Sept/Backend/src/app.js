let express = require("express");
let app = express();
let cors = require("cors");
let bcryptjs=require("bcryptjs");
let jwt=require("jsonwebtoken")

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))



const userData = [
  {
    name: "Alice Smith",
    email: "alice@example.com",
    // Example bcrypt hash for "password123"
    password: "$2b$10$CwTycUXWue0Thq9StjUM0u1KSR1uH1qR9jCq3XQ6p5b.8B8wVjDPO",
    role:"student"
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    // Example bcrypt hash for "securePass456!"
    password: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjIQG8.FjG",
    role:"teacher"
  }
];

app.post("/users", (req, res) => {
    try {
        let { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Invalid input"
            })
        }

        let userData = {
            name, email
        }
        console.log(userData);

        res.status(201).json({
            message: "User Data received successfully"
        })
    } catch (error) {
        console.log("Error:", error.message)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.post("/signup", async(req,res)=>{
    let {name, email, password, role}=req.body;

    try{
        if(!name || !email || !password || !role){
            return res.status(400).json({
                message:"Invalid input"
            })
        }

        let user=userData.find((elem)=> elem.email===email);
        if(user){
            return res.status(409).json({
                message:"User already registered"
            })
        }

        let updatedPassword=await bcryptjs.hash(password,8);

        let newUser={
            name, email, 
            password:updatedPassword,
            role: role || "student"
        }

        userData.push(newUser);
        res.status(201).json({
            message:"User registered successfully"
        })
    }catch(error){
        console.log("Error",error.message);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

app.post("/login", async(req,res)=>{
    let {email, password}=req.body;

    try {
        if(!email || !password){
            return res.status(400).json({
                message:"Invalid input"
            })
        }

        let user=userData.find((elem)=>elem.email===email);

        if(!user){
            return res.status(409).json({
                message:'User not registered'
            })
        }

        let checkPassword=await bcryptjs.compare(password, user.password);
        if(!checkPassword){
            return res.status(404).json({
                message:"Wrong password"
            })
        }

        let jwtSign=process.env.jwtSign

        let token=jwt.sign({name:user.name, role:user.role}, jwtSign);
        res.status(201).json({
            message:"Logged in",
            token:token
        })


    } catch (error) {
        console.log("Error",error.message);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

let auth=(req,res,next)=>{
    let token=req.headers.authorization;
    if(!token){
        return res.status(401).json({
            message:"User not logged in"
        })
    }
    let jwtSign=process.env.jwtSign
    let decode=jwt.verify(token, jwtSign);

    req.user=decode;
    next();
}

let roleCheck=(role)=>{
    return (req,res,next)=>{
        if(req.user.role!==role){
            return res.status(403).json({
                message:"You are not permitted"
            })
        }

        next();
    }
}

app.get("/dashboard", auth, roleCheck("student"), (req,res)=>{
    res.status(200).json({
        message:`"Hello ${req.user.name}"`
    })
})  


module.exports = app;