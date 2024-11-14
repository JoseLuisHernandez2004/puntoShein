// src/componentes/Admin/CreateDocument.js
import React, { useState } from 'react';
import axios from 'axios'; // Usa axios directamente
import { MIS_URL } from '../MiVariable'; // Importa la URL base

const CreateDocument = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [effectiveDate, setEffectiveDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Usa MIS_URL como la URL base para la solicitud POST
      await axios.post(`${MIS_URL}/api/documents`, { title, content, effectiveDate });
      alert('Documento creado con éxito');
      setTitle('');
      setContent('');
      setEffectiveDate('');
    } catch (error) {
      console.error("Error al crear el documento:", error);
      alert("Hubo un error al crear el documento. Por favor, intenta de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2>Crear Documento Regulatorio</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Contenido del documento"
        required
      />
      <input
        type="date"
        value={effectiveDate}
        onChange={(e) => setEffectiveDate(e.target.value)}
        required
      />
      <button type="submit">Crear Documento</button>
    </form>
  );
};

export default CreateDocument;
