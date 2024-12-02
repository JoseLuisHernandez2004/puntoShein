import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { MIS_URL } from '../MiVariable';
import Swal from 'sweetalert2';
import { ThemeContext } from '../Style/Tema';

const MyUsers = () => {
  const { darkMode } = useContext(ThemeContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${MIS_URL}/api/users`, { withCredentials: true });
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          throw new Error('Error al obtener los usuarios.');
        }

        const currentUserResponse = await axios.get(`${MIS_URL}/api/profile`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (currentUserResponse.status === 200) {
          setCurrentUserId(currentUserResponse.data._id);
        } else {
          throw new Error('Error al obtener el perfil del usuario actual.');
        }
      } catch (err) {
        setError('Error al obtener los usuarios.');
        Swal.fire('Error', 'Error al obtener los usuarios.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId, currentRole) => {
    setEditingUserId(userId);
    setNewRole(currentRole);
  };

  const handleDelete = async (userId) => {
    if (userId === currentUserId) {
      Swal.fire('Acción no permitida', 'No puedes eliminar tu propia cuenta.', 'error');
      return;
    }

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
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });

          if (response.status === 200) {
            setUsers(users.filter(user => user._id !== userId));
            Swal.fire('Eliminado', response.data.message, 'success');
          } else {
            Swal.fire('Error', response.data.message, 'error');
          }
        } catch (error) {
          console.error('Error al eliminar el usuario:', error);
          const errorMessage = error.response?.data?.message || 'No se pudo eliminar el usuario.';
          Swal.fire('Error', errorMessage, 'error');
        }
      }
    });
  };

  const handleSave = async (userId) => {
    if (userId === currentUserId && newRole !== 'admin') {
      Swal.fire('Acción no permitida', 'No puedes cambiar tu propio rol a algo diferente de administrador.', 'error');
      return;
    }

    try {
      const response = await axios.put(
        `${MIS_URL}/api/users/${userId}`,
        { role: newRole },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        setUsers(users.map(user => (user._id === userId ? { ...user, role: newRole } : user)));
        setEditingUserId(null);
        setNewRole('');
        Swal.fire('Éxito', response.data.message, 'success');
      } else {
        Swal.fire('Error', response.data.message, 'error');
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || 'Error al actualizar el rol del usuario.';
      Swal.fire('Error', errorMessage, 'error');
    }
  };

  const handleBlock = async (userId) => {
    try {
      const response = await axios.put(
        `${MIS_URL}/api/users/${userId}/block`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        setUsers(users.map(user => (user._id === userId ? { ...user, isBlocked: true } : user)));
        Swal.fire('Bloqueado', response.data.message, 'success');
      } else {
        Swal.fire('Error', response.data.message, 'error');
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || 'No se pudo bloquear el usuario.';
      Swal.fire('Error', errorMessage, 'error');
    }
  };

  const handleUnblock = async (userId) => {
    try {
      const response = await axios.put(
        `${MIS_URL}/api/users/${userId}/unblock`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        setUsers(users.map(user => (user._id === userId ? { ...user, isBlocked: false } : user)));
        Swal.fire('Desbloqueado', response.data.message, 'success');
      } else {
        Swal.fire('Error', response.data.message, 'error');
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || 'No se pudo desbloquear el usuario.';
      Swal.fire('Error', errorMessage, 'error');
    }
  };

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={`mt-2 flex justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className={`w-full max-w-4xl p-8 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className="text-3xl font-bold text-center mb-8">Gestión de Usuarios</h1>
        <div className="mt-8">
          {users.length > 0 ? (
            <ul className="space-y-4">
              {users.map(user => (
                <li
                  key={user._id}
                  className={`p-6 rounded-lg shadow-md ${
                    user._id === currentUserId
                      ? darkMode
                        ? 'bg-blue-800 text-white'
                        : 'bg-blue-200 text-black'
                      : darkMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-50 text-black'
                  } hover:shadow-lg transition-all`}
                >
                  <p className="text-lg font-bold">
                    {user.nombre} {user.apellidoP} {user.apellidoM}
                    {user._id === currentUserId && ' (Yo)'}
                  </p>
                  <p>Correo electrónico: {user.email}</p>
                  <p>Teléfono: {user.telefono}</p>
                  <p>Rol: {user.role}</p>
                  <p>Estado: {user.isBlocked ? 'Bloqueado' : 'Activo'}</p>

                  {editingUserId === user._id ? (
                    <div className="mt-4">
                      <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className={`p-2 border ${
                          darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'
                        } rounded-lg`}
                      >
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                      </select>
                      <button
                        onClick={() => handleSave(user._id)}
                        className={`ml-2 px-4 py-2 text-white rounded-lg hover:bg-green-600 ${
                          darkMode ? 'bg-green-700' : 'bg-green-500'
                        }`}
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingUserId(null)}
                        className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => handleEdit(user._id, user.role)}
                        className={`px-4 py-2 text-white rounded-lg hover:bg-blue-600 ${
                          darkMode ? 'bg-blue-600' : 'bg-blue-500'
                        }`}
                        disabled={user._id === currentUserId}
                      >
                        Cambiar Rol
                      </button>
                      {user.isBlocked ? (
                        <button
                          onClick={() => handleUnblock(user._id)}
                          className={`px-4 py-2 text-white rounded-lg hover:bg-green-600 ${
                            darkMode ? 'bg-green-700' : 'bg-green-500'
                          }`}
                          disabled={user._id === currentUserId}
                        >
                          Desbloquear
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBlock(user._id)}
                          className={`px-4 py-2 text-white rounded-lg hover:bg-yellow-600 ${
                            darkMode ? 'bg-yellow-600' : 'bg-yellow-500'
                          }`}
                          disabled={user._id === currentUserId}
                        >
                          Bloquear
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(user._id)}
                        className={`px-4 py-2 text-white rounded-lg hover:bg-red-600 ${
                          darkMode ? 'bg-red-600' : 'bg-red-500'
                        }`}
                        disabled={user._id === currentUserId}
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center">No se encontraron usuarios.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyUsers;
