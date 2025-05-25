// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // cambia esto si tu backend está en otra URL
});

export default API;
