import React, { useState } from "react";

const LoginPage = ({ formData, handleChange, handleLogin, onRegisterClick }) => {
  const [step, setStep] = useState("email");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Por favor, introduce un correo válido.",
      }));
    }

    handleChange(e);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(formData.email)) {
      setStep("password");
    } else {
      setErrors((prev) => ({ ...prev, email: "Correo inválido." }));
    }
  };

  const handleChangeEmail = () => setStep("email");

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="mt-10 mb-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
          className="w-36"
        />
      </div>

      {step === "email" && (
        <form
          onSubmit={handleEmailSubmit}
          className="bg-white shadow-lg rounded-lg px-10 pt-8 pb-10 w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
            Iniciar sesión
          </h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleInputChange}
              className={`shadow appearance-none border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded w-full py-2 px-3 mt-1 focus:outline-none focus:ring ${
                !errors.email && formData.email ? "ring-green-500" : "ring-red-500"
              }`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full"
          >
            Continuar
          </button>

          <div className="mt-4 text-xs text-gray-600 text-center">
            Al continuar, aceptas las{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Condiciones de uso
            </a>{" "}
            y el{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Aviso de privacidad
            </a>{" "}
            de Amazon.
          </div>
        </form>
      )}

      {step === "password" && (
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-lg rounded-lg px-10 pt-8 pb-10 w-full max-w-md"
        >
          <div className="mb-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-700">{formData.email}</p>
            </div>
            <div>
              <span
                onClick={handleChangeEmail}
                className="text-blue-600 hover:underline cursor-pointer text-sm"
              >
                Cambiar
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full"
          >
            Iniciar sesión
          </button>
        </form>
      )}

      <div className="mt-6 text-center text-sm text-gray-600">
        ¿Necesitas ayuda?{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Ayuda
        </a>
      </div>
      <div className="mt-4 text-center">
        ¿Compras para el trabajo?{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Compra en Amazon Business
        </a>
      </div>
      <div className="mt-4 text-center text-sm">
        ¿Eres nuevo en Amazon?{" "}
        <a href="#" className="text-blue-600 hover:underline font-bold">
          Crea tu cuenta de Amazon
        </a>
      </div>

      <footer className="mt-8 text-xs text-gray-500 text-center">
        Condiciones de uso &nbsp;|&nbsp; Aviso de privacidad &nbsp;|&nbsp; Ayuda <br />
        © 1996-2024 Amazon.com, Inc. o sus afiliados
      </footer>
    </div>
  );
};

export default LoginPage;

