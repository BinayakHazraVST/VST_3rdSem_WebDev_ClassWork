let mongoose=require("mongoose");
let mongodb_url=process.env.mongodb_url;

const connectDb=async()=>{
    try{
        await mongoose.connect(mongodb_url);
        console.log("Database connected");
    }catch(error){
        console.log("Error in database connection",error);
    }
}

module.exports=connectDb;