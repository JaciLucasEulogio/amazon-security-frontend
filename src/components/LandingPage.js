import React from 'react';
import Navbar from './Navbar';

const LandingPage = ({ onLoginClick, onRegisterClick }) => {
  return (
    <div>
      {/* Navbar component */}
      <Navbar />

      {/* Main content of the landing page */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center mt-6">
        <h1 className="text-3xl font-bold mb-6">Bienvenido</h1>
        <p className="mb-6 text-gray-600">Selecciona una opción para continuar</p>
        <div className="space-y-4">
          {/* Login Button */}
          <button 
            onClick={onLoginClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Iniciar Sesión
          </button>
          {/* Register Button */}
          <button 
            onClick={onRegisterClick}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
