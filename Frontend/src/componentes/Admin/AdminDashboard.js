// src/componentes/Admin/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom'; // Importar Link para la navegación interna

const AdminDashboard = () => {
  return (
    <div className="mt-20"> {/* Añadido un margen superior para bajar el contenido */}
      <h1 className="text-4xl font-bold text-gray-800">Bienvenido al Panel de Administración</h1>
      <p className="mt-4 text-gray-600">Aquí puedes gestionar usuarios, productos, pedidos, documentos regulatorios y más.</p>
      
      {/* Ejemplo de tarjetas para mostrar contenido */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
          <p className="text-gray-600">Gestión de usuarios registrados en la plataforma.</p>
          <Link to="/admin/myUsers" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
            Ver Detalles
          </Link>
        </div>
        {/* Otros elementos como "Productos", "Pedidos", etc. */}
      </div>
    </div>
  );
};

export default AdminDashboard;
