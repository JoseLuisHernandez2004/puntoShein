import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaBox, FaClipboardList, FaFileAlt, FaBuilding } from 'react-icons/fa';
import { ThemeContext } from '../Style/Tema'; // Asegúrate de importar el contexto correctamente

const Sidebar = () => {
  const { darkMode } = useContext(ThemeContext); // Obtener el estado del darkMode desde el contexto

  return (
    <aside className={`w-72 p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-lg`}>
      <nav className="mt-20">
        <ul className="space-y-4">
          <li>
            <Link to="/admin/dashboard" className={`flex items-center p-3 rounded-lg hover:bg-blue-100 transition-all ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-100'}`}>
              <FaClipboardList className={`mr-3 ${darkMode ? 'text-white' : 'text-blue-600'}`} /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/profile" className={`flex items-center p-3 rounded-lg hover:bg-blue-100 transition-all ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-100'}`}>
              <FaUsers className={`mr-3 ${darkMode ? 'text-white' : 'text-blue-600'}`} /> Perfil
            </Link>
          </li>
          <li>
            <Link to="/admin/myUsers" className={`flex items-center p-3 rounded-lg hover:bg-blue-100 transition-all ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-100'}`}>
              <FaUsers className={`mr-3 ${darkMode ? 'text-white' : 'text-blue-600'}`} /> Usuarios
            </Link>
          </li>
          <li>
            <Link to="/admin/products" className={`flex items-center p-3 rounded-lg hover:bg-blue-100 transition-all ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-100'}`}>
              <FaBox className={`mr-3 ${darkMode ? 'text-white' : 'text-blue-600'}`} /> Productos
            </Link>
          </li>
          <li>
            <Link to="/admin/ListaPedidos" className={`flex items-center p-3 rounded-lg hover:bg-blue-100 transition-all ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-100'}`}>
              <FaClipboardList className={`mr-3 ${darkMode ? 'text-white' : 'text-blue-600'}`} /> Pedidos
            </Link>
          </li>
          <li>
            <Link to="/admin/documents" className={`flex items-center p-3 rounded-lg hover:bg-blue-100 transition-all ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-100'}`}>
              <FaFileAlt className={`mr-3 ${darkMode ? 'text-white' : 'text-blue-600'}`} /> Documentos
            </Link>
          </li>
          <li>
            <Link to="/admin/company-profile" className={`flex items-center p-3 rounded-lg hover:bg-blue-100 transition-all ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-100'}`}>
              <FaBuilding className={`mr-3 ${darkMode ? 'text-white' : 'text-blue-600'}`} /> Configuración del Perfil de la Empresa
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
