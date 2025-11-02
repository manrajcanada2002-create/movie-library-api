const express = require('express');
const router = express.Router();
const Genre = require('../modules/genres/models'); // Make sure this path is correct

// GET all genres
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json({ 
      message: 'Genres retrieved successfully',
      count: genres.length,
      data: genres 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new genre
router.post('/', async (req, res) => {
  try {
    const genre = new Genre(req.body);
    const savedGenre = await genre.save();
    res.status(201).json({ 
      message: 'Genre created successfully',
      data: savedGenre 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;