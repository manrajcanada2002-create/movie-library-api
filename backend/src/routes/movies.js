<<<<<<< HEAD
const express = require("express");
const router = express.Router();

=======

const express = require("express");
const router = express.Router();
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
const Movie = require("../models/Movie");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

<<<<<<< HEAD
// =============================
// PUBLIC ROUTES
// =============================

// Get all movies
=======
// PUBLIC ROUTES

// GET all movies (public)
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
<<<<<<< HEAD
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
=======
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
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
<<<<<<< HEAD
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
=======
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
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
    }
  }
);

<<<<<<< HEAD
// Update movie
=======
// UPDATE movie (admin)
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
<<<<<<< HEAD
      if (!movie)
        return res.status(404).json({ message: "Movie not found" });
=======
      if (!movie) return res.status(404).json({ message: "Movie not found" });
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe

      movie.title = req.body.title ?? movie.title;
      movie.year = req.body.year ?? movie.year;
      movie.genre = req.body.genre ?? movie.genre;
      movie.rating = req.body.rating ?? movie.rating;
<<<<<<< HEAD
      movie.poster = req.body.poster ?? movie.poster;

      const updated = await movie.save();

      res.json({
        message: "Movie updated successfully",
        movie: updated,
      });

    } catch (err) {
      console.error("Update movie error:", err);
      res.status(500).json({ message: "Failed to update movie" });
=======

      const updatedMovie = await movie.save();
      res.json(updatedMovie);
    } catch (err) {
      res.status(400).json({ message: err.message });
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
    }
  }
);

<<<<<<< HEAD
// Delete movie
=======
// DELETE movie (admin)
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
<<<<<<< HEAD

      if (!movie)
        return res.status(404).json({ message: "Movie not found" });

      res.json({ message: "Movie deleted successfully" });

    } catch (err) {
      console.error("Delete movie error:", err);
      res.status(500).json({ message: "Failed to delete movie" });
=======
      if (!movie) return res.status(404).json({ message: "Movie not found" });
      res.json({ message: "Movie deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
    }
  }
);

module.exports = router;
