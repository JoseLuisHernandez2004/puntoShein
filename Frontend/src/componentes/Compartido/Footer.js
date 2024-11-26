// C:\xampp\htdocs\puntoShein\Frontend\src\componentes\Footer.js

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white text-center py-4 mt-auto">
      <div>
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
    </footer>
  );
};

export default Footer;
