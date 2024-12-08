import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MIS_URL } from '../../MiVariable';
import { ThemeContext } from '../../Style/Tema';

const UsuariosBloqueados = () => {
  const { darkMode } = useContext(ThemeContext);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        const response = await axios.get(`${MIS_URL}/api/users/blocked`, { withCredentials: true });

        if (response.status === 200 && Array.isArray(response.data)) {
          setBlockedUsers(response.data);
        } else {
          setBlockedUsers([]);
          Swal.fire('Información', 'No hay usuarios bloqueados.', 'info');
        }
      } catch (error) {
        console.error('Error al obtener los usuarios bloqueados:', error);
        Swal.fire('Error', 'No se pudo obtener la lista de usuarios bloqueados.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchBlockedUsers();
  }, []);

  const handleUnblock = async (userId) => {
    try {
      const response = await axios.put(
        `${MIS_URL}/api/users/${userId}/unblock`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        setBlockedUsers(blockedUsers.filter(user => user._id !== userId));
        Swal.fire('Desbloqueado', 'El usuario ha sido desbloqueado correctamente.', 'success');
      } else {
        Swal.fire('Error', 'No se pudo desbloquear el usuario.', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'No se pudo desbloquear el usuario.', 'error');
    }
  };

  const handleDelete = async (userId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${MIS_URL}/api/users/${userId}`, {
            withCredentials: true,
          });

          if (response.status === 200) {
            setBlockedUsers(blockedUsers.filter(user => user._id !== userId));
            Swal.fire('Eliminado', 'El usuario ha sido eliminado correctamente.', 'success');
          } else {
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
          }
        } catch (error) {
          console.error('Error al eliminar el usuario:', error);
          Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
        }
      }
    });
  };

  const handleViewDetails = async (userId) => {
    try {
      // Realizar la solicitud al backend para obtener las incidencias del usuario
      const response = await axios.get(`${MIS_URL}/api/incidencias/${userId}`, { withCredentials: true });
  
      if (response.status === 200 && Array.isArray(response.data)) {
        // Crear una lista HTML para mostrar las incidencias
        const incidencesList = response.data.map(
          (incident, index) =>
            `<li>
              <strong>${index + 1}.</strong> ${incident.message} <br />
              <small>
                Estado: ${incident.status} | Fecha: ${new Date(incident.date).toLocaleString()}
              </small>
            </li>`
        ).join('');
  
        // Mostrar las incidencias en un modal con SweetAlert2
        Swal.fire({
          title: 'Detalles de Bloqueo',
          html: `<ul style="text-align: left; list-style: none; padding: 0;">${incidencesList}</ul>`,
          icon: 'info',
          confirmButtonText: 'Cerrar',
        });
      } else {
        // Mostrar un mensaje si no se encuentran incidencias
        Swal.fire('Información', 'No se encontraron incidencias para este usuario.', 'info');
      }
    } catch (error) {
      console.error('Error al obtener las incidencias:', error);
      Swal.fire('Error', 'No se pudieron cargar las incidencias.', 'error');
    }
  };
  


  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg font-medium animate-pulse">Cargando usuarios bloqueados...</p>
      </div>
    );
  }

  return (
    <div className={`p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} rounded-lg shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-300'} w-full max-w-6xl mx-auto`}>
      <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-blue-400' : 'text-blue-700'} text-center`}>
        Usuarios Bloqueados
      </h2>
      {blockedUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-white dark:bg-gray-800">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="text-left px-6 py-4 font-semibold border-b">Nombre</th>
                <th className="text-left px-6 py-4 font-semibold border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {blockedUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 border-b">{`${user.nombre} ${user.apellidoP} ${user.apellidoM}`}</td>
                  <td className="px-6 py-4 border-b flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(user._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Ver Detalles
                    </button>
                    <button
                      onClick={() => handleUnblock(user._id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    >
                      Desbloquear
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
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
