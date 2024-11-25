// src/componentes/Admin/AdminDashboard.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../Style/Tema'; // Asegúrate de que ThemeContext esté importado correctamente

const AdminDashboard = () => {
  const { darkMode } = useContext(ThemeContext); // Usar el contexto para obtener el estado de darkMode

  return (
    <div className={`mt-2 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Bienvenido al Panel de Administración</h1>
      <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Aquí puedes gestionar usuarios, productos, pedidos, documentos regulatorios y más.
      </p>

      {/* Cuadrícula de tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {/* Tarjeta para Usuarios */}
        <div className={`p-6 rounded-xl shadow-2xl transition-all duration-300 ${darkMode ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white' : 'bg-gradient-to-r from-gray-100 to-gray-300 text-black'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Usuarios</h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gestión de usuarios registrados en la plataforma.</p>
          <Link to="/admin/myUsers" className={`mt-4 inline-block ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:text-blue-800`}>
            Ver Detalles
          </Link>
        </div>

        {/* Tarjeta para Productos */}
        <div className={`p-6 rounded-xl shadow-2xl transition-all duration-300 ${darkMode ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white' : 'bg-gradient-to-r from-gray-100 to-gray-300 text-black'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Productos</h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gestión de productos en la plataforma.</p>
          <Link to="/admin/products" className={`mt-4 inline-block ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:text-blue-800`}>
            Ver Detalles
          </Link>
        </div>

        {/* Tarjeta para Pedidos */}
        <div className={`p-6 rounded-xl shadow-2xl transition-all duration-300 ${darkMode ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white' : 'bg-gradient-to-r from-gray-100 to-gray-300 text-black'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Pedidos</h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gestión de pedidos realizados en la plataforma.</p>
          <Link to="/admin/ListaPedidos" className={`mt-4 inline-block ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:text-blue-800`}>
            Ver Detalles
          </Link>
        </div>

        {/* Tarjeta para Documentos */}
        <div className={`p-6 rounded-xl shadow-2xl transition-all duration-300 ${darkMode ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white' : 'bg-gradient-to-r from-gray-100 to-gray-300 text-black'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Documentos Regulatorios</h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gestión de los documentos legales y regulatorios.</p>
          <Link to="/admin/documents" className={`mt-4 inline-block ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:text-blue-800`}>
            Ver Detalles
          </Link>
        </div>

        {/* Tarjeta para Perfil de Empresa */}
        <div className={`p-6 rounded-xl shadow-2xl transition-all duration-300 ${darkMode ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white' : 'bg-gradient-to-r from-gray-100 to-gray-300 text-black'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Perfil de Empresa</h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Visualiza y edita el perfil de la empresa.</p>
          <Link to="/admin/company-profile" className={`mt-4 inline-block ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:text-blue-800`}>
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
