let app=require("./src/app");

let dotenv=require("dotenv");
dotenv.config();

let port=process.env.port

app.listen(port, ()=>{
    console.log(`Server running on ${port}`)
})