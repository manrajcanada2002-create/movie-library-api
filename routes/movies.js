const express = require('express');
const router = express.Router();

// Dummy movie data
let movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi" },
  { id: 2, title: "The Dark Knight", genre: "Action" },
  { id: 3, title: "Interstellar", genre: "Sci-Fi" }
];

// GET all movies -> http://localhost:3000/movies
router.get('/', (req, res) => {
  res.json(movies);
});

// GET movie by ID -> http://localhost:3000/movies/1
router.get('/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  res.json(movie);
});

module.exports = router;
