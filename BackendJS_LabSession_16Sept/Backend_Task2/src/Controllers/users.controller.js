let Users = require("../Models/UserModel");
let bcryptjs = require("bcryptjs");
let sendEmail = require("../utils/sendEmail");
let crypto = require("crypto");

let signUpController = async (req, res) => {
    let { name, email, password, role } = req.body;

    try {
        let userData = await Users.findOne({ email });
        if (userData) {
            return res.status(409).json({
                message: "User already registered. Please log in",
            });
        }

        let updatedPassword = await bcryptjs.hash(password, 8);

        let newUser = await Users.create({
            name,
            email,
            password: updatedPassword,
            role: role || "user",
        });

        res.status(201).json({
            message: "User successfully registered",
            data: newUser,
        });
    } catch (error) {
        console.log("Error in registration", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

let logInController = async (req, res) => {
    let { email, password } = req.body;
    try {
        let userData = await Users.findOne({ email });

        if (!userData) {
            return res.status(401).json({
                message: "User not registered. Please Sign up",
            });
        }

        let checkPassword = await bcryptjs.compare(password, userData.password);

        if (!checkPassword) {
            return res.status(401).message({
                message: "Wrong password",
            });
        }

        res.status(200).json({
            message: "Logged in successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server Error",
        });
    }
};

let forgotPasswordController = async (req, res) => {
    let { email } = req.body;
    try {
        let userData = await Users.findOne({ email });

        if (!userData) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        let resetToken=crypto.randomBytes(20).toString("hex");
        let resetTokenExpiry=Date.now()+600000;
        userData.resetToken=resetToken;
        userData.resetTokenExpiry=resetTokenExpiry;

        let reset_url=`${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

        await userData.save()

        await sendEmail(
            userData.email,
            "Reset Password Link",
            `Please click on the below given link to reset password:\n\n${reset_url}`
        )

        res.status(200).json({
            message:"Reset password link send"
        })
    }catch(error){
        res.status(500).json({
            message:"Internal server error"
        })
    }
}


module.exports = { signUpController, logInController, forgotPasswordController };
