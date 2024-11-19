// src/componentes/Admin/UpdateDocument.js
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MIS_URL } from '../MiVariable';

const UpdateDocument = ({ documentId }) => {
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
      className="p-6 bg-gray-50 rounded-lg shadow-md"
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <h2 className="text-2xl font-bold mb-4">Actualizar Documento</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Nuevo contenido"
        required
        className="p-2 border rounded mb-4"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Actualizar Documento
      </button>
    </form>
  );
};

export default UpdateDocument;
