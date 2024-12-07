import React from 'react';

const Verify2FAPage = ({ 
  formData, 
  handleChange, 
  handleVerify2FA 
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
      <h2 className="text-3xl mb-6 text-center text-gray-900 font-semibold">Verificación 2FA</h2>
      
      <form onSubmit={handleVerify2FA} className="space-y-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Código de Verificación</label>
          <input
            type="text"
            name="code"
            placeholder="Código de Verificación"
            value={formData.code}
            onChange={handleChange}
            className="shadow-sm border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg w-full"
          >
            Verificar
          </button>
        </div>
      </form>

      <div className="text-center mt-6 text-xs text-gray-600">
        <p>
          <a href="/terms" className="text-blue-500 hover:text-blue-700">Condiciones de Uso</a> |{' '}
          <a href="/privacy" className="text-blue-500 hover:text-blue-700">Aviso de Privacidad</a> |{' '}
          <a href="/help" className="text-blue-500 hover:text-blue-700">Ayuda</a>
        </p>
        <p className="mt-2">© 2024 Amazon.com</p>
      </div>
    </div>
  );
};

export default Verify2FAPage;
