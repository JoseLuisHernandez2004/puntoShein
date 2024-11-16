// src/componentes/Admin/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaBox, FaClipboardList, FaFileAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-72 bg-white shadow-lg p-6">
      <nav className="mt-20">
        <ul className="space-y-4">
          <li>
            <Link to="/admin/dashboard" className="flex items-center p-3 rounded-lg hover:bg-blue-100 transition-all">
              <FaClipboardList className="mr-3 text-blue-600" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/profile" className="flex items-center p-3 rounded-lg hover:bg-blue-100 transition-all">
              <FaUsers className="mr-3 text-blue-600" /> Perfil
            </Link>
          </li>
          <li>
            <Link to="/admin/myUsers" className="flex items-center p-3 rounded-lg hover:bg-blue-100 transition-all">
              <FaUsers className="mr-3 text-blue-600" /> Usuarios
            </Link>
          </li>
          <li>
            <Link to="/admin/products" className="flex items-center p-3 rounded-lg hover:bg-blue-100 transition-all">
              <FaBox className="mr-3 text-blue-600" /> Productos
            </Link>
          </li>
          <li>
            <Link to="/admin/ListaPedidos" className="flex items-center p-3 rounded-lg hover:bg-blue-100 transition-all">
              <FaClipboardList className="mr-3 text-blue-600" /> Pedidos
            </Link>
          </li>
          <li>
            <Link to="/admin/documents" className="flex items-center p-3 rounded-lg hover:bg-blue-100 transition-all">
              <FaFileAlt className="mr-3 text-blue-600" /> Documentos
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
