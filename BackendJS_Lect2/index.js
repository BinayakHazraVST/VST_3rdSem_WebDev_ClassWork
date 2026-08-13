// let os=require("os");
// console.log(os.uptime()/3600)

// console.log(os.totalmem()/1024/1024/1024)
// console.log(os.cpus())
// console.log(os.arch())

// 

let express=require("express")
let app=express();

app.listen(3000, ()=>{
    console.log("server running")
})

app.use((req,res,next)=>{
    console.log("use middleway");
})



app.get("/", (req,res)=>{
    console.log("response is sending")
    res.send("Hello express")
})

app.post("/",(req,res)=>{
    console.log("posting..")
    res.send("hello all");
})

app.post("/about",(req,res)=>{
    console.log("posting..")
    res.send("about all");
})



