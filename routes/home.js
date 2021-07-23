const express = require("express");
const router = express.Router();
const cors = require("cors");
//const path = require("path");
const Slider = require("../models/home.model");
const path = require("path");

const multer = require("multer");

// <-- location of public dir
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads"),
  filename: (req, file, cb) => {
    console.log(file);
    //const { fieldname, originalname } = file;
    //const date = Date.now();
    // filename will be: image-1345923023436343-filename.png
    // const filenam = `${fieldname}-${date}-${originalname}`

    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// get all slider
router.get("/", (req, res) => {
  Slider.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

// delete slider
router.delete("/delete/:id", async (req, res) => {
  await Slider.findByIdAndDelete(req.params.id)
    .then(() => res.json("Slider has been deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// add or create slider
router.post("/add", upload.single("image"), async (req, res) => {
  console.log(
    req.file.path.replace(
      /\/home\/kawthar\/Desktop\/backend1\/test-backend\/public\//,
      ""
    )
  );
  const title = req.body.title;
  const description = req.body.description;
  const button = req.body.button;
  const image = req.file.filename;


  
  const newSlider = new Slider({
    title,
    description,
    button,
    image,
  });
  await newSlider
    .save()
    .then(() => res.json("Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//update slider
router.route("/update/:id",upload.single("image")).put(async (req, res) => {
  await Slider.findById(req.params.id)
    .then((Slider) => {
      Slider.title = req.body.title;
      Slider.description = req.body.description;
      Slider.button = req.body.button;
      Slider.image = req.file.filename;

      Slider.save()
        .then(() => res.json("Slider updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// get slider by id
router.get("/:id", async (req, res) => {
  await Slider.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
