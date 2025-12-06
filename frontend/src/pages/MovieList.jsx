import React, { useEffect, useState } from "react";
import api from "../api/api";
<<<<<<< HEAD
import "./MovieList.css";
import { Link, useNavigate } from "react-router-dom";
=======
import { Link } from "react-router-dom";
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
import { useAuth } from "../context/AuthContext";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
<<<<<<< HEAD
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

  // 🔥 PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 6;

  const { user, logout } = useAuth();
  const navigate = useNavigate();
=======
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
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe

  useEffect(() => {
    fetchMovies();
  }, []);

<<<<<<< HEAD
  const fetchMovies = async () => {
    try {
      const res = await api.get("/movies");
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 SEARCH + GENRE FILTERING
  const filteredMovies = movies.filter((movie) => {
    const titleMatch = movie.title.toLowerCase().includes(search.toLowerCase());
    const genreMatch = genre === "All" || movie.genre === genre;
    return titleMatch && genreMatch;
  });

  // 🔥 PAGINATION CALCULATIONS
  const lastIndex = currentPage * moviesPerPage;
  const firstIndex = lastIndex - moviesPerPage;
  const currentMovies = filteredMovies.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="movie-container">

      <div className="header">
        <h1 className="title">🎬 Movie Library</h1>
        <div className="user-info">
          <span>{user?.email} ({user?.role})</span>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset page
          }}
          className="search-box"
        />

        <select
          className="genre-select"
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
            setCurrentPage(1); // reset page
          }}
        >
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Thriller">Thriller</option>
        </select>

        {user?.role === "admin" && (
          <button className="add-btn" onClick={() => navigate("/add")}>
            + Add Movie
          </button>
        )}
      </div>

      {/* MOVIE GRID */}
      <div className="movie-grid">
        {currentMovies.map((movie) => (
          <div key={movie._id} className="movie-card">

            <img src={movie.poster} alt={movie.title} className="poster" />

            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-info">
              {movie.year} • {movie.genre}
            </p>
            <p className="rating">⭐ {movie.rating}</p>

            {user?.role === "admin" && (
              <div className="btn-group">
                <Link to={`/edit/${movie._id}`} className="edit-btn">
                  Edit
                </Link>
                <button
                  className="delete-btn"
                  onClick={async () => {
                    await api.delete(`/movies/${movie._id}`);
                    fetchMovies();
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="page-btn"
        >
          ⬅ Prev
        </button>

        <span className="page-number">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="page-btn"
        >
          Next ➜
        </button>
      </div>

=======
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
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
    </div>
  );
};

export default MovieList;
