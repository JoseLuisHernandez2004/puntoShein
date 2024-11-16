// src/componentes/User/UserSidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingBag, FaClipboardList } from 'react-icons/fa';

const UserSidebar = () => {
  return (
    <aside className="w-72 bg-white shadow-lg p-6">
      <nav className="mt-20">
        <ul className="space-y-4">
          <li>
            <Link to="/user/dashboard" className="flex items-center p-3 rounded-lg hover:bg-blue-100 transition-all">
              <FaClipboardList className="mr-3 text-blue-600" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/user/profile" className="flex items-center p-3 rounded-lg hover:bg-blue-100 transition-all">
              <FaUser className="mr-3 text-blue-600" /> Mi Perfil
            </Link>
          </li>
          <li>
            <Link to="/user/orders" className="flex items-center p-3 rounded-lg hover:bg-blue-100 transition-all">
              <FaClipboardList className="mr-3 text-blue-600" /> Pedidos
            </Link>
          </li>
          <li>
            <Link to="/user/products" className="flex items-center p-3 rounded-lg hover:bg-blue-100 transition-all">
              <FaShoppingBag className="mr-3 text-blue-600" /> Productos
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default UserSidebar;
