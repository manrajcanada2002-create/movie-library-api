const mongoose = require("mongoose");
const Movie = require("./src/models/Movie");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

const movies = [
  {
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    rating: 9.0,
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
  },
  {
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    poster: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg"
  },
  {
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    rating: 8.6,
    poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg"
  },
  {
    title: "Avengers: Endgame",
    year: 2019,
    genre: "Action",
    rating: 8.4,
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
  },
  {
    title: "Avatar",
    year: 2009,
    genre: "Fantasy",
    rating: 7.8,
    poster: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg"
  },
  {
    title: "Avatar: The Way of Water",
    year: 2022,
    genre: "Sci-Fi",
    rating: 7.7,
    poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"
  },
  {
    title: "John Wick",
    year: 2014,
    genre: "Action",
    rating: 7.4,
    poster: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg"
  },
  {
    title: "John Wick: Chapter 2",
    year: 2017,
    genre: "Action",
    rating: 7.2,
    poster: "https://image.tmdb.org/t/p/w500/kL99FVq572hNPfMyfQCT7tYMoIr.jpg"
  },
  {
    title: "John Wick: Chapter 3",
    year: 2019,
    genre: "Action",
    rating: 7.4,
    poster: "https://image.tmdb.org/t/p/w500/ziEuG1esPFLsWFp5YjWgA2wJ22U.jpg"
  },
  {
    title: "John Wick: Chapter 4",
    year: 2023,
    genre: "Action",
    rating: 8.0,
    poster: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
  },
  {
    title: "Spider-Man: No Way Home",
    year: 2021,
    genre: "Action",
    rating: 8.3,
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
  },
  {
    title: "Iron Man",
    year: 2008,
    genre: "Action",
    rating: 7.9,
    poster: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg"
  },
  {
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "Drama",
    rating: 9.3,
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"
  },
  {
    title: "The Godfather",
    year: 1972,
    genre: "Crime",
    rating: 9.2,
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
  },
  {
    title: "The Matrix",
    year: 1999,
    genre: "Sci-Fi",
    rating: 8.7,
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
  },
  {
    title: "The Matrix Reloaded",
    year: 2003,
    genre: "Sci-Fi",
    rating: 7.2,
    poster: "https://image.tmdb.org/t/p/w500/9TGHDvWrqKBzwDxDodHYXEmOE6J.jpg"
  },
  {
    title: "The Matrix Revolutions",
    year: 2003,
    genre: "Sci-Fi",
    rating: 6.8,
    poster: "https://image.tmdb.org/t/p/w500/fgm8OZ7o4G1G1I9EeGcb85Noe6L.jpg"
  },
  {
    title: "Oppenheimer",
    year: 2023,
    genre: "Drama",
    rating: 9.0,
    poster: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8pUWxVXUF.jpg"
  },
  {
    title: "Barbie",
    year: 2023,
    genre: "Comedy",
    rating: 7.1,
    poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51DbkovjH62.jpg"
  },
  {
    title: "Fight Club",
    year: 1999,
    genre: "Drama",
    rating: 8.8,
    poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"
  }
];


async function seed() {
  try {
    await Movie.deleteMany();
    await Movie.insertMany(movies);
    console.log("Movies seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
