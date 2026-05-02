const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");
//@desc Get all tasks
//@route GET /api/tasks
//@access public 
const getTasks = asyncHandler(async (req,res) => {
    
   if (req.user.role === "admin") {
    const tasks = await Task.find().populate("assignedTo", "username email");
    res.status(200).json(tasks);
  } else {
    const tasks = await Task.find({ assignedTo: req.user.id })
      .populate("assignedTo", "username email");
    res.status(200).json(tasks);
  }
});



//@desc Create new tasks
//@route POST /api/tasks
//@access public 
const createTask = asyncHandler(async (req,res) => {
   
   console.log("Request body is:",req.body);
    
   const {title, assignedTo,status} = req.body;
   if(!title || !assignedTo || !status){
      res.status(400);
      throw new Error("All fields are mandatory");
   }
   
   const task = await Task.create({
      title,
      assignedTo,
      status,
      createdBy: req.user.id,
   });
   res.status(201).json(task);
  
});


//@desc Get task
//@route GET /api/tasks/:id
//@access public 
const getTask = asyncHandler(async (req,res) => {
   const task = await Task.findById(req.params.id);
   if(!task){
      res.status(404);
      throw new Error("Task not found");
   }
   res.status(200).json(task);
  });

//@desc Update tasks
//@route PUT /api/tasks/:id
//@access public 
const updateTask = asyncHandler(async (req,res) => {
   


   const task = await Task.findById(req.params.id);
   

   
   if(!task){
      
      res.status(404);
      throw new Error("Task not found");
   }
   
   
   if (
    req.user.role !== "admin" &&
    task.assignedTo.toString() !== req.user.id
  ) {
   
    res.status(403);
    throw new Error("Not authorized");
  }
  
   task.set(req.body);
   const updatedTask = await task.save();
      // req.params.id,
      // req.body,
      // {new: true}

   

   res.status(200).json(updatedTask);
});

//@desc Delete task
//@route POST /api/tasks/:id
//@access public 
const deleteTask = asyncHandler(async (req,res) => {
   const task = await Task.findById(req.params.id);
   if(!task){
      res.status(404);
      throw new Error("Task not found");
   }
   if (
    req.user.role !== "admin" &&
    task.assignedTo.toString() !== req.user.id
  ) {
    res.status(403);
    throw new Error("Not authorized");
  }
   await task.deleteOne();
   res.status(200).json({message:"Task deleted"});
});

module.exports = {getTasks, createTask, getTask, updateTask, deleteTask};