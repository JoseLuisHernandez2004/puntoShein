import React, { useState } from 'react';
import axios from 'axios';
import { MdEmail } from 'react-icons/md'; // Importing email icon from React Icons
import Swal from 'sweetalert2';

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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Registrar</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <div className="flex items-center border rounded px-2 py-2">
              <MdEmail className="text-gray-500 mr-2" size={20} /> {/* React Icon for Email */}
              <input
                className="flex-grow focus:outline-none"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Ingresa tu correo"
              />
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
