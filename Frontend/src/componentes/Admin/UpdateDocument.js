// src/componentes/Admin/UpdateDocument.js
import React, { useState } from 'react';
import axios from '../../api/axios';

const UpdateDocument = ({ documentId }) => {
  const [content, setContent] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/${documentId}`, { content });
      alert('Documento actualizado con éxito');
      setContent('');
    } catch (error) {
      console.error("Error al actualizar el documento:", error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
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
