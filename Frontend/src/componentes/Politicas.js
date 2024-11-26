// C:\xampp\htdocs\puntoShein\Frontend\src\componentes\Politicas.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MIS_URL } from './MiVariable'; // URL de tu backend

const Politicas = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        // Petición al backend para obtener los tres últimos documentos vigentes
        const response = await axios.get(`${MIS_URL}/api/documents/last-three`, {
          withCredentials: true,
        });

        // Filtrar los documentos para obtener solo "Política de privacidad"
        if (response.data) {
          const filteredDocuments = response.data['Política de privacidad'];
          setDocuments(filteredDocuments);
        } else {
          setError('No se encontraron documentos de Política de Privacidad.');
        }
      } catch (err) {
        console.error('Error al obtener la Política de Privacidad:', err);
        setError('Hubo un problema al cargar la Política de Privacidad.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-10 max-w-4xl mx-auto bg-gray-100 rounded-md shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-black">Política de Privacidad</h1>
      {documents.length > 0 ? (
        documents.map((doc) => (
          <div key={doc._id} className="mb-8">
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

export default Politicas;
