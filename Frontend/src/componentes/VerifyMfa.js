import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MIS_URL } from "./MiVariable";

const VerifyMfa = ({ setIsLoggedIn, setUserRole }) => {
  const [mfaCode, setMfaCode] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('mfaEmail'); // Obtener el email almacenado

  const handleChange = (e) => {
    setMfaCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si se proporcionó el código MFA
    if (!mfaCode) {
      Swal.fire({
        icon: 'warning',
        title: 'Código MFA requerido',
        text: 'Por favor, ingresa el código MFA recibido en tu correo.',
        timer: 3000,
      });
      return;
    }

    try {
      // Enviar la solicitud de verificación al backend
      const response = await axios.post(`${MIS_URL}/api/verify-mfa`, { email, mfaCode }, {
        withCredentials: true,
      });

      // Mostrar mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Verificación Exitosa!',
        text: 'Redirigiendo...',
        timer: 1100,
        showConfirmButton: false,
      });

      // Limpiar el email almacenado y guardar el token de sesión
      localStorage.removeItem('mfaEmail');
      localStorage.setItem('authToken', response.data.token);

      // Actualizar el estado para indicar que el usuario ha iniciado sesión
      setIsLoggedIn(true);
      setUserRole(response.data.role);

      // Redirigir según el rol del usuario
      if (response.data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (error) {
      console.error("Error de verificación MFA:", error.response?.data);
      Swal.fire({
        icon: 'error',
        title: 'Error de Verificación',
        text: error.response?.data?.message || 'Código MFA inválido. Por favor, inténtalo de nuevo.',
        timer: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Verificar Código MFA</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-black-600 text-md font-semibold mb-2" htmlFor="mfaCode">
              Código MFA
            </label>
            <input
              className="w-full border border-black-400 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
              id="mfaCode"
              type="text"
              name="mfaCode"
              value={mfaCode}
              onChange={handleChange}
              placeholder="Ingresa el código recibido"
              required
            />
          </div>

          <div className="mt-6">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
              type="submit"
            >
              Verificar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyMfa;
