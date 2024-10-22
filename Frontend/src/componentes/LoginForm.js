import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import { MdEmail, MdLock } from 'react-icons/md'; 

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
      const response = await axios.post('https://puntoshein.onrender.com/api/login', formData, {
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
  
      setTimeout(() => {
        navigate('/profile');
      }, 1000);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Correo o contraseña incorrectos',
        timer: 1500,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Correo Electrónico Field con diseño actualizado */}
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
          
          {/* Contraseña Field con diseño actualizado */}
          <div>
            <label className="block text-black-600 text-md font-semibold mb-2" htmlFor="password">
              Contraseña
            </label>
            <div className="flex items-center border border-black-400 rounded-full px-3 py-2 shadow-lg transition-all hover:shadow-xl">
              <MdLock className="text-black-400 mr-3" size={24} />
              <input
                className="w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full text-blue-600 px-2 py-1 transition-all duration-300 ease-in-out"
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
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
