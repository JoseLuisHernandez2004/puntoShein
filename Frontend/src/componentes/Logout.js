import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import axios from 'axios';

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await axios.post('http://localhost:4000/api/logout', {}, {
          withCredentials: true
        });
        localStorage.removeItem('authToken'); // Clear token
        setIsLoggedIn(false); // Clear logged-in state
        navigate('/'); // Redirect to home
        Swal.fire({
          icon: 'success',
          title: 'Cerrando Sesion',
        });
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    performLogout();
  }, [navigate, setIsLoggedIn]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Logging out...</h1>
    </div>
  );
};

export default Logout;
