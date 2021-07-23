const Adds = require("../models/about.model");
const express = require ('express');
const router= express.Router();
const cors = require("cors");
const path = require("path");
const multer = require("multer");


router.use(express.static(path.join(__dirname, "../public"))) // <-- location of public dir
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/about/uploads"),
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
  Adds.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post('/add' ,upload.single('image'),(req, res) => {
  const adds = new Adds({
    certificate: req.body.certificate,
    certificatedesc: req.body.certificatedesc,
    profile: req.body.profile,
    profiledesc: req.body.profiledesc,
    languages: req.body.languages,
    languagesdesc: req.body.languagesdesc,
    programs: req.body.programs,
    programsdesc: req.body.programsdesc,
    image:req.file.filename
  });

  adds
    .save()
    .then(() => res.json("Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});



router.put("/update/:id" ,upload.single('image'), (req, res) => {
    console.log(req.file)
      Adds.findById(req.params.id)
      
        .then(abouts => {
          abouts.certificate = req.body.certificate;
          abouts.certificatedesc = req.body.certificatedesc;
          abouts.profile = req.body.profile;
          abouts.profiledesc = req.body.profiledesc;
          abouts.languages = req.body.languages;
          abouts.languagesdesc = req.body.languagesdesc;
          abouts.programs = req.body.programs;
          abouts.programsdesc = req.body.programsdesc;
          abouts.image = req.file.filename
        
          abouts.save()
            .then(() => res.json('Exercise updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    });

module.exports = router;
