let express=require("express")
let app=express();

let cors=require("cors")
app.use(cors())

let products = [
    {
        id: 1,
        name: "iPhone 15",
        category: "mobile",
        price: 69999,
        stock: 10
    },
    {
        id: 2,
        name: "Galaxy S24",
        category: "mobile",
        price: 64999,
        stock: 8
    },
    {
        id: 3,
        name: "MacBook Air",
        category: "laptop",
        price: 99999,
        stock: 5
    },
    {
        id: 4,
        name: "Dell XPS 14",
        category: "laptop",
        price: 89999,
        stock: 7
    },
    {
        id: 5,
        name: "AirPods Pro",
        category: "headphones",
        price: 24999,
        stock: 15
    },
    {
        id: 6,
        name: "Sony XM5",
        category: "headphones",
        price: 29999,
        stock: 12
    }
];

app.use(express.json())

app.get("/",(req,res)=>{
    res.send(products)
})

app.get("/product/:id" ,(req,res)=>{
    let {id}=req.params;

    let data=products.find((elem)=> elem.id===Number(id));

    if(!data){
        return res.status(404).json({msg:"data not found"})
    }
    res.status(200).json({msg:data});
})

app.get("/search",(req,res)=>{
    let {category}=req.query;
    
    let data=products.filter((elem)=> elem.category===category)

    if(data.length===0){
        return res.status(404).json({msg:"data not found"})
    }
    res.status(200).json({msg:data});
})

app.post("/product" ,(req,res)=>{
    let body=req.body;
    products.push(body);

    res.status(200).json({msg:"Products updated successfully"})
})

app.put("/update/:id", (req, res)=>{
    let {id}=req.params
    let {price}=req.body

    let isPresent=false

    products=products.map((elem)=>{
        if(elem.id===Number(id)){
            isPresent=true;
            elem={...elem,
                price
            }
        }

        return elem;
    })

    if(!isPresent){
        return res.status(404).json({msg:"data not updated "})
    }else{
        return res.status(200).json({msg:"data is updated successfully"})
    }
})

app.delete("/delete/:id", (req,res)=>{
    let {id}=req.params;

    let isPresent=false

    products=products.filter((elem)=>{
        if(elem.id!==Number(id)){
            return true
        }else{
            isPresent=true
            return false
        }
    })

    if(!isPresent){
        return res.status(404).json({msg:"data not deleted"})
    }else{
        return res.status(200).json({msg:"data is deleted successfully"})
    }
})

app.listen(2000, ()=>{
    console.log("server...")
})