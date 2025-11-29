import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function MovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({ title: "", year: "", genre: "", rating: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then((res) => setMovie(res.data))
        .catch(() => alert("❗ Failed to load movie"));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!movie.title || !movie.year) {
      setError("❗ Title and Year are required!");
      return;
    }

    const payload = {
      title: movie.title,
      year: Number(movie.year),
      genre: movie.genre,
      rating: movie.rating ? Number(movie.rating) : undefined,
    };

    const request = id
      ? axios.put(`http://localhost:5000/api/movies/${id}`, payload)
      : axios.post("http://localhost:5000/api/movies", payload);

    request
      .then(() => {
        alert("✅ Movie saved successfully!");
        navigate("/");
      })
      .catch(() => setError("❗ API Save Failed"));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit" : "Add"} Movie</h2>
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm">
        <div>
          <label>
            Movie Title <span className="text-red-600">★</span>
          </label>
          <input
            value={movie.title}
            onChange={(e) => setMovie({ ...movie, title: e.target.value })}
            className="w-full p-2 rounded"
          />
        </div>

        <div>
          <label>
            Year <span className="text-red-600">★</span>
          </label>
          <input
            type="number"
            value={movie.year}
            onChange={(e) => setMovie({ ...movie, year: e.target.value })}
            className="w-full p-2 rounded"
          />
        </div>

        <div>
          <label>Genre</label>
          <input
            value={movie.genre}
            onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
            className="w-full p-2 rounded"
          />
        </div>

        <div>
          <label>Rating (0–10)</label>
          <input
            type="number"
            min="0"
            max="10"
            value={movie.rating ?? ""}
            onChange={(e) => setMovie({ ...movie, rating: e.target.value })}
            className="w-full p-2 rounded"
          />
        </div>

        <button type="submit" className="bg-green-600 text-white p-2 rounded mt-2">
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}