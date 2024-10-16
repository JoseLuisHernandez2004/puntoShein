import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './componentes/Home';
import LoginForm from './componentes/LoginForm';
import RegisterForm from './componentes/RegisterForm';
import Logout from './componentes/Logout';
import UserDashboard from './componentes/UserDashboard';
import RecoverPassword from './componentes/RecoverPassword'; // Importar la nueva página


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        {/* Navbar will be always rendered */}
        <nav className="w-full flex justify-between items-center bg-white p-6 shadow-md">
          <h1 className="text-3xl font-bold text-gray-800">Punto Shein</h1>
          <div className="flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
            {!isLoggedIn ? (
              <>
                <a href="/login" className="text-gray-700 hover:text-gray-900">Login</a>
                <a href="/register" className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">Register</a>
              </>
            ) : (
              <a href="/logout" className="text-red-600 hover:text-red-800">Logout</a>
            )}
          </div>
        </nav>

        {/* Routing for different pages */}
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/profile" element={isLoggedIn ? <UserDashboard /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/recover-password" element={<RecoverPassword />} /> {/* Nueva ruta */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
