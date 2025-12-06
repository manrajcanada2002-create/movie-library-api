const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: { type: Number, required: true },
<<<<<<< HEAD
    genre: { type: String, required: true },
    rating: { type: Number, min: 0, max: 10 },
    poster: { type: String, required: true }
=======
    genre: { type: String },
    rating: { type: Number, min: 0, max: 10 },
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
  },
  { timestamps: true }
);

<<<<<<< HEAD
module.exports = mongoose.model("Movie", movieSchema);
=======
module.exports = mongoose.model("Movie", movieSchema);
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
