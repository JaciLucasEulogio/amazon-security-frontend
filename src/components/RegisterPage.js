import React from 'react';

const RegisterPage = ({ 
  formData, 
  handleChange, 
  handleRegister, 
  onLoginClick 
}) => {
  return (
    <form onSubmit={handleRegister} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl mb-4 text-center">Registro</h2>
      <input 
        type="text" 
        name="name" 
        placeholder="Nombre" 
        value={formData.name}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 mb-3"
        required 
      />
      <input 
        type="email" 
        name="email" 
        placeholder="Correo Electrónico" 
        value={formData.email}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 mb-3"
        required 
      />
      <input 
        type="password" 
        name="password" 
        placeholder="Contraseña" 
        value={formData.password}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 mb-3"
        required 
      />
      <button 
        type="submit" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        Registrarse
      </button>
      <p className="text-center mt-3">
        ¿Ya tienes cuenta? 
        <span 
          onClick={onLoginClick} 
          className="text-blue-500 cursor-pointer ml-1"
        >
          Iniciar Sesión
        </span>
      </p>
    </form>
  );
};

export default RegisterPage;