import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md'; // Import icons for mobile menu

const Navbar = ({ isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <Link to="/" className="flex items-center">
          <img
            src="https://scontent.fver2-1.fna.fbcdn.net/v/t39.30808-6/370115356_645029297697036_1951347873711812214_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHfjHXAdaLXgFH9xRAvaiUGJQ0iOM2CJ34lDSI4zYInfoE7bvHUXJzrxh4mfXi8piRwpwHNrQRi8SI4gkvQ3x__&_nc_ohc=VAC14nsSYg4Q7kNvgHsS29h&_nc_ht=scontent.fver2-1.fna&_nc_gid=AYPd5kdOdC74tZd_26eMiE-&oh=00_AYCOzI8ZkOiNSJgiAoSy4QxyCj-f8jpZomkuqzeDiFuBUQ&oe=67195DBD" // Replace with your actual logo link
            alt="Punto Shein Logo"
            className="h-12 w-12 object-cover mr-2" // Adjusted size
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-gray-900">Login</Link>
              <Link to="/register" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-purple-700">Register</Link>
            </>
          ) : (
            <Link to="/logout" className="text-red-600 hover:text-red-800">Logout</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full px-4 pb-4">
          <Link
            to="/"
            className="block text-gray-700 py-2 hover:text-gray-900"
            onClick={toggleMenu}
          >
            Home
          </Link>
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="block text-gray-700 py-2 hover:text-gray-900"
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block bg-green-600 text-white py-2 px-4 rounded mt-2 hover:bg-purple-700"
                onClick={toggleMenu}
              >
                Register
              </Link>
            </>
          ) : (
            <Link
              to="/logout"
              className="block text-red-600 py-2 hover:text-red-800"
              onClick={toggleMenu}
            >
              Logout
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
