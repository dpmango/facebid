import axios from 'axios';

const BACKEND_URL = process.env.NODE_ENV === 'production' ? "https://facebid-api.herokuapp.com" : "http://localhost:8000/"
// const BACKEND_URL = 'http://localhost:8000' // fake api for now

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

export default api;
