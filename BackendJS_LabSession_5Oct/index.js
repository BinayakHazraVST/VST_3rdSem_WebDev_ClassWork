let express = require("express");
let app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}))
const fs = require("fs");

app.get("/", (req, res) => {
  fs.readdir("files", function (err, files) {
    if (err) return res.status(500).res.send(err);
    res.render("index", { files: files });
  });
});

app.get("/hisaab/:fileName", (req,res)=>{
    let fileName=req.params.fileName;
    fs.readFile(`./files/${fileName}.txt`, "utf-8", function(err,fileContent){
        if(err){
            res.status(500).json({
                message:"Internal server error"
            })
        }else{
            res.render("hisaab", {fileName, fileContent})
        }
    })
})

app.get("/create", (req,res)=>{
    res.render("create")
})

app.post("/createhisaab", (req, res) => {
    fs.writeFile(`./files/${req.body.title}.txt`, req.body.content, req.body.date, function(err){
        if(err){
            res.status(500).json("Internal Server error");
        }
    })

    res.redirect("/");
});

app.get("/edit/:fileName" ,(req,res)=>{
    let fileName=req.params.fileName;
    fs.readFile(`./files/${fileName}.txt`, "utf-8", function(err, fileContent){
        if(err){
            res.status(500).json("Internal server error");
        }else{
            res.render("edit", {fileContent, fileName})
        }
    })
})

app.post("/update/:fileName", (req,res)=>{
    let fileName=req.params.fileName;
    let fileContent=req.body.content;
    fs.writeFile(`./files/${fileName}.txt`, fileContent, function(err){
        if(err){
            res.status(500).json({
            message:"Internal server error"
            })
        }
        res.redirect("/");
    })
})

app.get("/delete/:fileName", (req,res)=>{
    let fileName=req.params.fileName;
    fs.unlink(`./files/${fileName}.txt`, function(err){
        if(err){
                res.status(500).json({
                message:"internal server error"
            })
        }
        res.redirect("/");
    })
})

app.listen(3000, (req, res) => {
  console.log("listening...");
});