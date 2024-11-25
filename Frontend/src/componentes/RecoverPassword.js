import React, { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdEmail, MdTextsms } from 'react-icons/md'; // Importar íconos
import { useNavigate } from 'react-router-dom';
import { MIS_URL } from "./MiVariable";
import { ThemeContext } from './Style/Tema'; 


const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState(''); // Agregar estado para teléfono
  const [recoveryMethod, setRecoveryMethod] = useState('email'); // Estado para el método de recuperación
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { darkMode } = useContext(ThemeContext); // Obtener el estado de darkMode


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Realizar la solicitud de recuperación al backend
      await axios.post(`${MIS_URL}/api/forgot-password`, {
        email,
        telefono,
        method: recoveryMethod,
      });
      
      // Mostrar mensaje de éxito
      await Swal.fire({
        icon: 'success',
        title: 'Solicitud enviada',
        text: recoveryMethod === 'email'
          ? 'Revisa tu correo para restablecer tu contraseña.'
          : 'Revisa tu SMS para restablecer tu contraseña.',
        confirmButtonText: 'Aceptar',
      });

      navigate('/login');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'No se pudo enviar la solicitud. Inténtalo de nuevo más tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} px-4`}>
      <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg shadow-lg p-6`}>
        <h1 className="text-2xl font-bold text-center mb-4">Recuperar Contraseña</h1>
        
        {/* Selector de Método de Recuperación */}
        <div className="mb-4">
          <label className="block text-md font-semibold mb-2">Método de Recuperación:</label>
          <select
            value={recoveryMethod}
            onChange={(e) => setRecoveryMethod(e.target.value)}
            className="w-full border rounded-full px-3 py-2 shadow-lg"
          >
            <option value="email">Correo Electrónico</option>
            <option value="sms">SMS</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de Entrada de Correo o Teléfono */}
          {recoveryMethod === 'email' ? (
            <div>
              <label className="block text-md font-semibold mb-2" htmlFor="email">Correo Electrónico</label>
              <div className="flex items-center border rounded-full px-3 py-2 shadow-lg">
                <MdEmail className="mr-3" size={24} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu correo"
                  required={recoveryMethod === 'email'}
                  className="w-full focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-md font-semibold mb-2" htmlFor="telefono">Teléfono</label>
              <div className="flex items-center border rounded-full px-3 py-2 shadow-lg">
                <MdTextsms className="mr-3" size={24} />
                <input
                  type="tel"
                  id="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Ingresa tu teléfono"
                  required={recoveryMethod === 'sms'}
                  className="w-full focus:outline-none"
                />
              </div>
            </div>
          )}
          
          <button
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
