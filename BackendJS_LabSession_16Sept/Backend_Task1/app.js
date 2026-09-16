let express=require("express");
let app=express();

const students = [
  {
    id: 1,
    name: "Alice Johnson",
    age: 20,
    course: "Computer Science"
  },
  {
    id: 2,
    name: "Bob Smith",
    age: 22,
    course: "Mechanical Engineering"
  },
  {
    id: 3,
    name: "Charlie Brown",
    age: 19,
    course: "Graphic Design"
  },
  {
    id: 4,
    name: "Diana Prince",
    age: 21,
    course: "Data Science"
  }
];

app.use(express.json())

app.get("/students",(req,res)=>{
    res.send(students);
})

app.get("/students/:id", (req,res)=>{
    let {id}=req.params;

    let student=students.find((elem)=> elem.id===Number(id))
    if(!student){
        return res.status(404).json({
            message:"Student not found"
        })
    }

    res.status(200).json({
        message:"Student details found",
        data:student
    })
})

app.get("/students", (req,res)=>{
    let {course}=req.query;

    if(!course){
        return res.status(400).json({
            message:"No valid course obtained"
        })
    }

    let studentDetails=students.filter((elem)=>elem.course===course);
    if(!studentDetails){
        return res.status(404).json({
            message:"No students found"
        })
    }

    res.status(200).json({
        message:"Student details found",
        data:studentDetails
    })
})

app.post("/students", (req,res)=>{
    let {id, name, age, course}=req.body;
    let newStudent={
        id, name, age, course
    };

    if(!id || !name || !age || !course){
        return res.status(409).json({
            message:"No valid student entered"
        })
    }

    students.push(newStudent);

    return res.status(200).json({
        message:"New student added",
        data:newStudent
    })
})

app.listen(3000, ()=>{
    console.log("Server started")
})