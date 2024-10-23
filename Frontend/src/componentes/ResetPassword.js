import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md'; // Agregado iconos de visibilidad

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const [showNewPassword, setShowNewPassword] = useState(false); // Estado para la visibilidad de la nueva contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para la visibilidad de confirmar contraseña

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword); // Alterna la visibilidad de la nueva contraseña
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword); // Alterna la visibilidad de confirmar contraseña
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post(`https://puntoshein.onrender.com/api/reset-password/${token}`, { newPassword });

      if (response.data.message === 'Contraseña actualizada con éxito') {
        Swal.fire({
          icon: 'success',
          title: '¡Contraseña actualizada con éxito!',
          text: 'Serás redirigido a la página de inicio de sesión.',
          timer: 3000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate('/login'); // Redirigir a la página de inicio de sesión
        }, 3000);
      }
    } catch (err) {
      // Captura el error cuando el token ha expirado
      if (err.response && err.response.data.message === "jwt expired") {
        Swal.fire({
          icon: 'error',
          title: 'Enlace ha caducado',
          text: 'El enlace para restablecer la contraseña ha caducado. Solicita uno nuevo.',
        });
      } else {
        setError('Hubo un error al restablecer la contraseña');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Restablecer Contraseña</h1>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Campo Nueva Contraseña */}
          <div>
            <label className="block text-black-600 text-md font-semibold mb-2" htmlFor="newPassword">
              Nueva Contraseña
            </label>
            <div className="flex items-center border border-black-400 rounded-full px-3 py-2 shadow-lg transition-all hover:shadow-xl">
              <MdLock className="text-black-400 mr-3" size={24} />
              <input
                className="w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full text-blue-600 px-2 py-1 transition-all duration-300 ease-in-out"
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'} // Cambia el tipo de input según la visibilidad
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Ingresa la nueva contraseña"
                required
              />
              <button type="button" onClick={handleToggleNewPasswordVisibility} className="ml-2">
                {showNewPassword ? <MdVisibilityOff size={24} /> : <MdVisibility size={24} />} {/* Botón de visibilidad */}
              </button>
            </div>
          </div>
          
          {/* Campo Confirmar Contraseña */}
          <div>
            <label className="block text-black-600 text-md font-semibold mb-2" htmlFor="confirmPassword">
              Confirmar Contraseña
            </label>
            <div className="flex items-center border border-black-400 rounded-full px-3 py-2 shadow-lg transition-all hover:shadow-xl">
              <MdLock className="text-black-400 mr-3" size={24} />
              <input
                className="w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full text-blue-600 px-2 py-1 transition-all duration-300 ease-in-out"
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'} // Cambia el tipo de input según la visibilidad
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirma tu contraseña"
                required
              />
              <button type="button" onClick={handleToggleConfirmPasswordVisibility} className="ml-2">
                {showConfirmPassword ? <MdVisibilityOff size={24} /> : <MdVisibility size={24} />} {/* Botón de visibilidad */}
              </button>
            </div>
          </div>

          {/* Botón de Restablecer Contraseña */}
          <div className="mt-6">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
              type="submit"
            >
              Restablecer Contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
