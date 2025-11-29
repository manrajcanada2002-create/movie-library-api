import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MovieList from "./pages/MovieList";
import MovieForm from "./pages/MovieForm";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-black text-white flex gap-4">
        <Link to="/">Movies</Link>
        <Link to="/add">Add Movie</Link>
      </nav>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/add" element={<MovieForm />} />
        <Route path="/edit/:id" element={<MovieForm />} />
      </Routes>
    </BrowserRouter>
  );
}