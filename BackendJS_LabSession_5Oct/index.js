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

app.get("/hisaab", (req,res)=>{
    res.render("hisaab");
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

app.get("/edit", (req,res)=>{
    let title=req.body.title;
    let 
})

app.listen(3000, (req, res) => {
  console.log("listening...");
});