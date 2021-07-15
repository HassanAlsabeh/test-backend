const router = require("express").Router();
const Adds = require("../models/about.model");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "../images");
  },
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});
router.route("/").get((req, res) => {
  Adds.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const adds = new Adds({
    title1: req.body.title1,
    description1: req.body.description1,
    title2: req.body.title2,
    description2: req.body.description2,
    title3: req.body.title3,
    description3: req.body.description3,
    title4: req.body.title4,
    description4: req.body.description4,
  });

  adds
    .save()
    .then(() => res.json("Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});



// router.route('/update/:id').post((req, res) => {
//   Adds.findById(req.params.id)
//     .then(abouts => {
//       abouts.title1 = req.body.title1;
//       abouts.description1 = req.body.description1;
//       abouts.title2 = req.body.title2;
//       abouts.description2 = req.body.description2;
//       abouts.title3 = req.body.title3;
//       abouts.description3 = req.body.description3;
//       abouts.title = req.body.title;
//       abouts.description4 = req.body.description4;

//       abouts.save()
//         .then(() => res.json('Exercise updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;
