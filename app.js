const express = require('express');
const app = express();

// Import movies router
const moviesRouter = require('./routes/movies');

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Movie Library API');
});

// Mount movies router at /movies
app.use('/movies', moviesRouter);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
