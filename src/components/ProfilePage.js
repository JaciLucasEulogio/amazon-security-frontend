import React from 'react';

const ProfilePage = ({ 
  user, 
  formData, 
  handleChange, 
  handleUpdateProfile, 
  handleLogout, 
  toggle2FA 
}) => {
  return user ? (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl mb-4 text-center">Perfil de Usuario</h2>
      <form onSubmit={handleUpdateProfile}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name || user.name} 
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Correo</label>
          <input 
            type="email" 
            name="email" 
            value={user.email} 
            readOnly
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">RUC</label>
          <input 
            type="text" 
            name="ruc" 
            value={formData.ruc || user.ruc || ''} 
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
          <input 
            type="text" 
            name="phone" 
            value={formData.phone || user.phoneNumber || ''} 
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <strong>2FA Activado:</strong> {user.is2FAEnabled ? 'Sí' : 'No'}
          <button 
            type="button"
            onClick={toggle2FA}
            className={`ml-4 py-1 px-3 rounded ${
              user.is2FAEnabled 
              ? 'bg-red-500 hover:bg-red-700 text-white' 
              : 'bg-green-500 hover:bg-green-700 text-white'
            }`}
          >
            {user.is2FAEnabled ? 'Desactivar 2FA' : 'Activar 2FA'}
          </button>
        </div>
        <div className="flex justify-between">
          <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Actualizar Perfil
          </button>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cerrar Sesión
          </button>
        </div>
      </form>
    </div>
  ) : null;
};

export default ProfilePage;