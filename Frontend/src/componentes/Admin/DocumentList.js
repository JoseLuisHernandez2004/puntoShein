import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MIS_URL } from '../MiVariable';
import { ThemeContext } from '../Style/Tema';
import { FaCheckCircle, FaTimesCircle, FaFileAlt } from 'react-icons/fa';

const DocumentList = ({ onSelectDocument }) => {
  const { darkMode } = useContext(ThemeContext);

  const [selectedTitle, setSelectedTitle] = useState('');
  const [currentDocument, setCurrentDocument] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener la versión vigente del documento seleccionado
  useEffect(() => {
    const fetchCurrentDocument = async (title) => {
      if (!title) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${MIS_URL}/api/documents/current?title=${title}`,
          { withCredentials: true }
        );
        setCurrentDocument(response.data);
      } catch (err) {
        if (err.response?.status === 404) {
          console.warn('No hay un documento vigente.');
          setCurrentDocument(null);
        } else {
          console.error('Error al obtener el documento vigente:', err);
          setError('Hubo un problema al cargar el documento vigente.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentDocument(selectedTitle);
  }, [selectedTitle]);

  // Obtener el historial de versiones del documento seleccionado
  useEffect(() => {
    const fetchDocumentHistory = async (title) => {
      if (!title) return;

      setError(null);

      try {
        const response = await axios.get(
          `${MIS_URL}/api/documents/history/${title}`,
          { withCredentials: true }
        );
        // Guardar el historial en orden inverso
        setHistory(response.data.reverse());
      } catch (err) {
        console.error('Error al obtener el historial:', err);
        setError('Hubo un problema al cargar el historial.');
      }
    };

    if (selectedTitle) {
      fetchDocumentHistory(selectedTitle);
    }
  }, [selectedTitle]);

  const handleTitleChange = (e) => {
    setSelectedTitle(e.target.value);
    setCurrentDocument(null);
    setHistory([]);
  };

  const handleUpdate = (documentId) => {
    onSelectDocument(documentId);
  };

  const handleDelete = async (documentId) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        await axios.delete(`${MIS_URL}/api/documents/${documentId}`, {
          withCredentials: true,
        });
        Swal.fire({
          title: 'Eliminado',
          text: 'El documento ha sido eliminado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        setSelectedTitle('');
        setCurrentDocument(null);
        setHistory([]);
      }
    } catch (error) {
      console.error('Error al eliminar el documento:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al eliminar el documento. Inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-black'}`}>
      <div className="flex items-center mb-6">
        <FaFileAlt className={`text-4xl mr-3 ${darkMode ? 'text-yellow-400' : 'text-blue-600'}`} />
        <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Seleccionar Documento Regulador
        </h2>
      </div>
      <select
        value={selectedTitle}
        onChange={handleTitleChange}
        className={`p-3 w-full border rounded mb-4 focus:outline-none focus:ring-2 ${
          darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-yellow-500' : 'bg-white border-gray-300 text-black focus:ring-blue-500'
        }`}
      >
        <option value="">Seleccione un documento</option>
        <option value="Política de privacidad">Política de privacidad</option>
        <option value="Términos y condiciones">Términos y condiciones</option>
        <option value="Deslinde legal">Deslinde legal</option>
      </select>

      {currentDocument ? (
        <>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Documento Vigente</h2>
          <div className={`p-6 rounded-lg shadow-inner ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {currentDocument.title}
            </h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{currentDocument.content}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Versión: {currentDocument.version}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Fecha de creación: {new Date(currentDocument.createdAt).toLocaleDateString()}
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Última actualización: {new Date(currentDocument.updatedAt).toLocaleDateString()}
            </p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleUpdate(currentDocument._id)}
                className={`px-4 py-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded`}
              >
                Actualizar
              </button>
              <button
                onClick={() => handleDelete(currentDocument._id)}
                className={`px-4 py-2 ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white rounded`}
              >
                Eliminar
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>No hay un documento vigente seleccionado o disponible.</p>
      )}

      <h2 className={`text-2xl font-bold mt-8 mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Historial de versiones</h2>
      <ul className="space-y-4">
        {history.length > 0 ? (
          history.map((doc) => (
            <li key={doc._id} className={`p-4 rounded-lg shadow-inner ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex items-center mb-2">
                {doc.status === 'vigente' ? (
                  <FaCheckCircle className="text-green-500 mr-2" />
                ) : (
                  <FaTimesCircle className="text-red-500 mr-2" />
                )}
                <strong className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>Versión {doc.version}:</strong>
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{doc.content}</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Fecha de creación: {new Date(doc.createdAt).toLocaleDateString()}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Fecha de actualización: {new Date(doc.updatedAt).toLocaleDateString()}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Estado: {doc.status}</p>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleUpdate(doc._id)}
                  className={`px-4 py-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded`}
                >
                  Actualizar
                </button>
                <button
                  onClick={() => handleDelete(doc._id)}
                  className={`px-4 py-2 ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white rounded`}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No hay historial disponible para este documento.</p>
        )}
      </ul>
    </div>
  );
};

export default DocumentList;
