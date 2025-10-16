// app.js
const express = require('express');
const app = express();

// Import modular routes
const moviesRouter = require('./routes/movies');

// Application-level middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Movie Library API');
});

// Mount feature router
app.use('/movies', moviesRouter);

// 404 handler (must be after all routes)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  // don't leak internal error details in production
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server if run directly (keeps it testable for other modules)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} else {
  module.exports = app;
}
