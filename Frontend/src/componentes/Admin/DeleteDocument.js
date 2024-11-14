// src/componentes/Admin/DeleteDocument.js
import React from 'react';
import axios from 'axios';
import { MIS_URL } from '../MiVariable';

const DeleteDocument = ({ documentId }) => {
  const handleDelete = async () => {
    if (!documentId) {
      alert("Selecciona un documento para eliminar.");
      return;
    }
    try {
      await axios.delete(`${MIS_URL}/api/documents/${documentId}`);
      alert('Documento marcado como eliminado');
    } catch (error) {
      console.error("Error al eliminar el documento:", error);
      alert("Hubo un error al eliminar el documento. Por favor, intenta de nuevo.");
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
