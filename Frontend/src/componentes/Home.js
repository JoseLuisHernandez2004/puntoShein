import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import axios from 'axios';
import 'react-multi-carousel/lib/styles.css';
import { MIS_URL } from './MiVariable'; // Asegúrate de que esta variable apunte al backend

const Home = () => {
  const [slogan, setSlogan] = useState(''); // Estado para el slogan
  const [loading, setLoading] = useState(true); // Estado para la carga

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const response = await axios.get(`${MIS_URL}/api/company-profile/public`);
        if (response.data?.slogan) {
          setSlogan(response.data.slogan);
        }
      } catch (error) {
        console.error('Error al obtener el slogan de la empresa:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyProfile();
  }, []);

  const carouselItems = [
    {
      image: 'https://res.cloudinary.com/dgbs7sg9j/image/upload/v1733295790/moda3_ui7y2h.jpg',
      title: 'Nueva Colección',
      description: 'Descubre las últimas tendencias en moda para esta temporada.',
    },
    {
      image:'https://res.cloudinary.com/dgbs7sg9j/image/upload/v1733295506/moda1_qwtxdu.png',
      title: 'Accesorios Elegantes',
      description: 'Complementa tu estilo con los mejores accesorios.',
    },
    {
      image: 'https://res.cloudinary.com/dgbs7sg9j/image/upload/v1733295504/moda2_ldci3y.jpg',
      title: 'Ofertas Exclusivas',
      description: 'Aprovecha nuestras ofertas de fin de temporada.',
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 2000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col items-center">
      {/* Carrusel */}
      <div className="w-full max-w-screen-xl mb-10 mt-20">
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={4000}
          showDots
        >
          {carouselItems.map((item, index) => (
            <div key={index} className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-72 md:h-96 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end items-center p-4">
                <h3 className="text-2xl md:text-4xl font-bold text-white">{item.title}</h3>
                <p className="text-lg md:text-xl text-white">{item.description}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Slogan Real */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-700 dark:text-gray-100">
          "{slogan || 'Descubre nuestro estilo único'}"
        </h2>
      </div>

      {/* Ofertas Destacadas */}
      <div className="w-full max-w-screen-xl px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-700 dark:text-gray-100">
          Ofertas Destacadas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {/* Producto 1 */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1733268787/zapato_zy5agq.png"
              alt="Tenis Bad Bunny"
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Tenis Bad Bunny
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ¡Eleva tu estilo con estos exclusivos tenis de edición limitada!
            </p>
            <a href="/productos">
              <button className="w-full bg-green-600 dark:bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-colors">
                Comprar Ahora
              </button>
            </a>
          </div>

          {/* Producto 2 */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1733303531/Blusa_vg6rm0.jpg"
              alt="Blusa elegante"
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Blusa Elegante
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Perfecta para ocasiones formales o una salida especial.
            </p>
            <a href="/productos2">
              <button className="w-full bg-green-600 dark:bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-colors">
                Comprar Ahora
              </button>
            </a>
          </div>

          {/* Producto 3 */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1733295504/vestido_elegante.jpg"
              alt="Vestido Elegante"
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Vestido Elegante
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Ideal para eventos especiales. ¡Destaca con este estilo único!
            </p>
            <a href="/productos">
              <button className="w-full bg-green-600 dark:bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-colors">
                Comprar Ahora
              </button>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
