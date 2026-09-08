let express = require("express");
const { default: mongoose } = require("mongoose");
let bcryptjs = require("bcryptjs");
let app = express();
let jwt = require("jsonwebtoken");
let cors = require("cors");

let Users = require("./config/db");
const { findById } = require("./config/db");
const { findByIdAndUpdate } = require("./config/db");
let Orders = require("./config/order");

let connectDb = async () => {
  await mongoose.connect("mongodb://localhost:27017/vedamDb");
  console.log("Db connected...");
};

connectDb();

app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  let { name, email, password, role } = req.body;
  let userData = await Users.findOne({ email });

  if (userData) {
    return res.send("You are already signed up. Please log in");
  }
  let updatedPassword = await bcryptjs.hash(password, 8);
  let newUser = await Users.create({
    name,
    email,
    password: updatedPassword,
    role: role || "user",
  });

  res.send("User signed up successfully");
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let userData = await Users.findOne({ email });

  if (!userData) {
    return res.send("User not found, Please Sign Up");
  }

  let checkPassword = await bcryptjs.compare(password, userData.password);

  if (!checkPassword) {
    return res.send("Wrong Password");
  }

  let token = jwt.sign(
    { id: userData._id, email: userData.email, role: userData.role },
    "1234",
  );
  console.log("Token created:\n", token);

  res.send("Logged in Successfully");
});

let auth = (req, res, next) => {
  let token = req.headers.authorization;
  console.log(token, "toeknnnnn");

  if (!token) {
    return res.send("You are not logged in");
  }

  let decode = jwt.verify(token, "1234");
  req.user = decode;

  next();
};

let roleCheck = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.send("You are not permitted...");
    }

    next();
  };
};

app.get("/authorize", auth, (req, res) => {
  console.log("Hello User!!!");
  res.send("Access granted");
});

app.get("/me", auth, async (req, res) => {
  let id = req.user.id;
  let userData = await Users.findOne({ id });

  let user = {
    name: userData.name,
    email: userData.email,
    role: userData.role,
  };

  console.log(user);

  res.send("get me is working...");
});

app.put("/me", auth, async (req, res) => {
  let { name } = req.body;
  let userData = await Users.findOne({ email: req.user.email });
  let id = userData.id;

  let updatedUser = await Users.findByIdAndUpdate(
    id,
    {
      name: name,
    },
    { new: true },
  );

  console.log("Updated user:\n", updatedUser);
  res.send("Updation of name done");
});

app.patch("/users/:id", auth, roleCheck("admin"), async (req, res) => {
  let { id } = req.params;
  let { role } = req.body;
  let targetUser = await findOne({ id });
  if (!targetUser) {
    return res.send("Target user not found");
  }

  if (role !== "user" && role !== "admin") {
    return res.send("Updation is not allowed");
  }

  let updatedUser = await findByIdAndUpdate(id, { role: role }, { new: true });
  req.user.role=role;

  console.log(updatedUser);
  res.send("User updated successfully");
});

app.post("/orders", auth, async (req, res) => {
  let id = req.user.id;
  let { productName, amount } = req.body;

  let orderDetails = await Orders.findOne({ id });

  if (orderDetails) {
    return res.send("Order has already being added...");
  }

  let newOrder = await Orders.create({
    email: req.user.email,
    productName,
    amount,
    userId: id,
  });

  console.log("order:\n", newOrder);

  res.send("Order created");
});

app.get("/my-orders", auth, async (req, res) => {
  let id = req.user.id;
  let userOrder = await Orders.findOne({ userId: id });

  if (!userOrder) {
    return res.send("No order found for the user");
  }

  let order = {
    productName: userOrder.productName,
    amount: userOrder.amount,
  };

  res.send(order);
});

//debug
app.get("/users/:id", auth, async (req, res) => {
  let user = await User.findById(req.user.id);
  if (!user) {
    return res.send("User does not exist");
  }
  res.json(user);
});
// we replace the req.user.id

app.put("/role", auth, roleCheck("admin"),async (req, res) => {
    let { role } = req.body;
    if(role!=="user" && role!=="admin"){
        return res.send("role is not valid");
    }

    let updatedUser=await Users.findByIdAndUpdate(req.user.id,
        {
            role:role,
        },
        {new:true}
    )

    req.user.role=role;

    console.log(updatedUser);
    res.send("user updated");

});
//first checking the roleCheck
//checking the new role is valid or not
//then updating the user in the database

app.get('/my-orders', auth, async (req,res) => {
    let orders = await Order.findOne({userId:req.user.id});
    if(!orders){
        return res.send("No order is found");
    }
    res.json(orders);
});
//finding the write user Id 

app.listen(3000, () => {
  console.log("Server running....");
});
