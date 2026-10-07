let mongoose=require("mongoose");

let connectDb=async()=>{
    try{
        await mongoose.connect(
            "mongodb://localhost:27017/vedamDb"
        )
        console.log("Database connected...");
    }catch(error){
        console.log("Error in connecting the database",error)
    }
}

module.exports=connectDb;