// src/componentes/Admin/DocumentList.js
import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

const DocumentList = () => {
  const [currentDocument, setCurrentDocument] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentDocument = async () => {
      try {
        const response = await axios.get('/current');
        setCurrentDocument(response.data);
      } catch (error) {
        console.error("Error al obtener el documento vigente:", error);
      }
    };

    const fetchDocumentHistory = async () => {
      try {
        const response = await axios.get(`/history/${currentDocument?.title}`);
        setHistory(response.data);
      } catch (error) {
        console.error("Error al obtener el historial:", error);
      }
    };

    fetchCurrentDocument();
    if (currentDocument) fetchDocumentHistory();
    setLoading(false);
  }, [currentDocument]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Documento Vigente</h2>
      {currentDocument ? (
        <div>
          <h3>{currentDocument.title}</h3>
          <p>{currentDocument.content}</p>
          <p>Versión: {currentDocument.version}</p>
          <p>Fecha efectiva: {new Date(currentDocument.effectiveDate).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>No hay un documento vigente.</p>
      )}

      <h2>Historial de Versiones</h2>
      <ul>
        {history.map(doc => (
          <li key={doc._id}>
            <strong>Versión {doc.version}:</strong> {doc.content} (Fecha: {new Date(doc.updatedAt).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
