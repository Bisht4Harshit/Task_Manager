const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");

//@desc Create new project
//@route POST /api/project
//@access private 
const createProject = asyncHandler(async (req,res) => {
   console.log("Request body is:",req.body);
   const {name, leader, members} = req.body;
   if(!name || !leader || !members){
      res.status(400);
      throw new Error("All fields are mandatory");
   }
   
   const project = await Project.create({
      name,
      leader,
      members,
      user_id: req.user.id,
   });
   res.status(201).json(project);
});

//@desc Get all projects
//@route GET /api/projects
//@access private 
const getProjects = asyncHandler(async (req,res) => {
   const projects = await Project.find({user_id: req.user.id});
   res.status(200).json(projects);
});

//@desc Get project
//@route GET /api/project/:id
//@access private 
const getProject = asyncHandler(async (req,res) => {
   const project = await Project.findById(req.params.id);
   if(!project){
      res.status(404);
      throw new Error("Project not found");
   }
   res.status(200).json(project);
  });



module.exports = {createProject,getProjects,getProject};