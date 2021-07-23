const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cors = require("cors");
const SliderSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
},
   description: {
   type: String,
   required: true,
},
image: {
  type: String,
  required: false,
},

  button: {
   type: String,
   required: true,
},
},
{ timestamps: true }
);

module.exports = mongoose.model("Slider", SliderSchema);