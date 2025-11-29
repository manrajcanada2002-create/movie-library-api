import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovies(res.data))
      .catch(() => alert("❗ Failed to load movies"));
  }, []);

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(() => {
        alert("✅ Movie deleted!");
        setMovies((prev) => prev.filter((m) => m._id !== id));
      })
      .catch(() => alert("❗ Delete failed"));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">🎬 Movie Library</h2>
      {movies.map((movie) => (
        <div key={movie._id} className="border p-2 mb-2 rounded">
          <p>
            <b>{movie.title}</b> ({movie.year}) {movie.genre && `- ${movie.genre}`}
          </p>
          <div className="flex gap-3 mt-2">
            <Link to={`/edit/${movie._id}`} className="text-blue-600">
              Edit ✏
            </Link>
            <button
              onClick={() => deleteMovie(movie._id)}
              className="text-red-600"
            >
              Delete 🗑
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}