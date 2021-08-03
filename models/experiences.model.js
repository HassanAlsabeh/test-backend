const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const cors = require("cors");
const ExperienceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: { type: String },
});

const Experience = mongoose.model("Experience", ExperienceSchema);

module.exports = Experience;
