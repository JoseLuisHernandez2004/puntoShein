import React, { useState } from 'react';
import axios from 'axios';


const VerificarCorreo = ({ onVerified }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llama a la API para verificar el correo
      const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=4889f4221336402c8c061699723d0449&email=${email}`);
      
      if (response.data.is_valid_format.value && response.data.deliverability === 'DELIVERABLE') {
        setMessage('Correo verificado con éxito. Continúa con el registro.');
        onVerified(email);  // Llama al callback para pasar el correo verificado
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
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
