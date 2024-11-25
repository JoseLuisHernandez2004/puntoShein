import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { MIS_URL } from '../MiVariable';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { ThemeContext } from '../Style/Tema'; // Asegúrate de que ThemeContext esté importado

const MyUsers = () => {
  const { darkMode } = useContext(ThemeContext); // Obtén el estado del tema
  const [users, setUsers] = useState([]); // Estado para almacenar la lista de usuarios
  const [loading, setLoading] = useState(true); // Estado para manejar el indicador de carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [editingUserId, setEditingUserId] = useState(null); // Estado para almacenar el usuario que se está editando
  const [newRole, setNewRole] = useState(''); // Estado para almacenar el nuevo rol del usuario

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${MIS_URL}/api/users`, { withCredentials: true });
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          setError('Error al obtener los usuarios.');
          Swal.fire('Error', 'Error al obtener los usuarios.', 'error');
        }
        setLoading(false);
      } catch (error) {
        setError('Error al obtener los usuarios.');
        Swal.fire('Error', 'Error al obtener los usuarios.', 'error');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId, currentRole) => {
    setEditingUserId(userId);
    setNewRole(currentRole); // Inicializar el nuevo rol con el rol actual del usuario
  };

  const handleSave = async (userId) => {
    try {
      const response = await axios.put(
        `${MIS_URL}/api/users/${userId}`,
        { role: newRole },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user));
        setEditingUserId(null);
        setNewRole('');
        Swal.fire('Éxito', 'Rol del usuario actualizado correctamente.', 'success'); // Alerta de éxito
      } else {
        setError('Error al actualizar el rol del usuario.');
        Swal.fire('Error', 'Error al actualizar el rol del usuario.', 'error');
      }
    } catch (error) {
      console.error('Error al actualizar el rol del usuario:', error);
      setError('Error al actualizar el rol del usuario.');
      Swal.fire('Error', 'Error al actualizar el rol del usuario.', 'error'); // Alerta de error
    }
  };

  // Función para eliminar un usuario
  const handleDelete = async (userId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
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
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });

          if (response.status === 200) {
            setUsers(users.filter(user => user._id !== userId));
            Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
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

  // Función para desactivar un usuario
  const handleDeactivate = async (userId) => {
    try {
      const response = await axios.put(
        `${MIS_URL}/api/users/${userId}`,
        { isActive: false },
        {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        setUsers(users.map(user => user._id === userId ? { ...user, isActive: false } : user));
        Swal.fire('Desactivado', 'El usuario ha sido desactivado.', 'success');
      } else {
        Swal.fire('Error', 'No se pudo desactivar el usuario.', 'error');
      }
    } catch (error) {
      console.error('Error al desactivar el usuario:', error);
      Swal.fire('Error', 'No se pudo desactivar el usuario.', 'error');
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
                <li key={user._id} className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-black'} hover:shadow-lg transition-all`}>
                  <p className="text-lg font-bold">{user.nombre} {user.apellidoP} {user.apellidoM}</p>
                  <p className="text-white-600">Correo electrónico: {user.email}</p>
                  <p className="text-white-600">Teléfono: {user.telefono}</p>
                  <p className="text-white-600">Rol: {user.role}</p>
                  <p className="text-white-600">Estado: {user.isActive ? 'Activo' : 'Inactivo'}</p>

                  {editingUserId === user._id ? (
                    <div className="mt-4">
                      <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className={`p-2 border ${darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg`}
                      >
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                      </select>
                      <button
                        onClick={() => handleSave(user._id)}
                        className={`ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 ${darkMode ? 'bg-green-700' : 'bg-green-500'}`}
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
                        className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}
                      >
                        Cambiar Rol
                      </button>
                      <button
                        onClick={() => handleDeactivate(user._id)}
                        className={`px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 ${darkMode ? 'bg-yellow-600' : 'bg-yellow-500'}`}
                      >
                        Desactivar
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className={`px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 ${darkMode ? 'bg-red-600' : 'bg-red-500'}`}
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
