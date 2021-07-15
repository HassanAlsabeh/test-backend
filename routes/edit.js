const router = require('express').Router();
const Adds = require('../models/about.model');

router.route('/about/:id').put((req, res) => {
    Adds.findById(req.params.id)
      .then(abouts => {
        abouts.title1 = req.body.title1;
        abouts.description1 = req.body.description1;
        abouts.title2 = req.body.title2;
        abouts.description2 = req.body.description2;
        abouts.title3 = req.body.title3;
        abouts.description3 = req.body.description3;
        abouts.title4 = req.body.title4;
        abouts.description4 = req.body.description4;
      
        abouts.save()
          .then(() => res.json('Exercise updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;