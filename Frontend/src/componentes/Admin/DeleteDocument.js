// src/componentes/Admin/DeleteDocument.js
import React from 'react';
import axios from '../../api/axios';

const DeleteDocument = ({ documentId }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/${documentId}`);
      alert('Documento marcado como eliminado');
    } catch (error) {
      console.error("Error al eliminar el documento:", error);
    }
  };

  return (
    <div>
      <h2>Eliminar Documento</h2>
      <button onClick={handleDelete}>Eliminar Documento</button>
    </div>
  );
};

export default DeleteDocument;
