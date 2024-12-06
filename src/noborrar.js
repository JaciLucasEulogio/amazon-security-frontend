import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Base URL for the backend
const BASE_URL = 'https://backend-clone-amazon-security.onrender.com/api/auth';

// Main App Component
const App = () => {
  const [view, setView] = useState('landing');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    code: '',
    ruc: '',
    phone: ''
  });
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Set message and clear it after 5 seconds
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, 3000); // Message will be cleared after 5 seconds
  };

  // Register User
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      showMessage(response.data.msg);
      setView('verifyEmail');
    } catch (error) {
      showMessage(error.response?.data?.msg || 'Error en el registro');
    }
  };

  // Verify Email
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/verify-email`, {
        email: formData.email,
        code: formData.code
      });
      showMessage(response.data.msg);
      setView('login');
    } catch (error) {
      showMessage(error.response?.data?.msg || 'Error en verificación');
    }
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email: formData.email,
        password: formData.password
      });
      
      // Check if 2FA is required
      if (response.data.msg === 'Verificación de doble factor enviada') {
        setView('verify2FA');
        return;
      }

      // Regular login (no 2FA)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userEmail', formData.email);
      setView('profile');
      fetchProfile();
    } catch (error) {
      showMessage(error.response?.data?.msg || 'Error en inicio de sesión');
    }
  };

  // Verify 2FA
  const handleVerify2FA = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/verify-2fa`, {
        email: formData.email,
        code: formData.code
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userEmail', formData.email);
      setView('profile');
      fetchProfile();
    } catch (error) {
      showMessage(error.response?.data?.msg || 'Error en verificación 2FA');
    }
  };

  // Fetch Profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('userEmail');

      // Fetch profile using email
      const response = await axios.post(
        `${BASE_URL}/profile`,
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(response.data);
      // Pre-fill form data with current user info
      setFormData(prevData => ({
        ...prevData,
        name: response.data.name || '',
        ruc: response.data.ruc || '',
        phone: response.data.phone || ''
      }));
    } catch (error) {
      showMessage('Error al obtener perfil');
      setView('login');
    }
  };

  // Toggle 2FA (with separate endpoints for enable/disable)
  const toggle2FA = async () => {
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('userEmail');

      const endpoint = user.is2FAEnabled 
        ? `${BASE_URL}/disable-2fa` 
        : `${BASE_URL}/enable-2fa`;

      const response = await axios.post(
        endpoint,
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      showMessage(response.data.msg);
      fetchProfile(); // Refresh profile to get updated 2FA status
    } catch (error) {
      showMessage(error.response?.data?.msg || 'Error al cambiar 2FA');
    }
  };

  // Update Profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(
        `${BASE_URL}/update`,
        {
          name: formData.name,
          email: user.email,
          phoneNumber: formData.phone,
          ruc: formData.ruc
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      showMessage(response.data.msg);
      fetchProfile(); // Refresh profile after update
    } catch (error) {
      showMessage(error.response?.data?.msg || 'Error al actualizar perfil');
    }
  };

  // Logout
  const handleLogout = () => {
    // Eliminar los datos del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    
    // Restablecer el estado del usuario y los datos del formulario
    setUser(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      code: '',
      ruc: '',
      phone: ''
    });
  
    // Redirigir a la vista de login
    setView('login');
  };

  // Render form based on current view
  const renderForm = () => {
    switch(view) {
      case 'landing':
        return (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center">
            <h1 className="text-3xl font-bold mb-6">Bienvenido</h1>
            <p className="mb-6 text-gray-600">Selecciona una opción para continuar</p>
            <div className="space-y-4">
              <button 
                onClick={() => setView('login')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Iniciar Sesión
              </button>
              <button 
                onClick={() => setView('register')}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Registrarse
              </button>
            </div>
          </div>
        );
      case 'register':
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
                onClick={() => setView('login')} 
                className="text-blue-500 cursor-pointer ml-1"
              >
                Iniciar Sesión
              </span>
            </p>
          </form>
        );
      case 'verifyEmail':
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
      case 'verify2FA':
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
      case 'profile':
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
      default: // login
        return (
          <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl mb-4 text-center">Iniciar Sesión</h2>
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
              Iniciar Sesión
            </button>
            <p className="text-center mt-3">
              ¿No tienes cuenta? 
              <span 
                onClick={() => setView('register')} 
                className="text-blue-500 cursor-pointer ml-1"
              >
                Registrarse
              </span>
            </p>
          </form>
        );
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    
    if (token && userEmail) {
      fetchProfile();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md">
        {message && (
          <div className={`
            ${message.includes('Error') 
              ? 'bg-red-100 border-red-400 text-red-700' 
              : 'bg-green-100 border-green-400 text-green-700'
            } 
            px-4 py-3 rounded relative mb-4
          `}>
            {message}
          </div>
        )}
        {renderForm()}
      </div>
    </div>
  );
};

export default App;










import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import individual page components
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import VerifyEmailPage from './components/VerifyEmailPage';
import Verify2FAPage from './components/Verify2FAPage';
import ProfilePage from './components/ProfilePage';

// Base URL for the backend
const BASE_URL = 'https://backend-clone-amazon-security.onrender.com/api/auth';

// Authentication Context Provider
export const AuthContext = React.createContext(null);

// Authentication Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    code: '',
    ruc: '',
    phone: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Set message and clear it after 3 seconds
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  // Register User
  const handleRegister = async (navigate) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      showMessage(response.data.msg);
      navigate('/verify-email');
      return true;
    } catch (error) {
      showMessage(error.response?.data?.msg || 'Error en el registro');
      return false;
    }
  };

  // Verify Email
  const handleVerifyEmail = async (navigate) => {
    try {
      const response = await axios.post(`${BASE_URL}/verify-email`, {
        email: formData.email,
        code: formData.code
      });
      showMessage(response.data.msg);
      navigate('/login');
      return true;
    } catch (error) {
      showMessage(error.response?.data?.msg || 'Error en verificación');
      return false;
    }
  };

  // Login
  const handleLogin = async (navigate) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email: formData.email,
        password: formData.password
      });
      
      // Check if 2FA is required
      if (response.data.msg === 'Verificación de doble factor enviada') {
        navigate('/verify-2fa');
        return;
      }

      // Regular login (no 2FA)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userEmail', formData.email);
      
      await fetchProfile();
      navigate('/profile');
    } catch (error) {
      showMessage(error.response?.data?.msg || 'Error en inicio de sesión');
    }
  };

  // Verify 2FA
  const handleVerify2FA = async (navigate) => {
    try {
      const response = await axios.post(`${BASE_URL}/verify-2fa`, {
        email: formData.email,
        code: formData.code
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userEmail', formData.email);
      
      await fetchProfile();
      navigate('/profile');
    } catch (error) {
      showMessage(error.response?.data?.msg || 'Error en verificación 2FA');
    }
  };

  // Fetch Profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('userEmail');

      // Fetch profile using email
      const response = await axios.post(
        `${BASE_URL}/profile`,
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(response.data);
      // Pre-fill form data with current user info
      setFormData(prevData => ({
        ...prevData,
        name: response.data.name || '',
        ruc: response.data.ruc || '',
        phone: response.data.phone || ''
      }));

      return true;
    } catch (error) {
      showMessage('Error al obtener perfil');
      return false;
    }
  };

  // Toggle 2FA (with separate endpoints for enable/disable)
  const toggle2FA = async () => {
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('userEmail');

      const endpoint = user.is2FAEnabled 
        ? `${BASE_URL}/disable-2fa` 
        : `${BASE_URL}/enable-2fa`;

      const response = await axios.post(
        endpoint,
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      showMessage(response.data.msg);
      await fetchProfile(); // Refresh profile to get updated 2FA status
    } catch (error) {
      showMessage(error.response?.data?.msg || 'Error al cambiar 2FA');
    }
  };

  // Update Profile
  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(
        `${BASE_URL}/update`,
        {
          name: formData.name,
          email: user.email,
          phoneNumber: formData.phone,
          ruc: formData.ruc
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      showMessage(response.data.msg);
      await fetchProfile(); // Refresh profile after update
      return true;
    } catch (error) {
      showMessage(error.response?.data?.msg || 'Error al actualizar perfil');
      return false;
    }
  };

  // Logout
  const handleLogout = (navigate) => {
    // Eliminar los datos del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    
    // Restablecer el estado del usuario y los datos del formulario
    setUser(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      code: '',
      ruc: '',
      phone: ''
    });
  
    // Redirigir a la vista de login
    navigate('/login');
  };

  // Check authentication on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    
    if (token && userEmail) {
      fetchProfile();
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      message,
      showMessage,
      formData,
      setFormData,
      handleChange,
      handleRegister,
      handleVerifyEmail,
      handleLogin,
      handleVerify2FA,
      handleUpdateProfile,
      handleLogout,
      toggle2FA
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

// Wrapped pages to include navigation
const WrappedLandingPage = () => {
  const navigate = useNavigate();
  return <LandingPage 
    onLoginClick={() => navigate('/login')}
    onRegisterClick={() => navigate('/register')}
  />;
};

const WrappedLoginPage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const wrappedHandleLogin = (e) => {
    e.preventDefault();
    authContext.handleLogin(navigate);
  };

  return <LoginPage 
    onRegisterClick={() => navigate('/register')}
    handleLogin={wrappedHandleLogin}
    formData={authContext.formData}
    handleChange={authContext.handleChange}
  />;
};

