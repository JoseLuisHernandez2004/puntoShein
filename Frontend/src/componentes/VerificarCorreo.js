import React, { useState } from 'react';
import axios from 'axios';
import { MdEmail} from 'react-icons/md'; // Importing email icon from React Icons

const VerificarCorreo = ({ onVerified }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to verify email
      const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=4889f4221336402c8c061699723d0449&email=${email}`);
      
      if (response.data.is_valid_format.value && response.data.deliverability === 'DELIVERABLE') {
        setMessage('Correo verificado con éxito. Continúa con el registro.');
        onVerified(email);  // Pass the verified email to parent component
      } else {
        setMessage('El correo no es válido o no es entregable.');
      }
    } catch (error) {
      setMessage('Error al verificar el correo. Intenta nuevamente.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Registrar</h1>
        {message && <p className="text-center text-green-500 mb-4">{message}</p>}
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
