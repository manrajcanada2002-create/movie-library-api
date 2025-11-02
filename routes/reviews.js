const express = require('express');
const router = express.Router();
const Movie = require('../modules/movies/models');
const { body, validationResult } = require('express-validator');

// Get all movies
router.get('/', async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    next(err);
  }
});

// Get one movie
router.get('/:id', async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    next(err);
  }
});

// Create movie
router.post('/', 
  body('title').notEmpty(),
  body('genre').notEmpty(),
  body('year').isInt({ min: 1888 }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const movie = new Movie(req.body);
      await movie.save();
      res.status(201).json(movie);
    } catch (err) {
      next(err);
    }
});

module.exports = router;
