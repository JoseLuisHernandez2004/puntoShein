import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';  
import ReCAPTCHA from 'react-google-recaptcha';

const LoginForm = ({ setIsLoggedIn, setUserRole }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);  
  const [recaptchaToken, setRecaptchaToken] = useState(null); // Para almacenar el token de reCAPTCHA
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      Swal.fire({
        icon: 'error',
        title: 'Error de reCAPTCHA',
        text: 'Por favor, completa el reCAPTCHA.',
        timer: 1500,
      });
      return;
    }

    try {
      const response = await axios.post('https://puntoshein.onrender.com/api/login', { ...formData, recaptchaToken }, {
        withCredentials: true
      });
    
      Swal.fire({
        icon: 'success',
        title: '¡Inicio de sesión exitoso!',
        text: 'Redirigiendo...',
        timer: 1000,
        showConfirmButton: false,
      });
    
      localStorage.setItem('authToken', response.data.token);
      setIsLoggedIn(true);
      setUserRole(response.data.role); 

      if (response.data.role === 'admin') {
        navigate('/admin/dashboard'); 
      } else {
        navigate('/user/dashboard'); 
      }
    
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Cuenta bloqueada',
            text: error.response.data.message,
            timer: 5000,
          });
        } else if (error.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Intento fallido',
            text: error.response.data.message,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al intentar iniciar sesión. Por favor, intenta nuevamente.',
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error de conexión',
          text: 'No se pudo conectar al servidor. Inténtalo de nuevo más tarde.',
          timer: 1500,
        });
      }
    }
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token); // Almacenar el token de reCAPTCHA
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Correo Electrónico Field */}
          <div>
            <label className="block text-black-600 text-md font-semibold mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <div className="flex items-center border border-black-400 rounded-full px-3 py-2 shadow-lg transition-all hover:shadow-xl">
              <MdEmail className="text-black-400 mr-3" size={24} />
              <input
                className="w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full text-blue-600 px-2 py-1 transition-all duration-300 ease-in-out"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Ingresa tu correo"
                required
              />
            </div>
          </div>
          
          {/* Contraseña Field con visibilidad */}
          <div>
            <label className="block text-black-600 text-md font-semibold mb-2" htmlFor="password">
              Contraseña
            </label>
            <div className="flex items-center border border-black-400 rounded-full px-3 py-2 shadow-lg transition-all hover:shadow-xl">
              <MdLock className="text-black-400 mr-3" size={24} />
              <input
                className="w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full text-blue-600 px-2 py-1 transition-all duration-300 ease-in-out"
                id="password"
                type={showPassword ? 'text' : 'password'}  
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Ingresa tu contraseña"
                required
              />
              <button type="button" onClick={handleTogglePasswordVisibility} className="ml-2">
                {showPassword ? <MdVisibilityOff size={24} /> : <MdVisibility size={24} />}  
              </button>
            </div>
          </div>

          {/* reCAPTCHA */}
          <div className="mt-4">
            <ReCAPTCHA
              sitekey="6LeQ6GoqAAAAAME55CApzdiO7MWxWKlJXBAl4J2N"
              onChange={handleRecaptchaChange}
            />
          </div>

          {/* Botón de enviar */}
          <div className="mt-6">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
              type="submit"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        {/* Enlace para recuperación de contraseña */}
        <div className="text-center mt-4">
          <Link to="/recover-password" className="text-blue-500 hover:text-blue-700 text-sm">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
