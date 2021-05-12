const router = require("express").Router();
const authController = require("../controllers/auth.controller");

//Auth Routes
// register
router.post("/register", authController.signUp);
// activation Register
router.put("/register/:activationToken", authController.confirmEmail);
//login
router.post("/login", authController.signIn);
//forgot password
router.post("/forgotpassword", authController.forgotPassword);
// reset password
router.put("/resetpassword/:resetToken", authController.resetPassword);
//logout
router.get("/logout", authController.logOut);
//delete user
router.delete("/delete/:id", authController.deleteAccount);

module.exports = router;
