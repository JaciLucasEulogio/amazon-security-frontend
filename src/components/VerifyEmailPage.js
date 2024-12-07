import React from 'react';

const VerifyEmailPage = ({
  formData,
  handleChange,
  handleVerifyEmail,
  handleResendCode,
  handleChangeEmail
}) => {
  const userEmail = formData.email || '';  // Suponiendo que el correo se encuentra en formData

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4 text-center">Verificar Dirección de Correo Electrónico</h2>
      
      <p className="text-center text-gray-700 mb-4">
        Para verificar tu email, hemos enviado un código a <strong>{userEmail}</strong>
        <span
          onClick={handleChangeEmail}
          className="text-blue-500 cursor-pointer ml-2 hover:text-blue-700"
        >
          (Cambiar)
        </span>
      </p>

      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
        Introduce el código de verificación
      </label>
      <input
        type="text"
        name="code"
        placeholder="Código de Verificación"
        value={formData.code}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 mb-4"
        required
      />
      
      <button
        type="submit"
        onClick={handleVerifyEmail}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        Verificar
      </button>

      <div className="text-center mt-4">
        <a
          href="#"
          onClick={handleResendCode}
          className="text-blue-500 hover:text-blue-700"
        >
          Reenviar código
        </a>
      </div>

      <div className="mt-6 text-xs text-center text-gray-600">
        <p>
          <a href="/terms" className="text-blue-500 hover:text-blue-700">Condiciones de uso</a> |{' '}
          <a href="/privacy" className="text-blue-500 hover:text-blue-700">Aviso de privacidad</a> |{' '}
          <a href="/help" className="text-blue-500 hover:text-blue-700">Ayuda</a>
        </p>
        <p className="mt-4">© 2024 Amazon.com</p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;


