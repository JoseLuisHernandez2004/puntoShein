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
        <h2 className="text-5xl font-bold text-gray-800 mt-32 mb-6">Punto Shein</h2>
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

        {/* New Section: Featured Categories */}
        <section className="mt-12 w-full max-w-6xl text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Explora nuestras categorías</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <img
                src="https://via.placeholder.com/150"
                alt="Ropa"
                className="w-full h-40 object-cover mb-4"
              />
              <h4 className="text-xl font-bold text-gray-700">Ropa</h4>
              <p className="text-gray-600">Descubre nuestra colección de ropa moderna y casual.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <img
                src="https://via.placeholder.com/150"
                alt="Accesorios"
                className="w-full h-40 object-cover mb-4"
              />
              <h4 className="text-xl font-bold text-gray-700">Accesorios</h4>
              <p className="text-gray-600">Complementa tu estilo con los mejores accesorios.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <img
                src="https://via.placeholder.com/150"
                alt="Ofertas"
                className="w-full h-40 object-cover mb-4"
              />
              <h4 className="text-xl font-bold text-gray-700">Ofertas</h4>
              <p className="text-gray-600">Aprovecha nuestras ofertas y promociones exclusivas.</p>
            </div>
          </div>
        </section>

        {/* New Section: Customer Testimonials */}
        <section className="mt-12 w-full max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Lo que nuestros clientes dicen</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">
                "¡La calidad de la ropa es impresionante! El envío fue rápido y el servicio al cliente es excepcional."
              </p>
              <h4 className="text-xl font-bold text-gray-700">- Ana López</h4>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">
                "¡Me encantan los accesorios que compré! Definitivamente volveré a comprar en Punto Shein."
              </p>
              <h4 className="text-xl font-bold text-gray-700">- Carlos Martínez</h4>
            </div>
          </div>
        </section>

        {/* New Section: Newsletter Signup */}
        <section className="mt-12 w-full max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Suscríbete a nuestro boletín</h3>
          <p className="text-gray-600 mb-4">Recibe ofertas exclusivas y las últimas novedades directamente en tu correo electrónico.</p>
          <form className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="w-full sm:w-2/3 py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700"
            >
              Suscribirse
            </button>
          </form>
        </section>

        {/* Footer Section */}
        <footer className="mt-16 w-full bg-gray-800 text-gray-300 py-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <h4 className="font-bold text-white mb-4">Punto Shein</h4>
              <p>La mejor tienda de ropa y accesorios en línea. ¡Visítanos y descubre lo último en moda!</p>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-white mb-4">Enlaces útiles</h4>
              <ul>
                <li><a href="#" className="hover:underline">Acerca de nosotros</a></li>
                <li><a href="#" className="hover:underline">Contacto</a></li>
                <li><a href="#" className="hover:underline">Política de privacidad</a></li>
              </ul>
            </div>
            <div className="text-center md:text-right">
              <h4 className="font-bold text-white mb-4">Síguenos</h4>
              <ul className="flex justify-center md:justify-end space-x-4">
                <li><a href="#" className="hover:underline">Facebook</a></li>
                <li><a href="#" className="hover:underline">Instagram</a></li>
                <li><a href="#" className="hover:underline">Twitter</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
