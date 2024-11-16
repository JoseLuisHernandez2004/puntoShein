import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from './UserSidebar'; // Importar el Sidebar del usuario

const UserLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar: Utilizando el UserSidebar */}
      <UserSidebar />

      {/* Contenido principal */}
      <main className="flex-1 p-10 bg-white">
        <Outlet /> {/* Aquí se renderizarán las diferentes secciones del usuario */}
      </main>
    </div>
  );
};

export default UserLayout;
