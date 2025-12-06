import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

const MovieForm = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
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
    </div>
  );
};

export default MovieForm;
