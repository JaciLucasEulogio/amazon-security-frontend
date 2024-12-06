import React from 'react';

const VerifyEmailPage = ({ 
  formData, 
  handleChange, 
  handleVerifyEmail 
}) => {
  return (
    <form onSubmit={handleVerifyEmail} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl mb-4 text-center">Verificar Correo</h2>
      <input 
        type="text" 
        name="code" 
        placeholder="Código de Verificación" 
        value={formData.code}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 mb-3"
        required 
      />
      <button 
        type="submit" 
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        Verificar
      </button>
    </form>
  );
};

export default VerifyEmailPage;