const router = require('express').Router();
const Adds = require('../models/about.model');

router.route('/').get((req, res) => {
  Adds.find()
    .then(data => res.json(data))
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