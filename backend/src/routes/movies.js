
const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// PUBLIC ROUTES

// GET all movies (public)
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single movie (public)
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PROTECTED + ROLE-BASED ROUTES (admin only)

// CREATE movie (admin)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    const movie = new Movie({
      title: req.body.title,
      year: req.body.year,
      genre: req.body.genre,
      rating: req.body.rating,
    });

    try {
      const newMovie = await movie.save();
      res.status(201).json(newMovie);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// UPDATE movie (admin)
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).json({ message: "Movie not found" });

      movie.title = req.body.title ?? movie.title;
      movie.year = req.body.year ?? movie.year;
      movie.genre = req.body.genre ?? movie.genre;
      movie.rating = req.body.rating ?? movie.rating;

      const updatedMovie = await movie.save();
      res.json(updatedMovie);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// DELETE movie (admin)
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
      if (!movie) return res.status(404).json({ message: "Movie not found" });
      res.json({ message: "Movie deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
