import React, { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MIS_URL } from '../MiVariable';
import { ThemeContext } from '../Style/Tema';
import DOMPurify from 'dompurify';
import { FaFileAlt } from 'react-icons/fa';

// Configurar DOMPurify para uso en React
const purify = DOMPurify.sanitize;

const CreateDocument = () => {
  const { darkMode } = useContext(ThemeContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId] = useState(''); // Asegúrate de obtener el ID del usuario

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    if (!['Política de privacidad', 'Términos y condiciones', 'Deslinde legal'].includes(title)) {
      Swal.fire({
        title: 'Error',
        text: 'Debe seleccionar un tipo de documento válido.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    // Obtener la fecha y hora actual
    const currentDate = new Date().toISOString();

    // Sanitizar el contenido antes de enviarlo
    const sanitizedContent = purify(content);

    try {
      Swal.fire({
        title: 'Cargando...',
        text: 'Por favor espera mientras se crea el documento.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Enviar la solicitud al backend con el campo 'createdBy'
      await axios.post(
        `${MIS_URL}/api/documents`,
        { title, content: sanitizedContent, effectiveDate: currentDate, createdBy: userId }, // Usar el contenido sanitizado
        { withCredentials: true }
      );

      Swal.fire({
        title: 'Éxito',
        text: 'Documento creado con éxito.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      setTitle('');
      setContent('');
    } catch (err) {
      console.error("Error al crear el documento:", err);

      Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || 'Hubo un problema al crear el documento. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-8 rounded-lg shadow-lg ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} max-w-xl mx-auto mt-10 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
    >
      <div className="flex items-center mb-6">
        <FaFileAlt className={`text-4xl mr-3 ${darkMode ? 'text-yellow-400' : 'text-blue-600'}`} />
        <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Crear Documento Regulatorio</h2>
      </div>

      <label className="block font-semibold mb-2" htmlFor="title">
        Tipo de Documento
      </label>
      <select
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className={`p-3 w-full border rounded mb-4 focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-800 border-gray-600 text-white focus:ring-yellow-500' : 'bg-white border-gray-300 text-black focus:ring-blue-500'}`}
      >
        <option value="">Seleccione un documento</option>
        <option value="Política de privacidad">Política de privacidad</option>
        <option value="Términos y condiciones">Términos y condiciones</option>
        <option value="Deslinde legal">Deslinde legal</option>
      </select>

      <label className="block font-semibold mb-2" htmlFor="content">
        Contenido del Documento
      </label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => {
          const input = e.target.value;
          // Filtrar solo letras, números y espacios
          const sanitizedInput = input.replace(/[^a-zA-Z\s]/g, '');
          setContent(sanitizedInput);
        }}
        placeholder="Escriba el contenido del documento aquí..."
        required
        className={`p-3 w-full border rounded mb-4 h-40 focus:outline-none focus:ring-2 ${
          darkMode
            ? 'bg-gray-800 border-gray-600 text-white focus:ring-yellow-500'
            : 'bg-white border-gray-300 text-black focus:ring-blue-500'
        }`}
      />


      <button
        type="submit"
        className={`w-full py-3 rounded-lg text-lg font-semibold mt-4 transition-all duration-300 ease-in-out transform hover:scale-105 ${darkMode ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
      >
        Crear Documento
      </button>
    </form>
  );
};

export default CreateDocument;
