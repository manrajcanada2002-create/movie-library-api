const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// GET all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single movie
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE movie
router.post("/", async (req, res) => {
  const { title, year, genre, rating } = req.body;
  if (!title || !year) {
    return res.status(400).json({ message: "Title and year are required" });
  }
  try {
    const movie = await Movie.create({ title, year, genre, rating });
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE movie
router.put("/:id", async (req, res) => {
  const { title, year, genre, rating } = req.body;
  if (!title || !year) {
    return res.status(400).json({ message: "Title and year are required" });
  }
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, year, genre, rating },
      { new: true, runValidators: true }
    );
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE movie
router.delete("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;