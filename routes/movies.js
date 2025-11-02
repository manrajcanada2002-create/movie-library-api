const express = require('express');
const router = express.Router();
const Movie = require('../modules/movies/models'); // Updated import path

// GET all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json({ 
      message: 'Movies retrieved successfully',
      count: movies.length,
      data: movies 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new movie
router.post('/', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const savedMovie = await movie.save();
    res.status(201).json({ 
      message: 'Movie created successfully',
      data: savedMovie 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ 
      message: 'Movie retrieved successfully',
      data: movie 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;