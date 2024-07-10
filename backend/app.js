const express = require('express');
const mongoose = require('mongoose');
const postRouter = require('./routes/index');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('frontend/public'));

// Routes
app.use('/api/posts', postRouter);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
