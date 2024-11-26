// C:\xampp\htdocs\puntoShein\Frontend\src\componentes\Terms.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MIS_URL } from './MiVariable';

const Terms = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        // Petición al backend para obtener los tres últimos documentos vigentes
        const response = await axios.get(`${MIS_URL}/api/documents/last-three`, {
          withCredentials: true,
        });

        // Filtrar los documentos para obtener solo "Términos y condiciones"
        if (response.data) {
          const filteredDocuments = response.data['Términos y condiciones'];
          setDocuments(filteredDocuments);
        } else {
          setError('No se encontraron documentos de Términos y Condiciones.');
        }
      } catch (err) {
        console.error('Error al obtener los Términos y Condiciones:', err);
        setError('Hubo un problema al cargar los Términos y Condiciones.');
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-10 max-w-4xl mx-auto bg-gray-100 rounded-md shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-black">Términos y Condiciones</h1>
      {documents.length > 0 ? (
        documents.map((doc, index) => (
          <div key={doc._id} className="mb-8">
            <h2 className="text-xl font-semibold">Versión {doc.version}</h2>
            <p className="text-lg mb-2">{doc.content}</p>
            <p className="text-sm text-gray-600 italic">
              Fecha de vigencia: {new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(doc.effectiveDate))}
            </p>
          </div>
        ))
      ) : (
        <p>No hay documentos disponibles.</p>
      )}
    </div>
  );
};

export default Terms;
