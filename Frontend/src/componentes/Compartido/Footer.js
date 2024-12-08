import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Importación de íconos
import { MIS_URL } from '../MiVariable'; // URL de la API

const Footer = () => {
  const [socialMedia, setSocialMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const response = await axios.get(`${MIS_URL}/api/company-profile/public`);
        if (response.data && response.data.socialMedia) {
          setSocialMedia(response.data.socialMedia);
        }
      } catch (error) {
        console.error('Error al cargar redes sociales:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialMedia();
  }, []);

  return (
    <footer className="w-full bg-gray-800 text-white py-6 mt-auto">
      <div className="flex flex-col items-center">
        {/* Contenedor principal en una línea horizontal */}
        <div className="flex flex-wrap justify-between items-center w-full max-w-6xl px-4">

           {/* Información y enlaces legales */}
           <div className="text-center">
            <p>&copy; {new Date().getFullYear()} Punto Shein. Todos los derechos reservados.</p>
            <p>
              <Link to="/terms" className="text-blue-400 hover:underline">
                Términos y Condiciones
              </Link>{" "}
              |{" "}
              <Link to="/privacy" className="text-blue-400 hover:underline">
                Política de Privacidad
              </Link>{" "}
              |{" "}
              <Link to="/legal" className="text-blue-400 hover:underline">
                Deslinde Legal
              </Link>
            </p>
          </div>
          {/* Redes Sociales */}
          <div className="flex gap-4 items-center">
            <h3 className="text-lg font-bold">Síguenos:</h3>
            {loading ? (
              <p className="text-gray-400">Cargando...</p>
            ) : socialMedia ? (
              <div className="flex gap-4">
                {socialMedia.facebook && (
                  <a
                    href={socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-blue-600 hover:text-blue-800 transition duration-300"
                  >
                    <FaFacebook className="text-2xl" />
                  </a>
                )}
                {socialMedia.twitter && (
                  <a
                    href={socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="text-blue-400 hover:text-blue-600 transition duration-300"
                  >
                    <FaTwitter className="text-2xl" />
                  </a>
                )}
                {socialMedia.instagram && (
                  <a
                    href={socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-pink-600 hover:text-pink-800 transition duration-300"
                  >
                    <FaInstagram className="text-2xl" />
                  </a>
                )}
                {socialMedia.linkedin && (
                  <a
                    href={socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-blue-700 hover:text-blue-900 transition duration-300"
                  >
                    <FaLinkedin className="text-2xl" />
                  </a>
                )}
              </div>
            ) : (
              <p className="text-gray-400">No hay redes sociales disponibles.</p>
            )}
          </div>
  
         
        </div>
      </div>
    </footer>
  );
  
};

export default Footer;
