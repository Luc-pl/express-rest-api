const Testimonials = require('../models/testimonials.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonials.find());
  }
  catch (err) {
    res.status(500).json({message: err});
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonials.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const t = await Testimonials.findOne().skip(rand);
    if (!t) res.status(404).json({ message: 'Not found' });
    else res.json(t);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const t = await Testimonials.findById(req.params.id);
    if (!t) res.status(404).json({ message: 'Not found' });
    else res.json(t);
  }
  catch (err) {
    res.status(500).json({message: err});
  }
};

exports.post = async (req, res) => {
  const { author, text } = req.body;
  try {
    const newTestimonial = new Testimonials({ author, text });
    await newTestimonial.save();
    res.json({ message: 'OK' });
  }
  catch (err) {
    res.status(500).json({message: err});
  }
};

exports.put = async (req, res) => {
  const { author, text } = req.body;
  try {
    const t = await (Testimonials.findById(req.params.id));
    if (t) {
      Object.assign(t, {author, text});
      const newTestimonial = await t.save();
      res.json(newTestimonal);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({message: err});
  }
};

exports.delete = async (req, res) => {
  try {
    const t = await (Testimonials.findById(req.params.id));
    if (t) {
      await t.remove();
      res.json(con);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({message: err});
  }
};