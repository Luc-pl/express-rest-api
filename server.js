const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const socket = require('socket.io');
const mongoose = require('mongoose');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
  
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000')
});

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    return res.status(404).json({
      message: 'Not found...'
    });
}); 

mongoose.connect('mongodb+srv://Luc:qR@fTbjwNKw7hcZ@cluster0.lfyin.mongodb.net/NewWaveDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const io = socket(server);
io.on('connection', socket => {
  console.log('New socket ', socket.id);
});

module.exports = server;