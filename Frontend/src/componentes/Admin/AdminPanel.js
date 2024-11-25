import React, { useState, useContext } from 'react';
import DocumentList from './DocumentList';
import CreateDocument from './CreateDocument';
import UpdateDocument from './UpdateDocument';
import DeleteDocument from './DeleteDocument';
import { ThemeContext } from '../Style/Tema'; // Asegúrate de tener importado el ThemeContext

const AdminPanel = () => {
  const { darkMode } = useContext(ThemeContext); // Obtener el estado del modo oscuro
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);

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

      {/* Actualizar y Eliminar solo si hay un documento seleccionado */}
      {selectedDocumentId && (
        <div className="flex flex-col gap-8 w-full max-w-2xl">
          <section className={`p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
            <h3 className={`text-2xl font-semibold ${darkMode ? 'text-green-400' : 'text-green-700'} mb-4`}>Actualizar Documento</h3>
            <UpdateDocument documentId={selectedDocumentId} />
          </section>

          <section className={`p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
            <h3 className={`text-2xl font-semibold ${darkMode ? 'text-red-400' : 'text-red-700'} mb-4`}>Eliminar Documento</h3>
            <DeleteDocument documentId={selectedDocumentId} />
          </section>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
