// src/componentes/Admin/DeleteDocument.js
import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MIS_URL } from '../MiVariable';

const DeleteDocument = ({ documentId }) => {
  const handleDelete = async () => {
    if (!documentId) {
      Swal.fire({
        title: 'Error',
        text: 'Selecciona un documento para eliminar.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    // Confirmación de eliminación
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el documento de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        // Solicitud al backend para eliminar el documento
        await axios.delete(`${MIS_URL}/api/documents/${documentId}`, { withCredentials: true });

        // Alerta de éxito
        Swal.fire({
          title: 'Eliminado',
          text: 'El documento fue eliminado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      } catch (error) {
        console.error("Error al eliminar el documento:", error);

        // Manejo de errores con alerta
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al eliminar el documento. Intenta de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Eliminar Documento</h2>
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Eliminar Documento
      </button>
    </div>
  );
};

export default DeleteDocument;
