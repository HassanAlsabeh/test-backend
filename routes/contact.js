const router = require('express').Router();
const Contact = require ('../models/contact.model.js');




router.route('/').get((req, res) => {
    Contact.find()
    .then(Contact => res.json(Contact))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const Contacts = new Contact({
       Phone: req.body.Phone,
       Email: req.body.Email,
       Instagram: req.body.Instagram,
       Facebook: req.body.Facebook,
       Linkedin: req.body.Linkedin,
       Whatsapp: req.body.Linkedin,
       Github: req.body.Github

    });
     
    Contacts.save()
    .then(() => res.json('Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


 router.route('/update/:id').put((req, res) => {
   Contact.findById(req.params.id)
     .then(contacts  => {
       contacts.Phone = req.body.Phone;
       contacts.Email = req.body.Email;
       contacts.Instagram = req.body.Instagram;
       contacts.Facebook = req.body.Facebook;
       contacts.Linkedin = req.body.Linkedin;
       contacts.Whatsapp = req.body.Whatsapp;
       contacts.Github = req.body.Github;
      
    
       contacts.save()
         .then(() => res.json('Exercise updated!'))
         .catch(err => res.status(400).json('Error: ' + err));
     })
     .catch(err => res.status(400).json('Error: ' + err));
});




module.exports = router;