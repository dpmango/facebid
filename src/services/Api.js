import axios from 'axios';

// const BACKEND_URL = process.env.NODE_ENV === 'production' ? "https://cabin-backend.herokuapp.com" : "http://localhost:8000/"
const BACKEND_URL = './api' // fake api for now

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

export default api;