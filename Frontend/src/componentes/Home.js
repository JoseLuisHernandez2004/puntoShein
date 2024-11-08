import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Home = () => {
  const carouselItems = [
    {
      image: 'https://scontent.fmex20-1.fna.fbcdn.net/v/t39.30808-6/463974262_886462293553734_8739716683164573374_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFT6p4i9auSnTU13l6IMgwtZ58vAzW4pOVnny8DNbik5e1MTcviFBbCU_ipXU8_IXOLNP1r-iprID1KbCNyUPGo&_nc_ohc=IS2jEzeCkt0Q7kNvgGk5PLY&_nc_zt=23&_nc_ht=scontent.fmex20-1.fna&_nc_gid=Ab-UfW7p1B92OyDfdNY6YoL&oh=00_AYDKb9lldQHj5h7-D3_lPGgr-BvkcKxD6OXYVSOAMfR3_Q&oe=6731C8C5',
      title: 'Nueva Colección',
      description: 'Descubre las últimas tendencias en moda para esta temporada.'
    },
    {
      image: 'https://scontent.fmex20-1.fna.fbcdn.net/v/t39.30808-6/457137391_848177607382203_6569964154041620214_n.jpg?stp=dst-jpg_s600x600&_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGxAgEujiP1vDY7oZ-RsZPrZ5TIm3RlbtNnlMibdGVu098xNdWjELIWxVav4IAPxlS1hE9KWY9UnBcGmHeMxa_Q&_nc_ohc=OtgDbvFC6DkQ7kNvgFohFzv&_nc_zt=23&_nc_ht=scontent.fmex20-1.fna&_nc_gid=Axe1IWf933J0-MXJ5AaJPT8&oh=00_AYDAIPSux467M7WNljcd_TvOBFiXPraIdF8CupFKoQZaVA&oe=6731E6B3',
      title: 'Accesorios Elegantes',
      description: 'Complementa tu estilo con los mejores accesorios.'
    },
    {
      image: 'https://scontent.fmex20-1.fna.fbcdn.net/v/t39.30808-6/369966618_645024687697497_2994804745531471255_n.png?stp=dst-png_s960x960&_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHnfnjOGwC1Jvd1N6OJHBt1jdMuayhn0O6N0y5rKGfQ7hSJFJ8KMDqB_ZrfOVI9fPudtLcJ8A5aUwLNh4JJOznB&_nc_ohc=XiViFnk5XTkQ7kNvgFhwQsk&_nc_zt=23&_nc_ht=scontent.fmex20-1.fna&_nc_gid=APidrXyfL-peTHNx_gujyiE&oh=00_AYD4wNy-hIWFc_AgpR8-YCljFSwONTyOXmakySV5FZt55w&oe=6731BA23',
      title: 'Ofertas Exclusivas',
      description: 'Aprovecha nuestras ofertas de fin de temporada.'
    }
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 2000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center mt-20">
      {/* Fullscreen Carousel */}
      <div className="w-full max-w-screen-xl mb-10">
        <Carousel 
          responsive={responsive} 
          infinite={true} 
          autoPlay={true} 
          autoPlaySpeed={4000} 
          showDots={true}
        >
          {carouselItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center relative">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-72 md:h-96 object-cover rounded-lg"
              />
              <div className="absolute text-center bottom-8 text-white">
                <h3 className="text-2xl md:text-4xl font-bold">{item.title}</h3>
                <p className="text-lg md:text-xl">{item.description}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Featured Section */}
      <div className="w-full max-w-screen-xl px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Ofertas Destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Example product feature */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
            <img 
              src="https://via.placeholder.com/400x400?text=Producto+1" 
              alt="Producto 1" 
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-bold mb-2">Producto 1</h3>
            <p className="text-gray-600 mb-4">Descripción corta del producto.</p>
            <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
              Comprar Ahora
            </button>
          </div>
          {/* Puedes repetir el bloque anterior para agregar más productos destacados */}
        </div>
      </div>
    </div>
  );
};

export default Home;
