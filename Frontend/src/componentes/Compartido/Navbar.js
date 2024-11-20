import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdMenu, MdClose, MdArrowDropDown } from 'react-icons/md';

const Navbar = ({ isLoggedIn, userRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Cargar el modo desde localStorage al montar el componente
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark');
    } else {
      setDarkMode(false);
      document.body.classList.add('light');
    }
  }, []);

  // Alternar entre modo oscuro y claro
  const toggleDarkMode = () => {
    if (darkMode) {
      document.body.classList.replace('dark', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.replace('light', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-lg fixed top-0 z-50 transition-all duration-300 ease-in-out">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center">
            <img
              src="https://scontent.fver2-1.fna.fbcdn.net/v/t39.30808-6/370115356_645029297697036_1951347873711812214_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHfjHXAdaLXgFH9xRAvaiUGJQ0iOM2CJ34lDSI4zYInfoE7bvHUXJzrxh4mfXi8piRwpwHNrQRi8SI4gkvQ3x__&_nc_ohc=CXi5K48a8UsQ7kNvgFG1s3O&_nc_zt=23&_nc_ht=scontent.fver2-1.fna&_nc_gid=A0KquJ4YgKHsfwxhee3Mrs2&oh=00_AYCgfCFbcHALr4l51XZXz3oHSi8tYuQXzitQYOT01b44Ew&oe=67431D3D"
              alt="Punto Shein Logo"
              className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>

        {/* Botón para cambiar entre oscuro y claro */}
        <button
          onClick={toggleDarkMode}
          className="text-gray-700 dark:text-white transition-colors duration-300"
        >
          {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
          >
            Home
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

          {isLoggedIn ? (
            <>
              <Link
                to={userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard'}  // Redirigir según el rol
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
                className="bg-green-600 dark:bg-green-700 text-white py-2 px-4 rounded hover:bg-green-700 dark:hover:bg-green-800 transition-colors duration-300"
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
        <div className="md:hidden bg-white dark:bg-gray-900 w-full px-4 pb-4 shadow-lg rounded-b-lg">
          <Link
            to="/"
            className="block text-gray-700 dark:text-gray-300 py-2 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
            onClick={toggleMenu}
          >
            Home
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
                to={userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard'}  // Redirigir según el rol
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
