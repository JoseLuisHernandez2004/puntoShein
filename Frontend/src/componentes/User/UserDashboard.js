import React from 'react';
import { Link } from 'react-router-dom'; // Importar Link para navegación interna

const UserDashboard = () => {
  return (
    <div className="mt-20"> {/* Añadido un margen superior para bajar el contenido */}
      <h1 className="text-4xl font-bold text-gray-800">Bienvenido al Panel de Usuario</h1>
      <p className="mt-4 text-gray-600">Aquí puedes ver tu información, pedidos, y más.</p>

      {/* Ejemplo de tarjetas para mostrar contenido */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
          <p className="text-gray-600">Ver y actualizar la información de tu perfil.</p>
          <Link to="/user/profile" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
            Ver Detalles
          </Link>
        </div>
        {/* Otros elementos como "Pedidos", "Productos", etc. */}
      </div>
    </div>
  );
};

export default UserDashboard;
