// src/componentes/Admin/UpdateDocument.js
import React, { useState } from 'react';
import axios from 'axios';
import { MIS_URL } from '../MiVariable';

const UpdateDocument = ({ documentId }) => {
  const [content, setContent] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!documentId) {
      alert("Selecciona un documento para actualizar.");
      return;
    }
    try {
      await axios.put(`${MIS_URL}/api/documents/${documentId}`, { content });
      alert('Documento actualizado con éxito');
      setContent('');
    } catch (error) {
      console.error("Error al actualizar el documento:", error);
      alert("Hubo un error al actualizar el documento. Por favor, intenta de nuevo.");
    }
  };

  return (
    <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2>Actualizar Documento</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Nuevo contenido"
        required
      />
      <button type="submit">Actualizar Documento</button>
    </form>
  );
};

export default UpdateDocument;
