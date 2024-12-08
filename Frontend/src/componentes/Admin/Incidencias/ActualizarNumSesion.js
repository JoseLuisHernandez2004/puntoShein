import React, { useState, useEffect, useContext, setError } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MIS_URL } from '../../MiVariable';
import { ThemeContext } from '../../Style/Tema';

const ActualizarSesion = () => {
  const { darkMode } = useContext(ThemeContext);
  const [maxIntentos, setMaxIntentos] = useState('');
  const [loading, setLoading] = useState(true);

  // Obtener la configuración actual de sesión
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get(`${MIS_URL}/api/conf_Sesion/getDatosSesion`, { withCredentials: true });
        if (response.status === 200) {
          setMaxIntentos(response.data.maxIntentos);
        } else {
          Swal.fire('Error', 'No se pudo obtener la configuración de sesión.', 'error');
        }
      } catch (error) {
        console.error('Error al obtener la configuración de sesión:', error);
        Swal.fire('Error', 'No se pudo obtener la configuración de sesión.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  // Validar solo números
  const handleNumberInput = (setter) => (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setter(value);
    } else {
      setError('Solo se permiten números.');
    }
  };

  // Actualizar la configuración de sesión
  const handleUpdate = async () => {

    if (maxIntentos < 1 || maxIntentos > 5) {
      return Swal.fire({
        title: 'Límite de Intentos Inválido',
        text: 'El número máximo de intentos debe ser entre 1 y 5. Esto es necesario para proteger las cuentas de los usuarios y prevenir intentos no autorizados.',
        icon: 'warning',
        confirmButtonText: 'Entendido',
      });
    }
    
    try {
      const response = await axios.put(
        `${MIS_URL}/api/conf_Sesion/actualizarSesion`,
        { maxIntentos },
        { withCredentials: true }
      );

      if (response.status === 200) {
        Swal.fire('Éxito', response.data.message, 'success');
      } else {
        Swal.fire('Error', 'No se pudo actualizar la configuración.', 'error');
      }
    } catch (error) {
      console.error('Error al actualizar la configuración:', error);
      Swal.fire('Error', 'No se pudo actualizar la configuración.', 'error');
    }
  };

  if (loading) {
    return <p className="text-center mt-4">Cargando configuración de sesión...</p>;
  }

  return (
    <div className={`p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} rounded-lg shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-300'} w-full max-w-md mx-auto mt-10`}>
      <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-700'} text-center`}>Configurar Sesión</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="maxIntentos" className="block mb-2 font-medium">Máximo de Intentos</label>
          <input
            type="text" // Cambia a text para aplicar validación personalizada
            id="maxIntentos"
            value={maxIntentos}
            onChange={handleNumberInput(setMaxIntentos)}
            className={`w-full p-2 border rounded-lg ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
          />
        </div>
        <button
          type="button"
          onClick={handleUpdate}
          className={`w-full py-2 text-white rounded-lg font-semibold ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          Guardar Configuración
        </button>
      </form>
    </div>
  );
};

export default ActualizarSesion;
