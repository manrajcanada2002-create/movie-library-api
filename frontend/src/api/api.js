import axios from "axios";

const api = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:5000/api",
});

// AUTO-ADD TOKEN
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) config.headers.Authorization = `Bearer ${token}`;

=======
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
>>>>>>> a850a1b55a8b0b13f3a05d1b7af58a9ec36eadfe
  return config;
});

export default api;
