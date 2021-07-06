const router = require('express').Router();
let Adds = require('../models/home.model');

router.route('/').get((req, res) => {
  Adds.find()
    .then(adds => res.json(adds))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const adds = new Adds({
       title: req.body.title,
       description: req.body.description
    });
     
    adds.save()
    .then(() => res.json('Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;