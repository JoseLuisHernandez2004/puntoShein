import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MIS_URL } from "../../MiVariable";
import { ThemeContext } from '../../Style/Tema';

const UsuariosBloqueados = () => {
  const { darkMode } = useContext(ThemeContext);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        // Incluir withCredentials para el manejo de cookies
        const response = await axios.get(`${MIS_URL}/api/users/blocked`, { withCredentials: true });
        setBlockedUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los usuarios bloqueados:', error);
        Swal.fire('Error', 'No se pudo obtener la lista de usuarios bloqueados.', 'error');
        setLoading(false);
      }
    };

    fetchBlockedUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg font-medium">Cargando usuarios bloqueados...</p>
      </div>
    );
  }

  return (
    <div className={`p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} rounded-lg shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-300'} w-full max-w-4xl mx-auto mt-10`}>
      <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-blue-400' : 'text-blue-700'} text-center`}>Usuarios Bloqueados</h2>
      {blockedUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr className="w-full bg-gray-100 dark:bg-gray-700">
                <th className="text-left p-4 font-semibold">Nombre</th>
                <th className="text-left p-4 font-semibold">Email</th>
                <th className="text-left p-4 font-semibold">Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {blockedUsers.map((user) => (
                <tr key={user._id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4">{user.nombre} {user.apellidoP} {user.apellidoM}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-xl font-medium">No hay usuarios bloqueados en este momento.</p>
        </div>
      )}
    </div>
  );
};

export default UsuariosBloqueados;
