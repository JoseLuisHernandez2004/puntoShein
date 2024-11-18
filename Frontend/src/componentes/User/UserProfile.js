import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MIS_URL } from "../MiVariable";
import Swal from 'sweetalert2';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let isMounted = true; // Para evitar actualizaciones en componentes desmontados

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${MIS_URL}/api/profile`, { withCredentials: true });
        if (isMounted) {
          setUserData({
            nombre: response.data.nombre || '',
            apellidoP: response.data.apellidoP || '',
            apellidoM: response.data.apellidoM || '',
            telefono: response.data.telefono || '',
            direccion: response.data.direccion || '',
            fechaNacimiento: response.data.fechaNacimiento ? new Date(response.data.fechaNacimiento).toISOString().substr(0, 10) : '',
            email: response.data.email || '',
          });
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError('Error al obtener los datos del usuario.');
          setLoading(false);
        }
      }
    };

    fetchUserData();

    return () => {
      isMounted = false; // Limpieza para evitar actualizaciones
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      const response = await axios.put(
        `${MIS_URL}/api/profile`,
        {
          nombre: userData.nombre,
          apellidoP: userData.apellidoP,
          apellidoM: userData.apellidoM,
          telefono: userData.telefono,
          direccion: userData.direccion,
          fechaNacimiento: userData.fechaNacimiento,
        },
        { withCredentials: true }
      );
      
      if (response.status === 200) {
        Swal.fire('Éxito', 'Perfil actualizado correctamente', 'success');
        setIsEditing(false);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'No se pudo actualizar el perfil.';
      Swal.fire('Error', errorMessage, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p>Cargando perfil...</p>
        <div className="mt-5">
          <div className="loader"></div> {/* Puedes agregar un spinner */}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p>{error}</p>
        <div className="mt-5">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h1 className="text-4xl font-bold text-gray-800">Mi Perfil</h1>
      <div className="mt-6 bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        {!isEditing ? (
          <>
            <p><strong>Nombre:</strong> {userData.nombre}</p>
            <p><strong>Apellido Paterno:</strong> {userData.apellidoP}</p>
            <p><strong>Apellido Materno:</strong> {userData.apellidoM}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Teléfono:</strong> {userData.telefono}</p>
            <p><strong>Dirección:</strong> {userData.direccion || 'No proporcionada'}</p>
            <p><strong>Fecha de nacimiento:</strong> {userData.fechaNacimiento || 'No proporcionada'}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full"
            >
              Editar Perfil
            </button>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre:</label>
              <input
                id="nombre"
                type="text"
                name="nombre"
                value={userData.nombre}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="apellidoP" className="block text-sm font-medium text-gray-700">Apellido Paterno:</label>
              <input
                id="apellidoP"
                type="text"
                name="apellidoP"
                value={userData.apellidoP}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="apellidoM" className="block text-sm font-medium text-gray-700">Apellido Materno:</label>
              <input
                id="apellidoM"
                type="text"
                name="apellidoM"
                value={userData.apellidoM}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono:</label>
              <input
                id="telefono"
                type="text"
                name="telefono"
                value={userData.telefono}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-lg"
                pattern="\d{10}"
                title="El teléfono debe tener 10 dígitos"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">Dirección:</label>
              <input
                id="direccion"
                type="text"
                name="direccion"
                value={userData.direccion}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento:</label>
              <input
                id="fechaNacimiento"
                type="date"
                name="fechaNacimiento"
                value={userData.fechaNacimiento}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-lg"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleSaveChanges}
                className={`mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 w-full ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={saving}
              >
                {saving ? 'Guardando...' : 'Guardar Cambios'}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="mt-4 ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full"
              >
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
