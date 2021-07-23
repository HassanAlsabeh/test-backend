const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cors = require("cors");
const ExperienceSchema = new Schema({
  title: {
    type: String,
    required:true
},
description: {
  type: String,
  required:true
},
image: {
  type: String,
  required:true
},

button: {
    type: String,
    required:true
  }
  
});

const Experience = mongoose.model("Experience", ProjectSchema);

module.exports = Experience;