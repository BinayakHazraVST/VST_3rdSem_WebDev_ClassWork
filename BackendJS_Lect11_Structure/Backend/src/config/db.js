let mongoose=require("mongoose");

let mongo_url=process.env.mongo_url;

const connectDb=async()=>{
    try{
        await mongoose.connect(mongo_url);
        console.log("Database connected...")
    }catch(error){
        console.log("Error in connecting database",error);
    }
}

module.exports=connectDb;