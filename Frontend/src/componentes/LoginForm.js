import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { MdEmail, MdLock } from 'react-icons/md'; // Importar íconos

const LoginForm = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Show loading state before request is made
      Swal.fire({
        icon: 'info',
        title: 'Iniciando sesión...',
        timer: 1000,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading(); // Show loading while waiting for server response
        },
      });
  
      const response = await axios.post('https://puntoshein.onrender.com/api/login', formData, {
        withCredentials: true
      });
  
      // Show success notification without long delay
      Swal.fire({
        icon: 'success',
        title: '¡Inicio de sesión exitoso!',
        text: 'Redirigiendo...',
        timer: 1000, // Reduce the timer to speed up transition
        showConfirmButton: false,
      });
  
      localStorage.setItem('authToken', response.data.token);
      setIsLoggedIn(true);
  
      setTimeout(() => {
        navigate('/profile');
      }, 1000); // Reduce wait time for navigation
    } catch (error) {
      // Show error immediately without delay
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Correo o contraseña incorrectos',
        timer: 1500, // Shorten error display duration
      });
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="mb-4" autoComplete="off">
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <div className="flex items-center border rounded px-2 py-2 shadow appearance-none">
              <MdEmail className="text-gray-500 mr-2" size={20} />
              <input
                className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <div className="flex items-center border rounded px-2 py-2 shadow appearance-none">
              <MdLock className="text-gray-500 mr-2" size={20} />
              <input
                className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        {/* Link to password recovery */}
        <div className="text-center">
          <Link to="/recover-password" className="text-blue-500 hover:text-blue-700 text-sm">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;