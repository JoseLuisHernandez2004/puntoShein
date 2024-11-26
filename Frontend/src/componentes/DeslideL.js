// C:\xampp\htdocs\puntoShein\Frontend\src\componentes\DeslideL.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MIS_URL } from './MiVariable'; // URL de tu backend

const DeslideL = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLegalDisclaimer = async () => {
      try {
        // Petición al backend para obtener los tres últimos documentos vigentes
        const response = await axios.get(`${MIS_URL}/api/documents/last-three`, {
          withCredentials: true,
        });

        // Filtrar los documentos para obtener solo "Deslinde legal"
        if (response.data) {
          const filteredDocuments = response.data['Deslinde legal'];
          setDocuments(filteredDocuments);
        } else {
          setError('No se encontró el documento solicitado.');
        }
      } catch (err) {
        console.error('Error al obtener el Deslinde Legal:', err);
        setError('Hubo un problema al cargar el Deslinde Legal.');
      } finally {
        setLoading(false);
      }
    };

    fetchLegalDisclaimer();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-10 max-w-4xl mx-auto bg-gray-100 rounded-md shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-black">Deslinde Legal</h1>
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

export default DeslideL;
