import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav className="w-full flex justify-between items-center bg-white p-4 shadow-md fixed top-0 z-50"> {/* Reduced padding (p-6 to p-4) and made it fixed */}
      {/* Logo Section */}
      <Link to="/" className="flex items-center">
        <img
          src="https://scontent.fver2-1.fna.fbcdn.net/v/t39.30808-6/370115356_645029297697036_1951347873711812214_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHfjHXAdaLXgFH9xRAvaiUGJQ0iOM2CJ34lDSI4zYInfoE7bvHUXJzrxh4mfXi8piRwpwHNrQRi8SI4gkvQ3x__&_nc_ohc=VAC14nsSYg4Q7kNvgHsS29h&_nc_ht=scontent.fver2-1.fna&_nc_gid=AYPd5kdOdC74tZd_26eMiE-&oh=00_AYCOzI8ZkOiNSJgiAoSy4QxyCj-f8jpZomkuqzeDiFuBUQ&oe=67195DBD" // Replace with your actual logo link
          alt="Punto Shein Logo"
          className="h-25 w-20 object-cover mr-2"
        />
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-6">
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
    </nav>
  );
};

export default Navbar;
