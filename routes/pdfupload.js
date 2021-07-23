const express = require ('express');
const router= express.Router();
const cors = require("cors");
const Pdf = require("../models/pdf.model.js");
const path = require("path");
const multer = require("multer");


router.use(express.static(path.join(__dirname, "../public"))) // <-- location of public dir
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/pdf/uploads"),
  filename: (req, file, cb) => {
    const { fieldname, originalname } = file;
    const date = Date.now();
    // filename will be: image-1345923023436343-filename.png
    const filename = `${fieldname}-${date}-${originalname}`
    cb(null, filename);
  },
});
const upload=multer({storage:storage});


router.get("/" ,(req, res) => {
    Pdf.find()
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json("Error: " + err));
  });

  router.post('/add' ,upload.single('pdf'), (req, res) => {
    const Pdfs = new Pdf({
      pdf:req.file.filename
    });
  
    Pdfs.save()
      .then(() => res.json("Added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });