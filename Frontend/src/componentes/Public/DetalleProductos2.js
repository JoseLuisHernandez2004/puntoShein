import React, { useContext, useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { ThemeContext } from '../Style/Tema';

const DetalleProductos = () => {
  const product = {
    name: 'Blusa Elegante',
    image: 'https://res.cloudinary.com/dgbs7sg9j/image/upload/v1733303531/Blusa_vg6rm0.jpg',
    description: 'Una blusa sofisticada y cómoda, ideal para eventos especiales o para el día a día.',
    price: '249.99',
    category: 'Ropa',
    stock: 8,
    qrCode: 'https://res.cloudinary.com/dgbs7sg9j/image/upload/v1733295391/QRTenis_z1o7l5.png',
  };

  const { darkMode } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={`flex justify-center items-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`max-w-5xl w-full p-10 rounded-lg shadow-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        {/* Header */}
        <div className="border-b pb-6 mb-6">
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {product.name}
          </h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Categoría: {product.category}
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Image Section */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-lg shadow-lg object-cover w-full max-h-96 hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 space-y-6">
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {product.description}
            </p>
            <p className="text-3xl font-semibold text-blue-600">${product.price}</p>
            <p className={`text-lg ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `En stock: ${product.stock} unidades` : 'Agotado'}
            </p>

            {/* QR Code Section */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Explora en Realidad Aumentada</h2>
              <p className="text-sm text-gray-600 mb-4">
              ¡Descubre cada detalle como si lo tuvieras en tus manos! Haz clic en el código QR para ampliarlo.
              </p>
              <img
                src={product.qrCode}
                alt="Código QR"
                className="w-24 h-24 rounded-md shadow-md cursor-pointer hover:scale-110 transition-transform duration-300"
                onClick={() => setIsModalOpen(true)}
              />
            </div>


            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                onClick={() => console.log('Añadido al carrito')}
              >
                <FaCartPlus />
                Añadir al Carrito
              </button>
              <button
                className={`px-6 py-3 rounded-lg shadow-md ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} transition duration-300`}
                onClick={() => console.log('Ir al pago')}
              >
                Comprar Ahora
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full flex flex-col items-center">
            <h2 className="text-lg font-bold mb-4 text-gray-800 text-center">Código QR del Producto</h2>
            <img
              src={product.qrCode}
              alt="Código QR ampliado"
              className="w-150 h-150 rounded-md shadow-md mb-6"
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={() => setIsModalOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetalleProductos;
