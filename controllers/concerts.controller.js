const Concerts = require('../models/concerts.model');

exports.getAll = async (req, res) => {
  try {
      res.json(await Concerts.find());
  }
  catch (err) {
      res.status(500).json({message: err});
  }
};

exports.getById = async (req, res) => {
  try {
      const con = await Concerts.findById(req.params.id);
      if (!con) res.status(404).json({ message: 'Not found' });
      else res.json(con);
  }
  catch (err) {
      res.status(500).json({message: err});
  }
};

exports.post = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
      const newConcert = new Concerts({ performer, genre, price, day, image });
      await newConcert.save();
      res.json({ message: 'OK' });
  }
  catch (err) {
      res.status(500).json({message: err});
  }
};

exports.put = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
      const con = await (Concerts.findById(req.params.id));
      if (con) {
          Object.assign(con, {performer, genre, price, day, image});
          const newCon = await con.save();
          res.json(newCon);
      }
      else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
      res.status(500).json({message: err});
  }
};

exports.delete = async (req, res) => {
  try {
      const con = await (Concerts.findById(req.params.id));
      if (con) {
          await con.remove();
          res.json(con);
      }
      else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
      res.status(500).json({message: err});
  }
}; 