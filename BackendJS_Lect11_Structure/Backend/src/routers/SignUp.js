let express = require("express");
let router = express.Router();

let bcryptjs = require("bcryptjs");
let Users = require("../models/Users.model");

router.post("/signup", async (req, res) => {
    let { name, email, password, role } = req.body;

    try {
        let userData = await Users.findOne({ email });
        if (userData) {
            return res.status(409).json({
                message: "User already registered"
            })
        }

        let updatedPassword = await bcryptjs.hash(password, 8);
        let newUsers = await Users.create({
            name, email,
            password: updatedPassword,
            role: role || "user",
        })

        let showData = {
            name: newUsers.name,
            email: newUsers.email,
            role: newUsers.role,
        }

        res.status(201).json({
            message: "User registered successfully",
            data: showData,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

module.exports=router;