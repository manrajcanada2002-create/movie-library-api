// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Import modular routes
const moviesRouter = require('./routes/movies');
const usersRouter = require('./routes/users');
const genresRouter = require('./routes/genres');
const reviewsRouter = require('./routes/reviews');

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB Atlas
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => {
  console.error('❌ MongoDB connection failed:', err.message);
  process.exit(1); // Stop server if DB fails
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Movie Library API - Phase 3');
});

// Mount routers
app.use('/movies', moviesRouter);
app.use('/users', usersRouter);
app.use('/genres', genresRouter);
app.use('/reviews', reviewsRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
