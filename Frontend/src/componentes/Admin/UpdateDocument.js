import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MIS_URL } from '../MiVariable';
import { ThemeContext } from '../Style/Tema';

const UpdateDocument = ({ documentId }) => {
  const { darkMode } = useContext(ThemeContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Fetch document data on component load
  useEffect(() => {
    const fetchDocument = async () => {
      if (!documentId) return;

      try {
        const response = await axios.get(`${MIS_URL}/api/documents/${documentId}`, { withCredentials: true });
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (err) {
        console.error("Error al obtener el documento:", err);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al cargar el documento. Intenta de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    };

    fetchDocument();
  }, [documentId]);

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
      await axios.put(
        `${MIS_URL}/api/documents/${documentId}`,
        { title, content },
        { withCredentials: true }
      );

      Swal.fire({
        title: 'Éxito',
        text: 'El documento ha sido actualizado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

    } catch (error) {
      console.error("Error al actualizar el documento:", error);

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

      <select
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className={`p-2 border rounded mb-4 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
      >
        <option value="">Seleccione un documento</option>
        <option value="Política de privacidad">Política de privacidad</option>
        <option value="Términos y condiciones">Términos y condiciones</option>
        <option value="Deslinde legal">Deslinde legal</option>
      </select>

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
