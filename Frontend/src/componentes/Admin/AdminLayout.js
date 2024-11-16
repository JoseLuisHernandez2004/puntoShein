// src/componentes/Admin/AdminLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Asegúrate de que el Sidebar esté bien separado

const AdminLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar: Este panel de navegación lateral se mantiene constante */}
      <Sidebar />

      {/* Contenido principal */}
      <main className="flex-1 p-10">
        <Outlet /> {/* Aquí se renderizarán las diferentes secciones del administrador */}
      </main>
    </div>
  );
};

export default AdminLayout;