const WrappedRegisterPage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const wrappedHandleRegister = (e) => {
    e.preventDefault();
    authContext.handleRegister(navigate);
  };

  return <RegisterPage 
    onLoginClick={() => navigate('/login')}
    handleRegister={wrappedHandleRegister}
    formData={authContext.formData}
    handleChange={authContext.handleChange}
  />;
};

const WrappedVerifyEmailPage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const wrappedHandleVerifyEmail = (e) => {
    e.preventDefault();
    authContext.handleVerifyEmail(navigate);
  };

  return <VerifyEmailPage 
    handleVerifyEmail={wrappedHandleVerifyEmail}
    formData={authContext.formData}
    handleChange={authContext.handleChange}
  />;
};

const WrappedVerify2FAPage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const wrappedHandleVerify2FA = (e) => {
    e.preventDefault();
    authContext.handleVerify2FA(navigate);
  };

  return <Verify2FAPage 
    handleVerify2FA={wrappedHandleVerify2FA}
    formData={authContext.formData}
    handleChange={authContext.handleChange}
  />;
};

const WrappedProfilePage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const wrappedHandleLogout = () => {
    authContext.handleLogout(navigate);
  };

  return <ProfilePage 
    user={authContext.user}
    formData={authContext.formData}
    handleChange={authContext.handleChange}
    handleUpdateProfile={authContext.handleUpdateProfile}
    handleLogout={wrappedHandleLogout}
    toggle2FA={authContext.toggle2FA}
  />;
};

// App Component with Routing
const App = () => {
  const { message } = React.useContext(AuthContext);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-md">
          {message && (
            <div className={`
              ${message.includes('Error') 
                ? 'bg-red-100 border-red-400 text-red-700' 
                : 'bg-green-100 border-green-400 text-green-700'
              } 
              px-4 py-3 rounded relative mb-4
            `}>
              {message}
            </div>
          )}
          <Routes>
            <Route path="/" element={<WrappedLandingPage />} />
            <Route path="/register" element={<WrappedRegisterPage />} />
            <Route path="/login" element={<WrappedLoginPage />} />
            <Route path="/verify-email" element={<WrappedVerifyEmailPage />} />
            <Route path="/verify-2fa" element={<WrappedVerify2FAPage />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <WrappedProfilePage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

// Wrap App with AuthProvider
const AppWithAuth = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithAuth;
export default LoginPage;
