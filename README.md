# Movie Library API – Phase 4 (Backend + React Frontend)

This project contains:
- **backend/**: Express + MongoDB (Mongoose) REST API for movies
- **frontend/**: React app with React Router and Axios for full CRUD

## Backend

- Base URL: `http://localhost:5000`
- Movies endpoint: `/api/movies`

### Setup

```bash
cd backend
npm install
copy .env.example .env   # add your MongoDB Atlas URI
npm start
```

## Frontend

```bash
cd frontend
npm install
npm start
```

The frontend expects the backend to run on `http://localhost:5000`.

Implemented for Phase 4:
- React UI for movie CRUD
- React Router navigation
- Axios API calls (no hard-coded data)
- Client-side validation with required fields (★)
- User-friendly error and success messages