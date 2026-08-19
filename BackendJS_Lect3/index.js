let express=require("express")
let app=express();

app.listen(3000,()=>{
    console.log("Server....")
})

app.get("/:id/:home", (req,res)=>{
    console.log(req.params)
    res.send("hehe")
})  

app.get("/",(req,res)=>{
    console.log(req.query)
    res.send("hello")
})

app.get("/data",(req,res)=>{
    console.log(req.body)
    res.send("hheeh")
})

