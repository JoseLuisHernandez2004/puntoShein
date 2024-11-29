import React, { useState, useContext } from 'react';
import DocumentList from './DocumentList';
import CreateDocument from './CreateDocument';
import UpdateDocument from './UpdateDocument';
import { ThemeContext } from '../Style/Tema';

const AdminPanel = () => {
  const { darkMode } = useContext(ThemeContext);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null); // Mantener el documento seleccionado

  // Función para manejar la selección de un documento
  const handleDocumentSelect = (id) => {
    setSelectedDocumentId(id);
  };

  return (
    <div className={`p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen flex flex-col items-center`}>
      <div className="mt-16 mb-12 text-center">
        <h1 className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}>Gestión de Documentos Regulatorios</h1>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Administra y actualiza los documentos regulatorios vigentes y su historial</p>
      </div>

      {/* Mostrar el formulario de actualización si hay un documento seleccionado */}
      {selectedDocumentId ? (
        <UpdateDocument documentId={selectedDocumentId} onCancel={() => setSelectedDocumentId(null)} />
      ) : (
        <>
          {/* Crear Nuevo Documento */}
          <section className={`mb-12 p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-300'} w-full max-w-2xl`}>
            <h2 className={`text-3xl font-semibold mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>Crear Nuevo Documento</h2>
            <CreateDocument />
          </section>

          {/* Documentos Actuales */}
          <section className={`mb-12 p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-300'} w-full max-w-2xl`}>
            <h2 className={`text-3xl font-semibold mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>Documentos Actuales</h2>
            <DocumentList onSelectDocument={handleDocumentSelect} />
          </section>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
