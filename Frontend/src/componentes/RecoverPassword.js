import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const RecoverPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/forgot-password', { email });
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
    <div className="container mx-auto px-4 py-10 mt-10 min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-center mb-6">Recuperar Contraseña</h1>
        <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Correo Electrónico</label>
            <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border rounded-lg"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
            Enviar
        </button>
        </form>
    </div>
  

  );
};

export default RecoverPassword;
