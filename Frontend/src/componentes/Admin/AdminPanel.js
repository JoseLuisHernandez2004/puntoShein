// src/componentes/Admin/AdminPanel.js
import React from 'react';
import DocumentList from './DocumentList';
import CreateDocument from './CreateDocument';
import UpdateDocument from './UpdateDocument';
import DeleteDocument from './DeleteDocument';

const AdminPanel = () => {
  return (
    <div>
      <h1>Panel de Administrador</h1>
      <CreateDocument />
      <DocumentList />
      {/* Pasa el ID del documento vigente al componente de actualización y eliminación */}
      <UpdateDocument documentId="ID_DEL_DOCUMENTO_VIGENTE" />
      <DeleteDocument documentId="ID_DEL_DOCUMENTO_VIGENTE" />
    </div>
  );
};

export default AdminPanel;
