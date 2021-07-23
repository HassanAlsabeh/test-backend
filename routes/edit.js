const express = require ('express');
const router= express.Router();
const cors = require("cors");
const Adds = require("../models/about.model");
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

// router.put('/update' ,upload.single('image'), (req, res) => {
//   console.log(req.file)
//     Adds.findById(req.params.id)
    
//       .then(abouts => {
//         abouts.certificate = req.body.certificate;
//         abouts.certificatedesc = req.body.certificatedesc;
//         abouts.profile = req.body.profile;
//         abouts.profiledesc = req.body.profiledesc;
//         abouts.languages = req.body.languages;
//         abouts.languagesdesc = req.body.languagesdesc;
//         abouts.programs = req.body.programs;
//         abouts.programsdesc = req.body.programsdesc;
//         abouts.image = req.file.filename
      
//         abouts.save()
//           .then(() => res.json('Exercise updated!'))
//           .catch(err => res.status(400).json('Error: ' + err));
//       })
//       .catch(err => res.status(400).json('Error: ' + err));
//   });
  
  module.exports = router;