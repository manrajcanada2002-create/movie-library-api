const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  director: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 10
  },
  description: {
    type: String
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model('Movie', movieSchema);