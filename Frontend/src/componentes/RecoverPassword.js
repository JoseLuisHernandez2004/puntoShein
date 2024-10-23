import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdEmail } from 'react-icons/md'; // Importar ícono de email

const RecoverPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://puntoshein.onrender.com/api/forgot-password', { email });

      Swal.fire({
        icon: 'success',
        title: 'Correo enviado',
        text: 'Revisa tu bandeja de entrada para restablecer tu contraseña.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo enviar la solicitud. Inténtalo de nuevo más tarde.',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Recuperar Contraseña</h1>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
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
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
