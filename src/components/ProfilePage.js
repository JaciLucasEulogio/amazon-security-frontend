import React, { useState } from 'react';

// Validaciones para el RUC
const validateRUC = (ruc) => {
  const rucPattern = /^(10|20)\d{8}$/;  // Validación para RUC 10 (persona natural) y RUC 20 (persona jurídica)
  
  if (!ruc || !ruc.match(rucPattern)) {
    return 'El RUC debe ser válido (10 para persona natural o 20 para persona jurídica, seguido de 8 dígitos).';
  }
  return null;
};

// Validación para el teléfono de Perú
const validatePhone = (phone) => {
  // Validación para números de teléfono en Perú: solo números que empiezan con 9 y tengan 9 dígitos
  const phonePattern = /^9\d{8}$/;  // El número debe empezar con 9 y seguir con 8 dígitos

  if (!phone || !phone.match(phonePattern)) {
    return 'El número de teléfono debe comenzar con 9 y tener 9 dígitos.';
  }
  return null;
};

const ProfilePage = ({
  user,
  formData,
  handleChange,
  handleUpdateProfile,
  handleLogout,
  toggle2FA
}) => {
  const [rucError, setRucError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

  const handleRucChange = (e) => {
    const newRuc = e.target.value;
    handleChange(e);
    setRucError(validateRUC(newRuc));
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    handleChange(e);
    setPhoneError(validatePhone(newPhone));
  };

  return user ? (
    <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
      <h2 className="text-3xl mb-6 text-center text-gray-900 font-semibold">Perfil de Usuario</h2>
      
      <form onSubmit={handleUpdateProfile} className="space-y-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Nombre Completo</label>
          <input
            type="text"
            name="name"
            value={formData.name || user.name}
            onChange={handleChange}
            className="shadow-sm border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={user.email}
            readOnly
            className="shadow-sm border-gray-300 rounded-lg w-full py-2 px-3 bg-gray-200 text-gray-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">RUC</label>
          <input
            type="text"
            name="ruc"
            value={formData.ruc || user.ruc || ''}
            onChange={handleRucChange}
            className="shadow-sm border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {rucError && <p className="text-red-500 text-sm mt-1">{rucError}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Teléfono</label>
          <input
            type="text"
            name="phone"
            value={formData.phone || user.phoneNumber || ''}
            onChange={handlePhoneChange}
            className="shadow-sm border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
        </div>

        <div className="mb-4">
          <strong className="text-sm text-gray-700">2FA Activado:</strong> 
          <span className="ml-2 text-gray-800">{user.is2FAEnabled ? 'Sí' : 'No'}</span>
          <button
            type="button"
            onClick={toggle2FA}
            className={`ml-4 py-1 px-3 rounded text-white font-medium ${
              user.is2FAEnabled ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'
            }`}
          >
            {user.is2FAEnabled ? 'Desactivar 2FA' : 'Activar 2FA'}
          </button>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-1/2"
          >
            Actualizar Perfil
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-1/2"
          >
            Cerrar Sesión
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
  ) : null;
};

export default ProfilePage;
