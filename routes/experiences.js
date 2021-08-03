const express = require("express");
const router = express.Router();
const cors = require("cors");
const Experience = require("../models/experiences.model");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

router.use(express.static(path.join(__dirname, "../public"))); // <-- location of public dir
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/experience/uploads"),
  filename: (req, file, cb) => {
    const { fieldname, originalname } = file;
    const date = Date.now();
    // filename will be: image-1345923023436343-filename.png
    const filename = `${fieldname}-${date}-${originalname}`;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  Experience.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.delete("/delete/:id", (req, res) => {
  Experience.findByIdAndDelete(req.params.id)
    .then(() => res.json("Experience deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", upload.single("image"), (req, res) => {
  const Experiences = new Experience({
    title: req.body.title,
    description: req.body.description,
    image: req.file.filename,
    
  });

  Experiences.save()
    .then(() => res.json("Experience Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/update/:id", upload.single("image"), (req, res) => {
  Experience.findById(req.params.id)
    .then((experiences) => {
      experiences.title = req.body.title;
      experiences.description = req.body.description;
      experiences.image = req.file.filename;
      experiences
        .save()
        .then(() => res.json("Experience updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
