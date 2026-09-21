let express = require("express");
let app = express();

let connectDb = require("./config/db");
let Users = require("./Models/UserModel");
let Orders = require("./Models/OrderModel");
let bcryptjs = require("bcryptjs");
let jwt = require("jsonwebtoken");
let cors = require("cors");
connectDb();
app.use(express.json());
app.use(cors());

let { sendEmail } = require("./utils/sendEmail");
let crypto = require("crypto");

let refinedUserData = (data) => {
  let userData = {
    name: data.name,
    email: data.email,
    role: data.role,
    id: data._id,
  };

  return userData;
};

let refinedOrderdata = (data) => {
  let order = {
    id: data._id,
    productName: data.productName,
    amount: data.amount,
  };

  return order;
};

app.post("/forgot-password", async (req, res) => {
  try {
    let { email } = req.body;
    let userData = await Users.findOne({ email });

    if (!userData) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let resetToken = crypto.randomBytes(20).toString("hex");
    let resetTokenExpiry = Date.now() + 600000;

    userData.resetToken = resetToken;
    userData.resetTokenExpiry = resetTokenExpiry;

    await userData.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    await sendEmail(
      userData.email,
      "Reset your password",
      `Please click on below given link to reset password:\n\n${resetUrl}`,
    );

    res.status(200).json({
      message: "Reset password link sent",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.post("/reset-password/:token", async (req, res) => {
  let { token } = req.params;
  let { password } = req.body;

  try {
    let userData = await Users.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!userData) {
      return res.status(404).json({
        message: "invalid user",
      });
    }

    let updatedPassword = await bcryptjs.hash(password, 8);
    userData.resetToken = undefined;
    userData.resetTokenExpiry = undefined;
    userData.password = updatedPassword;

    await userData.save();

    res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.post("/signup", async (req, res) => {
  let { name, email, password, role } = req.body;

  let userData = await Users.findOne({ email });
  if (userData) {
    return res.status(200).json({
      message: "Already registered. Please Log in",
    });
  }

  let updatedPassword = await bcryptjs.hash(password, 8);
  let newUser = new Users({
    name,
    email,
    password: updatedPassword,
    role: role || "user",
  });

  try {
    await newUser.save();
  } catch (error) {
    console.log("Error in adding user", error);
  }

  res.status(200).json({
    message: "User registered Successfully",
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    let userData = await Users.findOne({ email });

    if (!userData) {
      return res.status(200).json({
        message: "User not registered. Please Sign up",
      });
    }

    let checkPassword = await bcryptjs.compare(password, userData.password);
    if (!checkPassword) {
      return res.status(200).json({
        message: "Wrong password",
      });
    }

    let token = jwt.sign(
      {
        userId: userData._id,
        email: userData.email,
        role: userData.role,
      },
      "1234",
    );

    res.status(200).json({
      message: "Logged in successfully",
      token: token,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

let auth = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(200).json({
      message: "You are not signed in",
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
        message: "You are not permitted to use this feature...",
      });
    }

    next();
  };
};

app.get("/me", auth, async (req, res) => {
  let id = req.user.userId;

  try {
    let userData = await Users.findById(id);

    if (!userData) {
      return res.status(200).json({
        message: "User not found...",
      });
    }

    let showData = refinedUserData(userData);
    res.status(200).json({
      message: "User Details fetched",
      data: showData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.put("/me", auth, async (req, res) => {
  let id = req.user.userId;
  let { name } = req.body;

  try {
    let userData = await Users.findByIdAndUpdate(
      id,
      {
        name: name,
      },
      { new: true },
    );

    if (!userData) {
      return res.status(200).json({
        message: "User not found...",
      });
    }

    let showData = refinedUserData(userData);
    res.status(200).json({
      message: "User details updated successfully",
      data: showData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    })
  }

});

app.patch("/users/:id", auth, roleCheck("admin"), async (req, res) => {
  let { id } = req.params;
  let { role } = req.body;

  try {
    if (role !== "admin" && role !== "user") {
      return res.status(200).json({
        message: "Role invalid",
      });
    }

    let userData = await Users.findByIdAndUpdate(
      id,
      { role: role },
      { new: true },
    );

    if (!userData) {
      return res.status(200).json({
        message: "User Id not valid",
      });
    }

    req.user.role = role;

    let showData = refinedUserData(userData);
    res.status(200).json({
      message: "Role updated",
      data: showData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    })
  }


});

app.post("/orders", auth, async (req, res) => {
  let id = req.user.userId;
  let { productName, amount } = req.body;

  try {
    let newOrder = await Orders.create({
      productName,
      amount,
      userId: id,
    });

    res.status(200).json({
      message: "New order added successfully",
    });
  } catch (error) {
    res.status(500).json("Internal server error");
  }


});

app.get("/my-orders", auth, async (req, res) => {
  let id = req.user.userId;

  let orders = await Orders.find({ userId: id });
  if (!orders) {
    return res.status(200).json({
      message: "No order found",
    });
  }

  let showOrder = orders.map((elem) => {
    return refinedOrderdata(elem);
  });

  res.status(200).json({
    message: "Orders found",
    data: showOrder,
  });
});

app.get("/allUsers", auth, roleCheck("admin"), async (req, res) => {
  let userData = await Users.find();
  let showData = userData.map((elem) => {
    return refinedUserData(elem);
  });

  res.status(200).json({
    message: "All users fetched",
    data: showData,
  });
});

app.get("/users/:id", auth, roleCheck("admin"), async (req, res) => {
  let { id } = req.params;
  let userData = await Users.findById(id);

  if (!userData) {
    return res.status(200).json({
      message: "User not found",
    });
  }

  let showData = refinedUserData(userData);
  return res.status(200).json({
    message: "User data fetched",
    data: showData,
  });
});

app.get("/error", (req, res) => {
  try {
    let user = null;
    console.log(user.name);

    res.send("Success");
  } catch (error) {
    console.log("errpr", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.listen(3000, () => {
  console.log("Server connected...");
});
