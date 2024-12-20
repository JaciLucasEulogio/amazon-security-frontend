import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import individual page components
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import VerifyEmailPage from './components/VerifyEmailPage';
import Verify2FAPage from './components/Verify2FAPage';
import ProfilePage from './components/ProfilePage';

// Import react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [user, setUser] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Show message using toastify
  const showMessage = (msg, type = 'info') => {
    if (type === 'error') {
      toast.error(msg);
    } else if (type === 'success') {
      toast.success(msg);
    } else {
      toast(msg);
    }
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
      showMessage(response.data.msg, 'success');
      setView('verifyEmail');
    } catch (error) {
      showMessage(error.response?.data?.msg || 'Error en el registro', 'error');
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
      showMessage(response.data.msg, 'success');
      setView('login');
    } catch (error) {
      showMessage(error.response?.data?.msg || 'Error en verificación', 'error');
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
      showMessage(error.response?.data?.msg || 'Error en inicio de sesión', 'error');
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
      showMessage(error.response?.data?.msg || 'Error en verificación 2FA', 'error');
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
      showMessage('Error al obtener perfil', 'error');
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

      showMessage(response.data.msg, 'success');
      fetchProfile(); // Refresh profile to get updated 2FA status
    } catch (error) {
      showMessage(error.response?.data?.msg || 'Error al cambiar 2FA', 'error');
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

      showMessage(response.data.msg, 'success');
      fetchProfile(); // Refresh profile after update
    } catch (error) {
      showMessage(error.response?.data?.msg || 'Error al actualizar perfil', 'error');
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
  const renderView = () => {
    const commonProps = {
      formData,
      handleChange,
      showMessage,
      setView
    };

    switch(view) {
      case 'landing':
        return (
          <LandingPage 
            onLoginClick={() => setView('login')}
            onRegisterClick={() => setView('register')}
          />
        );
      case 'register':
        return (
          <RegisterPage 
            {...commonProps} 
            onLoginClick={() => setView('login')} 
            handleRegister={handleRegister}
          />
        );
      case 'login':
        return (
          <LoginPage 
            {...commonProps} 
            onRegisterClick={() => setView('register')}
            handleLogin={handleLogin}
          />
        );
      case 'verifyEmail':
        return <VerifyEmailPage {...commonProps} handleVerifyEmail={handleVerifyEmail} />;
      case 'verify2FA':
        return <Verify2FAPage {...commonProps} handleVerify2FA={handleVerify2FA} />;
      case 'profile':
        return (
          <ProfilePage 
            user={user}
            formData={formData}
            handleChange={handleChange}
            handleUpdateProfile={handleUpdateProfile}
            handleLogout={handleLogout}
            toggle2FA={toggle2FA}
          />
        );
      default:
        return <LandingPage {...commonProps} />;
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
        {renderView()}
        {/* Toast container for showing the notifications */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;
