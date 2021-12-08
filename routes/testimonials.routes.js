const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
    res.json(db.testimonials.find(item => item.id == req.params.id));
});

router.route('/testimonials/random').get((req, res) => {
    let item = db.testimonials[Math.floor(Math.random() * db.length )];
    res.json(item);
});

router.route('/testimonials/').post((req, res) => {
    const obj ={
      id: uuidv4(),
      author: req.body.author,
      text: req.body.text
    }
    db.testimonials.push(obj);
    return res.json({
      message: 'ok'
    });
});

router.route('/testimonials/:id').put((req, res) => {
    db.testimonials.forEach(testimonial => {
      if(testimonial.id == req.params.id && testimonial.id) {
        testimonial.author = req.body.author,
        testimonial.text = req.body.text
        return res.json(db.testimonials);
      } else req.status(404).json({ message: 'Not found...' });  
    })
});
  
router.route('/testimonials/:id').delete((req, res) => {
    db.testimonials.forEach(testimonial => {
      if(testimonial.id && testimonial.id == req.params.id) {
        const index = db.testimonials.indexOf(testimonial);
        db.testimonials.splice(index, 1);
        return res.json(db.testimonials);
      }
    });
    res.status(404).json({ message: 'Not found...' });
});
  
module.exports = router; 