const express = require("express");
const router = express.Router();

const Movie = require("../models/Movie");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// =============================
// PUBLIC ROUTES
// =============================

// Get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    console.error("GET movies error:", err);
    res.status(500).json({ message: "Failed to fetch movies" });
  }
});

// Get single movie
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(404).json({ message: "Movie not found" });

    res.json(movie);
  } catch (err) {
    console.error("GET movie error:", err);
    res.status(500).json({ message: "Failed to fetch movie" });
  }
});

// =============================
// ADMIN ROUTES
// =============================

// Create movie (Admin only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const { title, year, genre, rating, poster } = req.body;

      const movie = new Movie({
        title,
        year,
        genre,
        rating,
        poster
      });

      const newMovie = await movie.save();

      res.status(201).json({
        message: "Movie added successfully",
        movie: newMovie,
      });

    } catch (err) {
      console.error("Add movie error:", err);
      res.status(500).json({ message: "Failed to add movie" });
    }
  }
);

// Update movie
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie)
        return res.status(404).json({ message: "Movie not found" });

      movie.title = req.body.title ?? movie.title;
      movie.year = req.body.year ?? movie.year;
      movie.genre = req.body.genre ?? movie.genre;
      movie.rating = req.body.rating ?? movie.rating;
      movie.poster = req.body.poster ?? movie.poster;

      const updated = await movie.save();

      res.json({
        message: "Movie updated successfully",
        movie: updated,
      });

    } catch (err) {
      console.error("Update movie error:", err);
      res.status(500).json({ message: "Failed to update movie" });
    }
  }
);

// Delete movie
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);

      if (!movie)
        return res.status(404).json({ message: "Movie not found" });

      res.json({ message: "Movie deleted successfully" });

    } catch (err) {
      console.error("Delete movie error:", err);
      res.status(500).json({ message: "Failed to delete movie" });
    }
  }
);

module.exports = router;
