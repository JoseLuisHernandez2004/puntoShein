import React, { useState, useContext } from 'react';
import axios from 'axios';
import { MdEmail } from 'react-icons/md'; // Importing email icon from React Icons
import Swal from 'sweetalert2';
import { ThemeContext } from './Style/Tema'; 

const VerificarCorreo = ({ onVerified }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to verify email
      const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=b53dde68481e44e2a9205d182164acda&email=${email}`);
      
      if (response.data.is_valid_format.value && response.data.deliverability === 'DELIVERABLE') {
        // Display success message with SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Correo verificado',
          text: 'Correo verificado con éxito. Continúa con el registro.',
        });
        onVerified(email);  // Pass the verified email to the parent component
      } else {
        // Display error message with SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Correo inválido',
          text: 'El correo no es válido o no es entregable.',
        });
      }
    } catch (error) {
      // Display error message with SweetAlert2 for failed verification
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al verificar el correo. Intenta nuevamente.',
      });
    }
  };
  const { darkMode } = useContext(ThemeContext); // Obtener el estado de darkMode


  return (
    <div className={`flex flex-col items-center justify-center h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg shadow-lg p-6`}>
        <h1 className="text-2xl font-bold mb-4 text-center">Registrar</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Correo Electrónico Field */}
          <div>
            <label className={`block text-md font-semibold mb-2 ${darkMode ? 'text-white' : 'text-black'}`} htmlFor="email">
              Correo Electrónico
            </label>
            <div className={`flex items-center border rounded-full px-3 py-2 shadow-lg transition-all hover:shadow-xl ${darkMode ? 'border-gray-600' : 'border-black-400'}`}>
              <MdEmail className={`mr-3 ${darkMode ? 'text-white' : 'text-black-400'}`} size={24} /> {/* React Icon for Email */}
              <input
                className={`w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} px-2 py-1 transition-all duration-300 ease-in-out`}
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Ingresa tu correo"
              />
            </div>
          </div>

  
          {/* Submit Button */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out"
            type="submit"
          >
            Verificar correo
          </button>
        </form>
      </div>
    </div>

  
  );
};

export default VerificarCorreo;