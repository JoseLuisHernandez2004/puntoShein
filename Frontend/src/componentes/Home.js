import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Home = () => {
  const carouselItems = [
    {
      image: 'https://scontent.fver2-1.fna.fbcdn.net/v/t39.30808-6/369966618_645024687697497_2994804745531471255_n.png?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHnfnjOGwC1Jvd1N6OJHBt1jdMuayhn0O6N0y5rKGfQ7hSJFJ8KMDqB_ZrfOVI9fPudtLcJ8A5aUwLNh4JJOznB&_nc_ohc=JB0zK9ZHLcgQ7kNvgGKaZT_&_nc_ht=scontent.fver2-1.fna&_nc_gid=AC-wdh4nZNy7wlUiqRf7acR&oh=00_AYApO446Yl7Fdyf2eK_bq63l_d5I09xuTBXqgiaYsqDqQA&oe=671BF963',
      title: 'Nueva Colección',
      description: 'Descubre las últimas tendencias en moda para esta temporada.'
    },
    {
      image: 'https://scontent.fver2-1.fna.fbcdn.net/v/t39.30808-6/457256898_848177587382205_3155642889022591445_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHOSzUBezNIaYfIcQNwgh2MyngOHxdDqDvKeA4fF0OoO-ZNF8MZeH6g0T83uzoH2qd12FcySL6R1Qe_2iSCxMno&_nc_ohc=sQU8wtm3MjgQ7kNvgHZiWt0&_nc_ht=scontent.fver2-1.fna&_nc_gid=A7im0i4w9g35Q0ZVxsiJ-TQ&oh=00_AYDWJiEym3ulHjy-QGQBCXvBaTHprwt1E78d0e6z01XfsA&oe=671BFB90',
      title: 'Accesorios Elegantes',
      description: 'Complementa tu estilo con los mejores accesorios.'
    },
    {
      image: 'https://scontent.fver2-1.fna.fbcdn.net/v/t39.30808-6/445478422_793579999508631_3673927731190996348_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFDa8o18s_N4ZJMScQurJ0o-DwHi3FMhCf4PAeLcUyEJ_CyDOFjzf_bgnJSD8e_-eXJyaqDZQwl8vhs_L0Kcrtg&_nc_ohc=Jn7HyoHXNgMQ7kNvgElcg2I&_nc_ht=scontent.fver2-1.fna&_nc_gid=AO049yfvG8HhiAc5ICjZUAO&oh=00_AYDdl3OzBOvtejQM4FUBZElW0zeD1zogANHH5GyETl1p2g&oe=671BD469',
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
