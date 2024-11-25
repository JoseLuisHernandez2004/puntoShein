import React, { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MIS_URL } from '../MiVariable';
import { ThemeContext } from '../Style/Tema'; // Asegurarse de importar el ThemeContext

const UpdateDocument = ({ documentId }) => {
  const { darkMode } = useContext(ThemeContext); // Obtener el estado del tema
  const [content, setContent] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!documentId) {
      Swal.fire({
        title: 'Error',
        text: 'Selecciona un documento para actualizar.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    try {
      // Solicitud para actualizar el documento
      await axios.put(
        `${MIS_URL}/api/documents/${documentId}`,
        { content },
        { withCredentials: true }
      );

      // Alerta de éxito
      Swal.fire({
        title: 'Éxito',
        text: 'El documento ha sido actualizado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      // Limpiar el campo de contenido
      setContent('');
    } catch (error) {
      console.error("Error al actualizar el documento:", error);

      // Manejo de errores con SweetAlert2
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al actualizar el documento. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-black'}`}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Actualizar Documento</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Nuevo contenido"
        required
        className={`p-2 border ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} rounded mb-4`}
      />
      <button
        type="submit"
        className={`px-4 py-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded`}
      >
        Actualizar Documento
      </button>
    </form>
  );
};

export default UpdateDocument;
