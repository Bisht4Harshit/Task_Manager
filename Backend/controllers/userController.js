const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//@desc Register a user
//@route POST /api/user/register
//@access public 
const registerUser = asyncHandler(async (req,res) =>{
     const {username, email, password, role} = req.body;
     const userRole = role === "admin" ? "admin" : "member";
     if(!username || !email || !password){
      res.status(400);
      throw new Error("All fields are mandatory!");
     }
     const userAvailable = await User.findOne({email});
     if(userAvailable) {
      res.status(400);
      throw new Error("User already registered!");
     }

      //Hash password
      const hashPassword = await bcrypt.hash(password, 10);
      console.log("Hashed password", hashPassword);
      const user = await User.create({
        username,
        email,
        password: hashPassword,
        role: userRole,
      });

      console.log(`User created ${user}`);
      if(user){
        res.status(201).json({_id: user.id, email: user.email })
      }else {
        res.status(400);
        throw new Error("User data is not valid");
      }
  // res.json({message:"Register the user"});
});

//@desc Login a user
//@route POST /api/user/login
//@access public 
const loginUser = asyncHandler(async (req,res) =>{
     const {email, password} = req.body;
     if(!email || !password){
      res.status(400);
      throw new Error("All fields are mandatory !");
     }
     const user = await User.findOne({email});
     //compare password with hashpassword 
     if(user && (await bcrypt.compare(password, user.password))){
      const accessToken = jwt.sign({
          user:{
            username: user.username,
            email: user.email,
            id: user.id,
            role: user.role,
          }, 
      }, process.env.ACCESS_TOKEN_SECRET,
      {expiresIn:"15m"}
    );
      res.status(200).json({accessToken , userId: user._id, role: user.role,});
     }else{
      res.status(401)
      throw new Error("email or password is not valid");
     }
});

//@desc Current user info
//@route POST /api/user/current
//@access private 
const currentUser = asyncHandler(async (req,res) =>{
     
  res.json(req.user);
});

//@desc Get users for task assignment
//@route GET /api/users
//@access admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, "username email role createdAt").sort({ username: 1 });
  res.status(200).json(users);
});

module.exports = { registerUser,loginUser,currentUser,getUsers};
