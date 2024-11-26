import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';
import UserSidebar from './UserSidebar'; // Importar el Sidebar del usuario

const UserLayout = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Configurar el token en el encabezado de autorización para futuras solicitudes
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsLoggedIn(true);
    } else {
      // Redirigir al inicio de sesión si no hay token presente
      navigate('/login');
    }
  }, [navigate]);

  if (!isLoggedIn) {
    // Mostrar un mensaje de carga mientras se verifica el estado de autenticación
    return <p>Cargando...</p>;
  }

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
