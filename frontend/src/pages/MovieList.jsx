import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");
  const { role } = useAuth();

  const fetchMovies = async () => {
    try {
      const res = await api.get("/api/movies");
      setMovies(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load movies");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      await api.delete(`/api/movies/${id}`);
      setMovies((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message ||
          "Failed to delete movie. Are you logged in as admin?"
      );
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto" }}>
      <h2>Movie Library</h2>
      {role === "admin" && (
        <div style={{ marginBottom: "1rem" }}>
          <Link to="/movies/new">Add Movie</Link>
        </div>
      )}
      {message && <p>{message}</p>}
      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Rating</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {movies.map((m) => (
            <tr key={m._id}>
              <td>{m.title}</td>
              <td>{m.year}</td>
              <td>{m.genre}</td>
              <td>{m.rating}</td>
              {role === "admin" && (
                <td>
                  <Link to={`/movies/edit/${m._id}`} style={{ marginRight: 8 }}>
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(m._id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieList;
