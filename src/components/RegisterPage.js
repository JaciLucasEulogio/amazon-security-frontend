import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RegisterPage = ({
  formData,
  handleChange,
  handleRegister,
  onLoginClick,
}) => {
  const [errors, setErrors] = useState({});
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const validate = () => {
    const newErrors = {};

    // Chequeo de completitud
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es obligatoria.';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Debes confirmar tu contraseña.';
    }

    // Chequeo de validez
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido.';
    }

    // Chequeo de límite y rango
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos seis caracteres.';
    }

    // Chequeo de razonabilidad
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    // Chequeo de duplicados (simulado)
    const existingEmails = ['test@example.com', 'user@example.com']; // Simulación de búsqueda en tabla
    if (existingEmails.includes(formData.email)) {
      newErrors.email = 'El correo electrónico ya está registrado.';
    }

    // Chequeo de secuencia
    const sequentialRegex = /(.)\1{2,}/;
    if (sequentialRegex.test(formData.password)) {
      newErrors.password = 'La contraseña no puede contener caracteres repetidos consecutivamente.';
    }

    // Chequeo de relaciones lógicas
    if (formData.name && formData.name.length > 0 && !isNaN(formData.name)) {
      newErrors.name = 'El nombre no puede ser un número.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && captchaVerified) {
      handleRegister(e);
    } else if (!captchaVerified) {
      alert('SE HA ENCONTRADO UN PROBLEMA. Por favor resuelva el captcha para continuar.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-2xl mb-4 text-center">Crear cuenta</h2>

      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
        Tu nombre
      </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
        className={`shadow appearance-none border ${
          errors.name ? 'border-red-500' : ''
        } rounded w-full py-2 px-3 mb-4`}
        required
      />
      {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}

      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Correo electrónico
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Correo Electrónico"
        value={formData.email}
        onChange={handleChange}
        className={`shadow appearance-none border ${
          errors.email ? 'border-red-500' : ''
        } rounded w-full py-2 px-3 mb-4`}
        required
      />
      {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}

      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Contraseña
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        className={`shadow appearance-none border ${
          errors.password ? 'border-red-500' : ''
        } rounded w-full py-2 px-3 mb-1`}
        required
      />
      {errors.password && (
        <p className="text-red-500 text-xs italic">{errors.password}</p>
      )}
      <p className="text-xs text-gray-600 mb-4">
        i La contraseña debe contener al menos seis caracteres.
      </p>

      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
        Vuelve a escribir la contraseña
      </label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Vuelve a escribir la contraseña"
        value={formData.confirmPassword}
        onChange={handleChange}
        className={`shadow appearance-none border ${
          errors.confirmPassword ? 'border-red-500' : ''
        } rounded w-full py-2 px-3 mb-4`}
        required
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>
      )}

      {/* Aquí se muestra el reCAPTCHA de Google */}
      <div className="mb-4">
        {Object.keys(errors).length > 0 && (
          <div className="text-red-500 mb-4 flex items-center">
            <span className="mr-2">&#9888;</span> SE HA ENCONTRADO UN PROBLEMA.
            Por favor resuelva el captcha para continuar.
          </div>
        )}
        <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={handleCaptchaChange}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        Crea tu cuenta de Amazon
      </button>

      <p className="text-xs text-gray-600 mt-4 text-center">
        Al crear una cuenta, aceptas las{' '}
        <span className="text-blue-500 cursor-pointer">condiciones de uso</span> y el{' '}
        <span className="text-blue-500 cursor-pointer">aviso de privacidad</span> de Amazon.com.
      </p>

      <p className="text-center mt-6">
        ¿Ya tienes una cuenta?{' '}
        <span
          onClick={onLoginClick}
          className="text-blue-500 cursor-pointer ml-1"
        >
          Iniciar Sesión &gt;
        </span>
      </p>
    </form>
  );
};

export default RegisterPage;
