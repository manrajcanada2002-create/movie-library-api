<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

const MovieForm = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
<<<<<<< HEAD
  const [poster, setPoster] = useState("");   // ⭐ NEW STATE

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadMovie();
    }
  }, [id]);

  const loadMovie = async () => {
    const res = await api.get(`/movies/${id}`);
    const m = res.data;

    setTitle(m.title);
    setYear(m.year);
    setGenre(m.genre);
    setRating(m.rating);
    setPoster(m.poster);  // ⭐ NEW FIELD
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      year,
      genre,
      rating,
      poster,   // ⭐ IMPORTANT
    };

    if (id) {
      await api.put(`/movies/${id}`, data);
    } else {
      await api.post("/movies", data);
    }

    navigate("/movies");
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", color: "white" }}>
      <h2>{id ? "Edit Movie" : "Add Movie"}</h2>

      <form onSubmit={handleSubmit}>
        
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem" }}
        />

        <label>Year</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem" }}
        />

        <label>Genre</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem" }}
        />

        <label>Rating (0-10)</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
          min="0"
          max="10"
          style={{ width: "100%", marginBottom: "1rem" }}
        />

        {/* ⭐ NEW POSTER INPUT FIELD */}
        <label>Poster URL</label>
        <input
          type="text"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          required
          placeholder="https://image-url.jpg"
          style={{ width: "100%", marginBottom: "1rem" }}
        />

        <button type="submit">
          {id ? "Update Movie" : "Add Movie"}
        </button>
      </form>
=======
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  useEffect(() => {
    const loadMovie = async () => {
      if (!isEdit) return;
      try {
        const res = await api.get(`/api/movies/${id}`);
        const m = res.data;
        setTitle(m.title || "");
        setYear(m.year || "");
        setGenre(m.genre || "");
        setRating(m.rating || "");
      } catch (err) {
        console.error(err);
        setMessage("Failed to load movie");
      }
    };

    loadMovie();
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const payload = {
      title,
      year: Number(year),
      genre,
      rating: Number(rating),
    };

    try {
      if (isEdit) {
        await api.put(`/api/movies/${id}`, payload);
        setMessage("Movie updated successfully");
      } else {
        await api.post("/api/movies", payload);
        setMessage("Movie created successfully");
      }
      navigate("/movies");
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message ||
          "Failed to save movie. Are you logged in as admin?"
      );
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto" }}>
      <h2>{isEdit ? "Edit Movie" : "Add Movie"}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Genre</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Rating (0-10)</label>
          <input
            type="number"
            value={rating}
            min="0"
            max="10"
            step="0.1"
            onChange={(e) => setRating(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit">{isEdit ? "Update" : "Create"}</button>
      </form>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
    </div>
  );
};

export default MovieForm;
