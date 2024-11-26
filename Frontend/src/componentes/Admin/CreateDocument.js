import React, { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MIS_URL } from '../MiVariable';
import { ThemeContext } from '../Style/Tema';

const CreateDocument = () => {
  const { darkMode } = useContext(ThemeContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [effectiveDate, setEffectiveDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !effectiveDate) {
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

    if (isNaN(new Date(effectiveDate).getTime())) {
      Swal.fire({
        title: 'Error',
        text: 'La fecha efectiva no es válida.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    try {
      Swal.fire({
        title: 'Cargando...',
        text: 'Por favor espera mientras se crea el documento.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Send request to backend
      await axios.post(
        `${MIS_URL}/api/documents`,
        { title, content, effectiveDate },
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
      setEffectiveDate('');
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
      className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-black'}`}
    >
      <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Crear Documento Regulatorio</h2>

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
        placeholder="Contenido del documento"
        required
        className={`p-2 border rounded mb-4 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
      />
      <input
        type="date"
        value={effectiveDate}
        onChange={(e) => setEffectiveDate(e.target.value)}
        required
        className={`p-2 border rounded mb-4 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
      />
      <button
        type="submit"
        className={`px-4 py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
      >
        Crear Documento
      </button>
    </form>
  );
};

export default CreateDocument;
