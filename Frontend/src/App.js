import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './componentes/Home';
import LoginForm from './componentes/LoginForm';
import RegisterForm from './componentes/RegisterForm';
import Logout from './componentes/Logout';
import UserDashboard from './componentes/UserDashboard';
import RecoverPassword from './componentes/RecoverPassword';
import VerificarCorreo from './componentes/VerificarCorreo';
import Navbar from './componentes/Navbar'; // Import Navbar
import About from './componentes/About';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState(null); // Store verified email

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} /> {/* Use Navbar here */}

        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={verifiedEmail ? <RegisterForm verifiedEmail={verifiedEmail} /> : <VerificarCorreo onVerified={setVerifiedEmail} />} />
          <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/profile" element={isLoggedIn ? <UserDashboard /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route path="/about" element={<About />} /> {/* Add the About route */}
        </Routes>

        {/* Add space at the bottom of the page */}
        <footer className="h-16" /> 
      </div>
    </Router>
  );
}

export default App;
