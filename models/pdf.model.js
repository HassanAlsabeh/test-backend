const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cors = require("cors");
const PdfSchema = new Schema({

pdf: {
  type: String,
  required:true
}
});

const Pdf = mongoose.model("Pdf", PdfSchema);

module.exports = Pdf;
