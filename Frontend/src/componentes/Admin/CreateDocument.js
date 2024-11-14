// src/componentes/Admin/CreateDocument.js
import React, { useState } from 'react';
import axios from '../../api/axios';

const CreateDocument = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [effectiveDate, setEffectiveDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/', { title, content, effectiveDate });
      alert('Documento creado con éxito');
      setTitle('');
      setContent('');
      setEffectiveDate('');
    } catch (error) {
      console.error("Error al crear el documento:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
