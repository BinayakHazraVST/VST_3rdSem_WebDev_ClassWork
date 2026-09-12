let express = require("express");
let app = express();

let mongoose = require("mongoose");
let Users = require("./config/UserModel");
let Orders = require("./config/OrderModel");

let bcryptjs = require("bcryptjs");
let jwt = require("jsonwebtoken");
let cors=require("cors");

let connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/vedamDb");

    console.log("Database connected");
  } catch (error) {
    console.log("Error in connecting the database", error);
  }
};

connectDb();
app.use(express.json());
app.use(cors())

app.post("/signup", async (req, res) => {
  let { name, email, password, role } = req.body;
  let userData = await Users.findOne({ email });
  if (userData) {
    return res
      .status(200)
      .json({ message: "You are already registered. Please log in" });
  }
  let updatedPassword = await bcryptjs.hash(password, 8);

  let newUsers = new Users({
    name,
    email,
    password: updatedPassword,
    role: role || "user",
  });

  try {
    await newUsers.save();
    console.log("New user created");
  } catch (error) {
    console.log("Error in creating new user", error);
  }

  res.status(200).json({
    message: "You are registered successfully!!",
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let userData = await Users.findOne({ email });

  if (!userData) {
    return res.status(200).json({
      message: "You are not registered. Please sign up",
    });
  }

  let checkPassword = await bcryptjs.compare(password, userData.password);
  if (!checkPassword) {
    return res.status(200).json({
      message:"Wrong Password"
    });
  }

  let token = jwt.sign(
    {
      id: userData._id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
    },
    "1234",
  );

  res.status(200).json({
    message: "You are logged in",
    token: token,
  });
});

let auth = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(200).json({
      message: "You are not logged in",
    });
  }
  let decode = jwt.verify(token, "1234");

  req.user = decode;
  next();
};

let roleCheck = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(200).json({
        message: "You are not permitted",
      });
    }

    next();
  };
};

let cleanData=(userData)=>{
  let user={
    id: userData._id,
    name: userData.name,
    email:userData.email,
    role:userData.role,
  }

  return user;
}

app.get("/authorize", auth, roleCheck("admin"), (req, res) => {
  let name = req.user.name;
  res.send(`Hello!! ${name}`);
});

app.get("/me", auth, async (req, res) => {
  let { id } = req.user;

  let userData = await Users.findById(id);

  let showData=cleanData(userData);
  console.log(showData);

  res.status(200).json({
    message: "User data fetched successfully",
    data: showData,
  });
});

app.put("/me", auth, async (req, res) => {
  let { id } = req.user;
  let { name } = req.body;
  let userData = await Users.findByIdAndUpdate(
    id,
    {
      name: name,
    },
    {
      new: true,
    },
  );

  let showData = cleanData(userData)

  res.status(200).json({
    message: "Name updated successfully",
    data: showData,
  });
});

app.patch("/users/:id", auth, roleCheck("admin"), async (req, res) => {
  let { id } = req.params;
  let { role } = req.body;

  if (role !== "admin" && role !== "user") {
    return res.status(200).json({
      message: "Invalid Role. Could not updated",
    });
  }

  let userData = await Users.findByIdAndUpdate(
    id,
    {
      role: role,
    },
    {
      new: true,
    },
  );

  if (!userData) {
    return res.status(200).json({
      message: "User not found",
    });
  }

  let showData=cleanData(userData);

  res.status(200).json({
    message: "Role updated successfully",
    data: showData,
  });
});

app.post("/orders", auth, async(req,res)=>{
    let {id}=req.user;

    let {productName, amount}=req.body;
    let newOrder=await Orders.create({
        productName, amount, 
        userId:id
    })

    console.log(newOrder);

    res.status(200).json({
        message:"Order created successfully"
    })    
})

app.get("/my-orders", auth, async(req,res)=>{
  let {id}=req.user;

  let orderDetails=await Orders.find({userId:id});

  if(!orderDetails){
    return res.status(200).json({
      message:"No order details found",
    })
  }

  console.log(orderDetails);
  res.status(200).json({
    message:"Order details found",
    data:orderDetails
  })
})

app.get("/allUsers", auth, roleCheck("admin"), async(req,res)=>{
  let users=await Users.find();

  let showUsers=users.map((elem)=>cleanData(elem));
  res.status(200).json({
    data:showUsers
  })
})

app.get("/users/:id", auth, roleCheck("admin"), async(req,res)=>{
  let {id}=req.params;
  let user=await Users.findById(id);

  if(!user){
    return res.status(200).json({
      message:"User not found"
    })
  }

  let showData=cleanData(user);

  res.status(200).json({
    message:"User details fetched",
    data:showData
  })
})

app.listen(3000, () => {
  console.log("Server connected...");
});
