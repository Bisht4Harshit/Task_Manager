const express = require("express");
const { registerUser,currentUser,loginUser,getUsers } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login",loginUser);

router.get("/current", validateToken, currentUser);

router.get("/", validateToken, adminOnly, getUsers);

module.exports = router;
