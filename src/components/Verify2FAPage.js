import React from 'react';

const Verify2FAPage = ({ 
  formData, 
  handleChange, 
  handleVerify2FA 
}) => {
  return (
    <form onSubmit={handleVerify2FA} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl mb-4 text-center">Verificación 2FA</h2>
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
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        Verificar
      </button>
    </form>
  );
};

export default Verify2FAPage;