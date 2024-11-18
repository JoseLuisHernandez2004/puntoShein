import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MIS_URL } from "../MiVariable";
import Swal from 'sweetalert2';

const AdminProfile = () => {
    const [adminData, setAdminData] = useState({
        username: '',
        email: '',
        telefono: '',
        direccion: '',
        role: '',
        nombre: '',
        apellidoP: '',
        apellidoM: '',
        fechaNacimiento: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // Estado para el modo edición
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        telefono: '',
        direccion: '',
        role: '',
        nombre: '',
        apellidoP: '',
        apellidoM: '',
        fechaNacimiento: '',
    });
    const [saving, setSaving] = useState(false); // Estado para manejar la solicitud de guardado

    useEffect(() => {
        let isMounted = true; // Para evitar actualizaciones en componentes desmontados

        const fetchAdminData = async () => {
            try {
                const response = await axios.get(`${MIS_URL}/api/admin/profile`, { withCredentials: true });
                if (isMounted) {
                    console.log("Datos recibidos del perfil de administrador:", response.data); // Log para verificar los datos
                    setAdminData({
                        username: response.data.username || '',
                        email: response.data.email || '',
                        telefono: response.data.telefono || '',
                        direccion: response.data.direccion || '',
                        role: response.data.role || '',
                        nombre: response.data.nombre || '',
                        apellidoP: response.data.apellidoP || '',
                        apellidoM: response.data.apellidoM || '',
                        fechaNacimiento: response.data.fechaNacimiento || '',
                    });
                    setFormData({
                        username: response.data.username || '',
                        email: response.data.email || '',
                        telefono: response.data.telefono || '',
                        direccion: response.data.direccion || '',
                        role: response.data.role || '',
                        nombre: response.data.nombre || '',
                        apellidoP: response.data.apellidoP || '',
                        apellidoM: response.data.apellidoM || '',
                        fechaNacimiento: response.data.fechaNacimiento || '',
                    });
                    setLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    const errorMessage = error.response?.data?.message || 'Error al obtener los datos del administrador.';
                    console.error("Error al obtener datos del perfil:", error);
                    setError(errorMessage);
                    setLoading(false);
                }
            }
        };

        fetchAdminData();

        return () => {
            isMounted = false; // Limpieza para evitar actualizaciones
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        // Validaciones básicas
        if (!formData.username || !formData.email || !formData.nombre || !formData.apellidoP) {
            Swal.fire('Error', 'Nombre, apellido paterno y correo electrónico son obligatorios.', 'error');
            return;
        }

        // Validación de teléfono (opcional pero recomendada)
        const telefonoRegex = /^\d{10}$/;
        if (formData.telefono && !telefonoRegex.test(formData.telefono)) {
            Swal.fire('Error', 'El teléfono debe tener exactamente 10 dígitos.', 'error');
            return;
        }

        setSaving(true);
        try {
            const response = await axios.put(`${MIS_URL}/api/admin/profile`, {
                username: formData.username,
                email: formData.email,
                telefono: formData.telefono,
                direccion: formData.direccion,
                nombre: formData.nombre,
                apellidoP: formData.apellidoP,
                apellidoM: formData.apellidoM,
                fechaNacimiento: formData.fechaNacimiento,
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log("Respuesta de actualización:", response.data);
                setAdminData({ ...formData });
                setIsEditing(false);
                Swal.fire('Éxito', 'Perfil actualizado correctamente.', 'success');
            } else {
                Swal.fire('Error', 'No se pudo actualizar el perfil.', 'error');
            }
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
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
                {/* Puedes agregar un spinner o indicador de carga aquí */}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-6">Perfil de Administrador</h1>
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
                {isEditing ? (
                    <>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700">Nombre de Usuario:</label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Email:</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nombre" className="block text-gray-700">Nombre:</label>
                            <input
                                id="nombre"
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="apellidoP" className="block text-gray-700">Apellido Paterno:</label>
                            <input
                                id="apellidoP"
                                type="text"
                                name="apellidoP"
                                value={formData.apellidoP}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="apellidoM" className="block text-gray-700">Apellido Materno:</label>
                            <input
                                id="apellidoM"
                                type="text"
                                name="apellidoM"
                                value={formData.apellidoM}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="telefono" className="block text-gray-700">Teléfono:</label>
                            <input
                                id="telefono"
                                type="text"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                pattern="\d{10}"
                                title="El teléfono debe tener 10 dígitos"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="direccion" className="block text-gray-700">Dirección:</label>
                            <input
                                id="direccion"
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="fechaNacimiento" className="block text-gray-700">Fecha de Nacimiento:</label>
                            <input
                                id="fechaNacimiento"
                                type="date"
                                name="fechaNacimiento"
                                value={formData.fechaNacimiento}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="role" className="block text-gray-700">Rol:</label>
                            <input
                                id="role"
                                type="text"
                                name="role"
                                value={formData.role}
                                disabled
                                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={handleSave}
                                className={`px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={saving}
                            >
                                {saving ? 'Guardando...' : 'Guardar'}
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Cancelar
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p><strong>Nombre de Usuario:</strong> {adminData.username}</p>
                        <p><strong>Email:</strong> {adminData.email}</p>
                        <p><strong>Nombre:</strong> {adminData.nombre}</p>
                        <p><strong>Apellido Paterno:</strong> {adminData.apellidoP}</p>
                        <p><strong>Apellido Materno:</strong> {adminData.apellidoM || 'No proporcionado'}</p>
                        <p><strong>Teléfono:</strong> {adminData.telefono || 'No proporcionado'}</p>
                        <p><strong>Dirección:</strong> {adminData.direccion || 'No proporcionada'}</p>
                        <p><strong>Fecha de Nacimiento:</strong> {adminData.fechaNacimiento || 'No proporcionada'}</p>
                        <p><strong>Rol:</strong> {adminData.role}</p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full"
                        >
                            Editar Perfil
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminProfile;
