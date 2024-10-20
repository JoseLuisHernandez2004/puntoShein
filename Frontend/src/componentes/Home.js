import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Home = ({ isLoggedIn }) => {
  const carouselItems = [
    {
      image: 'https://scontent.fver2-1.fna.fbcdn.net/v/t39.30808-6/369966618_645024687697497_2994804745531471255_n.png?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHnfnjOGwC1Jvd1N6OJHBt1jdMuayhn0O6N0y5rKGfQ7hSJFJ8KMDqB_ZrfOVI9fPudtLcJ8A5aUwLNh4JJOznB&_nc_ohc=w1dnmwzemYIQ7kNvgF25q2-&_nc_ht=scontent.fver2-1.fna&_nc_gid=AOG2jLMATQH5rqiuPb8XHIo&oh=00_AYDs00B6clRUZHuaYedBke9uyhQzaQY2MWFtaiqdKJ7xxA&oe=67195663',
      title: 'Nuevas tendencias',
      description: 'Explora la moda más reciente para esta temporada.'
    },
    {
      image: 'https://scontent.fver2-1.fna.fbcdn.net/v/t39.30808-6/457137391_848177607382203_6569964154041620214_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGxAgEujiP1vDY7oZ-RsZPrZ5TIm3RlbtNnlMibdGVu098xNdWjELIWxVav4IAPxlS1hE9KWY9UnBcGmHeMxa_Q&_nc_ohc=yrONhB3hlKMQ7kNvgHgFO5x&_nc_ht=scontent.fver2-1.fna&_nc_gid=Acd5PPdeXgOld_HvAtXm9uL&oh=00_AYCJD44TjIdQiotM3s3AL8CrKr2a30QAIBSfzZ6HnQIC2Q&oe=67194AB3',
      title: 'Accesorios elegantes',
      description: 'Complementa tu estilo con los mejores accesorios.'
    },
    {
      image: 'https://scontent.fver2-1.fna.fbcdn.net/v/t39.30808-6/450771021_820275723505725_4466161861117399194_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEZX0rIx-x5Lb22mkWLWw2I4NMQIfECPgfg0xAh8QI-B62vf3_Xz_3eZWID0q1RBP43CM78F0J298Dlid7U4nx9&_nc_ohc=hG416VY0YOIQ7kNvgHZ_J5x&_nc_ht=scontent.fver2-1.fna&_nc_gid=ABGCeOFPwoltLeYps6TtezN&oh=00_AYCfePpCGGfozu5uhEFsKKKqphq_HOgnMThmOuFBywvN-A&oe=67194A9B',
      title: 'Ofertas exclusivas',
      description: 'Aprovecha nuestras ofertas de fin de temporada.'
    }
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 2000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2
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
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      <main className="flex flex-col items-center justify-center flex-grow mt-16">
        <h2 className="text-5xl font-bold text-gray-800 mb-6">Punto Shein</h2>
        <p className="text-lg text-gray-600 mb-10 text-center">
          La mejor tienda de ropa y accesorios en línea. ¡Descubre la moda más reciente con nosotros!
        </p>

        <div className="w-full max-w-4xl">
          <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000} showDots={true}>
            {carouselItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center p-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover rounded-lg shadow-lg mb-4"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-center">{item.description}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </main>
    </div>
  );
};

export default Home;
