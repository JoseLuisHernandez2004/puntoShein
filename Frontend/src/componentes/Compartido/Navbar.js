import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdMenu, MdClose, MdArrowDropDown, MdDarkMode, MdLightMode } from 'react-icons/md';
import { MIS_URL } from '../MiVariable'; // Asegúrate de definir correctamente MIS_URL con la URL de tu backend
import { ThemeContext } from '../Style/Tema'; // Importa el contexto

const Navbar = ({ isLoggedIn, userRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [companyLogo, setCompanyLogo] = useState('');
  const [companyName, setCompanyName] = useState(''); 

  // Obtén el estado y la función toggleDarkMode desde el ThemeContext
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  // Obtener el logotipo de la empresa
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        // Utilizar siempre el endpoint público para obtener la información general de la empresa
        const response = await axios.get(`${MIS_URL}/api/company-profile/public`);
        
        if (response.data?.logo) {
          setCompanyLogo(response.data.logo); // logo
          setCompanyName(response.data.pageTitle); // Obtén el nombre de la empresa
        }
      } catch (error) {
        console.error('Error al cargar la información pública de la empresa:', error);
      }
    };

    fetchCompanyInfo();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-lg fixed top-0 z-50 transition-all duration-300 ease-in-out">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo y Nombre de la Empresa */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center">
            {companyLogo ? (
              <img
                src={companyLogo}
                alt="Punto Shein Logo"
                className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover transition-transform duration-300 hover:scale-110"
              />
            ) : (
              <div className="h-14 w-14 md:h-16 md:w-16 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500">Logo</span>
              </div>
            )}
          </Link>
          <span className="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-200">
            {companyName || 'Cargando...'}
          </span>
        </div>

        {/* Botón para cambiar entre oscuro y claro */}
        <button
          onClick={toggleDarkMode} // Usar la función del contexto para alternar el tema
          className="text-gray-700 dark:text-white transition-transform duration-300 hover:scale-110"
        >
          {darkMode ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/perfilEmpresaPublico"
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
          >
            Sobre la Empresa
          </Link>
          <div className="relative">
            <button
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center space-x-1 transition-colors duration-300"
              onClick={toggleDropdown}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen ? 'true' : 'false'}
            >
              <span>Servicios</span>
              <MdArrowDropDown size={20} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-10 transition-opacity duration-300 opacity-100">
                <Link
                  to="/about"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  Quiénes Somos
                </Link>
                <Link
                  to="/products"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  Productos
                </Link>
                <Link
                  to="/contact"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  Contacto
                </Link>
              </div>
            )}
          </div>

          {/* Authentication Links */}
          {isLoggedIn ? (
            <>
              <Link
                to={userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard'}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
              >
                Dashboard
              </Link>
              <Link
                to="/logout"
                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600 transition-colors duration-300"
              >
                Cerrar sesión
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="bg-green-600 dark:bg-green-700 text-white py-2 px-4 rounded hover:bg-green-700 dark:hover:bg-green-800 transition-transform duration-300"
              >
                Registrar
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? (
              <MdClose size={24} className="text-gray-700 dark:text-gray-300" />
            ) : (
              <MdMenu size={24} className="text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 w-full px-4 pb-4 shadow-lg rounded-b-lg transition-transform duration-300">
          <Link
            to="/"
            className="block text-gray-700 dark:text-gray-300 py-2 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/perfilEmpresaPublico"
            className="block text-gray-700 dark:text-gray-300 py-2 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
            onClick={toggleMenu}
          >
            Sobre la Empresa
          </Link>
          <button
            className="block text-gray-700 dark:text-gray-300 py-2 hover:text-gray-900 dark:hover:text-white flex items-center justify-between transition-colors duration-300"
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen ? 'true' : 'false'}
          >
            Servicios <MdArrowDropDown size={20} />
          </button>
          {isDropdownOpen && (
            <div className="pl-4">
              <Link
                to="/about"
                className="block text-gray-700 dark:text-gray-300 py-2 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                onClick={toggleMenu}
              >
                Quiénes Somos
              </Link>
              <Link
                to="/products"
                className="block text-gray-700 dark:text-gray-300 py-2 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                onClick={toggleMenu}
              >
                Productos
              </Link>
              <Link
                to="/contact"
                className="block text-gray-700 dark:text-gray-300 py-2 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                onClick={toggleMenu}
              >
                Contacto
              </Link>
            </div>
          )}
          {isLoggedIn ? (
            <>
              <Link
                to={userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard'}
                className="block text-gray-700 dark:text-gray-300 py-2 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/logout"
                className="block text-red-600 dark:text-red-400 py-2 hover:text-red-800 dark:hover:text-red-600 transition-colors duration-300"
                onClick={toggleMenu}
              >
                Cerrar sesión
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-gray-700 dark:text-gray-300 py-2 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                onClick={toggleMenu}
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="block bg-green-600 dark:bg-green-700 text-white py-2 px-4 rounded mt-2 hover:bg-green-700 dark:hover:bg-green-800 transition-colors duration-300"
                onClick={toggleMenu}
              >
                Registrar
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
