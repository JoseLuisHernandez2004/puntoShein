// src/componentes/Admin/DocumentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MIS_URL } from '../MiVariable';

const DocumentList = ({ onSelectDocument }) => {
  const [currentDocument, setCurrentDocument] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentDocument = async () => {
      try {
        const response = await axios.get(`${MIS_URL}/api/documents/current`);
        setCurrentDocument(response.data);
      } catch (error) {
        console.error("Error al obtener el documento vigente:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentDocument();
  }, []);

  useEffect(() => {
    const fetchDocumentHistory = async (title) => {
      try {
        const response = await axios.get(`${MIS_URL}/api/documents/history/${title}`);
        setHistory(response.data);
      } catch (error) {
        console.error("Error al obtener el historial:", error);
      }
    };

    if (currentDocument?.title) {
      fetchDocumentHistory(currentDocument.title);
    }
  }, [currentDocument]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Documento Vigente</h2>
      {currentDocument ? (
        <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold">{currentDocument.title}</h3>
          <p className="text-gray-700 mb-2">{currentDocument.content}</p>
          <p className="text-sm text-gray-500">Versión: {currentDocument.version}</p>
          <p className="text-sm text-gray-500">Fecha efectiva: {new Date(currentDocument.effectiveDate).toLocaleDateString()}</p>
          <button
            onClick={() => onSelectDocument(currentDocument._id)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Seleccionar para Actualizar/Eliminar
          </button>
        </div>
      ) : (
        <p>No hay un documento vigente.</p>
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">Historial de Versiones</h2>
      <ul className="space-y-4">
        {history.map((doc) => (
          <li key={doc._id} className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <strong>Versión {doc.version}:</strong> {doc.content} (Fecha: {new Date(doc.updatedAt).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
