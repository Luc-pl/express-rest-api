const express = require('express');
//const path = require('path');
//const cors = require('cors');
const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
  
app.listen(8000, () => {
   console.log('Server is running on port: 8000');
});

app.use(express.json());
//app.use(cors());
//app.use(express.static(path.join(__dirname, '/public')));

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
    return res.status(404).json({
      message: 'Not found...'
    });
});