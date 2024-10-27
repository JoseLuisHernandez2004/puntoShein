// RecoverPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdEmail } from 'react-icons/md'; // Importar ícono de email
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { MIS_URL } from "./MiVariable";


const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Inicializar navigate
  const [loading, setLoading] = useState(false); // Estado de carga

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Iniciar estado de carga
    try {
      // Realizar la solicitud POST para recuperar la contraseña
      await axios.post(`${MIS_URL}/api/forgot-password`,{ email });
      
      // Mostrar mensaje de éxito
      await Swal.fire({
        icon: 'success',
        title: 'Correo enviado',
        text: 'Revisa tu bandeja de entrada para restablecer tu contraseña.',
        confirmButtonText: 'Aceptar',
      });

      // Redirigir al usuario al inicio de sesión
      navigate('/login');
    } catch (error) {
      console.error('Error al enviar el correo de recuperación:', error);
      // Manejar errores de manera más detallada si están disponibles
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'No se pudo enviar la solicitud. Inténtalo de nuevo más tarde.',
      });
    } finally {
      setLoading(false); // Finalizar estado de carga
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Recuperar Contraseña</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Campo de Correo Electrónico con diseño actualizado */}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
                required
              />
            </div>
          </div>

          {/* Botón de Enviar */}
          <div className="mt-6">
            <button
              className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              type="submit"
              disabled={loading} // Deshabilitar botón durante la carga
            >
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
