import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdMenu, MdClose, MdArrowDropDown } from 'react-icons/md';

const Navbar = ({ isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="w-full bg-white shadow-lg fixed top-0 z-50 transition-all duration-300 ease-in-out">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center">
            <img
              src="https://scontent.fver2-1.fna.fbcdn.net/v/t39.30808-6/370115356_645029297697036_1951347873711812214_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHfjHXAdaLXgFH9xRAvaiUGJQ0iOM2CJ34lDSI4zYInfoE7bvHUXJzrxh4mfXi8piRwpwHNrQRi8SI4gkvQ3x__&_nc_ohc=tf5ubIATdXMQ7kNvgFiiaH_&_nc_ht=scontent.fver2-1.fna&_nc_gid=AHdWE6aYVfSscTPtZuUbNrd&oh=00_AYAsyJMLC35LQpGwMV1wi9kL61XHVO0D9y-oSlxsop2HKw&oe=671C00BD"
              alt="Punto Shein Logo"
              className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
          >
            Home
          </Link>
          <div className="relative">
            <button
              className="text-gray-700 hover:text-gray-900 flex items-center space-x-1 transition-colors duration-300"
              onClick={toggleDropdown}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen ? 'true' : 'false'}
            >
              <span>Servicios</span>
              <MdArrowDropDown size={20} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 bg-white shadow-lg rounded-lg py-2 z-10 transition-opacity duration-300 opacity-100">
                <Link
                  to="/about"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                >
                  Quiénes Somos
                </Link>
                <Link
                  to="/products"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                >
                  Productos
                </Link>
                <Link
                  to="/contact"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                >
                  Contacto
                </Link>
              </div>
            )}
          </div>

          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
              >
                Mi Perfil
              </Link>
              <Link
                to="/logout"
                className="text-red-600 hover:text-red-800 transition-colors duration-300"
              >
                Cerrar sesión
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300"
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
              <MdClose size={24} className="text-gray-700" />
            ) : (
              <MdMenu size={24} className="text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full px-4 pb-4 shadow-lg rounded-b-lg">
          <Link
            to="/"
            className="block text-gray-700 py-2 hover:text-gray-900 transition-colors duration-300"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <button
            className="block text-gray-700 py-2 hover:text-gray-900 flex items-center justify-between transition-colors duration-300"
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
                className="block text-gray-700 py-2 hover:text-gray-900 transition-colors duration-300"
                onClick={toggleMenu}
              >
                Quiénes Somos
              </Link>
              <Link
                to="/products"
                className="block text-gray-700 py-2 hover:text-gray-900 transition-colors duration-300"
                onClick={toggleMenu}
              >
                Productos
              </Link>
              <Link
                to="/contact"
                className="block text-gray-700 py-2 hover:text-gray-900 transition-colors duration-300"
                onClick={toggleMenu}
              >
                Contacto
              </Link>
            </div>
          )}
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="block text-gray-700 py-2 hover:text-gray-900 transition-colors duration-300"
                onClick={toggleMenu}
              >
                Mi Perfil
              </Link>
              <Link
                to="/logout"
                className="block text-red-600 py-2 hover:text-red-800 transition-colors duration-300"
                onClick={toggleMenu}
              >
                Cerrar sesión
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-gray-700 py-2 hover:text-gray-900 transition-colors duration-300"
                onClick={toggleMenu}
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="block bg-green-600 text-white py-2 px-4 rounded mt-2 hover:bg-green-700 transition-colors duration-300"
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
