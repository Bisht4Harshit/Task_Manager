const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  
   
   user_id:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"User",
   },
   name:{
     type: String,
     required: [true, "Please add the project name"],
     
  },
  leader:{
     type: String,
     required: [true, "Please add the project leader name"],
  },
  members:{
     type: String,
     required: [true, "Please add the project number of members"],
  },
},
{
    timestamps:true,
}
);

module.exports = mongoose.model("Project", projectSchema);