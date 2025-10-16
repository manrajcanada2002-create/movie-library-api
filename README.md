# Movie Library API

Simple modular Express.js backend for a Movie Library project.

---

## Phase 2 — Modular Architecture Implementation

**What I implemented**
- Feature-based modular structure:
  - `modules/movies/` — contains `models.js` (CRUD/business logic) and `middlewares.js` (validation).
  - `routes/movies.js` — Express routes that call model functions only.
- JSON data store:
  - `data/movies.json` — sample movie records used as a simple file-based data source.
- Validation:
  - `express-validator` used for route-level validation (POST/PUT and `:id` param checks).
- App-level middleware & error handling:
  - `express.json()` and `express.urlencoded()` parsing.
  - 404 Not Found handler and centralized error-handling middleware that logs errors and returns `500`.
- Proper HTTP status codes:
  - `200` → GET/PUT/DELETE success
  - `201` → POST created
  - `400` → validation errors
  - `404` → resource not found
  - `500` → server errors

---

## Project structure

