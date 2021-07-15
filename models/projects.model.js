const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cors = require("cors");
const ProjectSchema = new Schema({
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
}
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
