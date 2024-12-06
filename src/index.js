import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Asegúrate de que el archivo CSS de Tailwind esté importado
import App from './App'; // Asegúrate de que App.js está correctamente importado

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);