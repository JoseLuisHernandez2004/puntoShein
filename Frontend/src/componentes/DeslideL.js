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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );

  return (
    <div className="p-10 md:p-20 max-w-4xl mx-auto bg-white text-black rounded-md shadow-xl">
      <h1 className="text-4xl font-bold mb-6 text-center border-b-2 border-black pb-2">
        Deslinde Legal
      </h1>
      {documents.length > 0 ? (
        <div className="space-y-6">
          {documents.map((doc) => (
            <div key={doc._id} className="bg-gray-100 p-6 rounded-lg shadow-md">
              <p className="text-lg leading-relaxed mb-4">{doc.content}</p>
              <p className="text-sm text-gray-600 italic">
                Vigente desde:{' '}
                {new Intl.DateTimeFormat('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }).format(new Date(doc.effectiveDate))}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700">No hay documentos disponibles.</p>
      )}
    </div>
  );
};

export default DeslideL;
