import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Importar Link para navegación interna
import { ThemeContext } from '../Style/Tema'; // Asegúrate de que ThemeContext esté correctamente importado

const UserDashboard = () => {
  const { darkMode } = useContext(ThemeContext); // Obtener el valor del tema desde el contexto

  return (
    <div className={`mt-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} p-8`}>
      <div className="text-center">
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Bienvenido al Panel de Usuario</h1>
        <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Aquí puedes ver tu información, pedidos, y más.</p>
      </div>

      {/* Tarjetas de contenido */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <div className={`bg-black p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Mi Perfil</h2>
          <p className={`text-gray-600 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ver y actualizar la información de tu perfil.</p>
          <Link to="/user/profile" className={`mt-4 inline-block ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:text-blue-800`}>
            Ver Detalles
          </Link>
        </div>

        <div className={`bg-black p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Mis Pedidos</h2>
          <p className={`text-gray-600 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Consulta el historial de tus pedidos.</p>
          <Link to="/user/orders" className={`mt-4 inline-block ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:text-blue-800`}>
            Ver Detalles
          </Link>
        </div>

        <div className={`bg-black p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Mis Productos</h2>
          <p className={`text-gray-600 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Explora los productos que has agregado.</p>
          <Link to="/user/products" className={`mt-4 inline-block ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:text-blue-800`}>
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
