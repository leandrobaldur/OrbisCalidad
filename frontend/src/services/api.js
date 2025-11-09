// src/services/api.js
import axios from 'axios';

// Permite configurar la URL del backend mediante una variable de entorno
const baseURL = process.env.REACT_APP_API_URL || 'https://api-rest-bicentenario-gcex.onrender.com';

const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export default API;
