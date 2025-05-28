import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './index.css';
import App from './components/App'; // ✅ Correcto: Apunta a 'components/App'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);