let dotenv=require("dotenv")
dotenv.config();
let app=require("./src/app");

let port=process.env.port

app.listen(port, ()=>{
    console.log("Server started")
})
