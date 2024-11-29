import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MIS_URL } from '../MiVariable';
import { ThemeContext } from '../Style/Tema';
import DOMPurify from 'dompurify';

const UpdateDocument = ({ documentId, onCancel }) => {
  const { darkMode } = useContext(ThemeContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createNewVersion, setCreateNewVersion] = useState(false);

  useEffect(() => {
    console.log("Document ID recibido en UpdateDocument:", documentId); // Diagnóstico
  
    if (!documentId) {
      Swal.fire({
        title: 'Error',
        text: 'El ID del documento no es válido.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
  
    const fetchDocumentData = async () => {
      try {
        console.log("Realizando petición para obtener el documento...");
        const response = await axios.get(`${MIS_URL}/api/documents/${documentId}`, {
          withCredentials: true,
        });
  
        console.log("Respuesta del servidor:", response.data); // Diagnóstico
  
        const { title, content } = response.data;
  
        if (title && content) {
          setTitle(title);
          setContent(content);
        } else {
          throw new Error('El documento tiene datos incompletos.');
        }
      } catch (err) {
        console.error('Error al obtener el documento:', err);
  
        Swal.fire({
          title: 'Error',
          text: err.response?.data?.message || 'No se pudo cargar el documento para actualizar.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    };
  
    fetchDocumentData();
  }, [documentId]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content) {
      Swal.fire({
        title: 'Error',
        text: 'El contenido es obligatorio.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    const sanitizedContent = DOMPurify.sanitize(content);

    try {
      Swal.fire({
        title: 'Cargando...',
        text: 'Por favor espera mientras se actualiza el documento.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Decidir si crear una nueva versión o modificar el documento existente
      await axios.put(
        `${MIS_URL}/api/documents/${documentId}`,
        {
          title, // El título no cambia, pero se envía para conservar consistencia
          content: sanitizedContent,
          createNewVersion,
        },
        { withCredentials: true }
      );

      Swal.fire({
        title: 'Éxito',
        text: 'Documento actualizado con éxito.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      onCancel(); // Cancelar la edición después de la actualización exitosa
    } catch (err) {
      console.error('Error al actualizar el documento:', err);
      Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || 'Hubo un problema al actualizar el documento. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-8 rounded-lg shadow-lg ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
      } max-w-xl mx-auto mt-10 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
    >
      <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Actualizar Documento Regulatorio
      </h2>

      <label className="block font-semibold mb-2" htmlFor="title">
        Tipo de Documento
      </label>
      <p
        id="title"
        className={`p-3 w-full border rounded mb-4 focus:outline-none ${
          darkMode
            ? 'bg-gray-800 border-gray-600 text-white'
            : 'bg-gray-100 border-gray-300 text-black'
        }`}
      >
        {title}
      </p>

      <label className="block font-semibold mb-2" htmlFor="content">
        Contenido del Documento
      </label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Actualice el contenido del documento aquí..."
        required
        className={`p-3 w-full border rounded mb-4 h-40 focus:outline-none focus:ring-2 ${
          darkMode
            ? 'bg-gray-800 border-gray-600 text-white focus:ring-yellow-500'
            : 'bg-white border-gray-300 text-black focus:ring-blue-500'
        }`}
      />

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="createNewVersion"
          checked={createNewVersion}
          onChange={() => setCreateNewVersion(!createNewVersion)}
          className="mr-2"
        />
        <label htmlFor="createNewVersion" className="font-semibold">
          Crear una nueva versión del documento
        </label>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className={`w-full py-3 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 ${
            darkMode
              ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Actualizar Documento
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={`w-full py-3 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 ${
            darkMode
              ? 'bg-gray-700 hover:bg-gray-800 text-white'
              : 'bg-gray-400 hover:bg-gray-500 text-black'
          }`}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default UpdateDocument;
