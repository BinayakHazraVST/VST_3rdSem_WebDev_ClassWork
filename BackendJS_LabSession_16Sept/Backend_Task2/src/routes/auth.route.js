let express=require("express");
let router=express.Router();

let { signUpController, logInController, forgotPasswordController}=require("../Controllers/users.controller");

router.post("/signup",signUpController);
router.post("/login", logInController);
router.post("/forgot-password", forgotPasswordController);

module.exports=router;
