import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingBag, FaClipboardList } from 'react-icons/fa';
import { ThemeContext } from '../Style/Tema'; // Importar el contexto de tema

const UserSidebar = () => {
  const { darkMode } = useContext(ThemeContext); // Obtener el estado de darkMode

  return (
    <aside className={`w-72 p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-lg`}>
      <nav className="mt-20">
        <ul className="space-y-4">
          <li>
            <Link
              to="/user/dashboard"
              className={`flex items-center p-3 rounded-lg hover:bg-blue-100 transition-all ${darkMode ? 'hover:bg-blue-700' : ''}`}
            >
              <FaClipboardList className="mr-3 text-blue-600" /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/user/profile"
              className={`flex items-center p-3 rounded-lg hover:bg-blue-100 transition-all ${darkMode ? 'hover:bg-blue-700' : ''}`}
            >
              <FaUser className="mr-3 text-blue-600" /> Mi Perfil
            </Link>
          </li>
          <li>
            <Link
              to="/user/orders"
              className={`flex items-center p-3 rounded-lg hover:bg-blue-100 transition-all ${darkMode ? 'hover:bg-blue-700' : ''}`}
            >
              <FaClipboardList className="mr-3 text-blue-600" /> Pedidos
            </Link>
          </li>
          <li>
            <Link
              to="/user/products"
              className={`flex items-center p-3 rounded-lg hover:bg-blue-100 transition-all ${darkMode ? 'hover:bg-blue-700' : ''}`}
            >
              <FaShoppingBag className="mr-3 text-blue-600" /> Productos
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default UserSidebar;
