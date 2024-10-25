import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';  // Asegúrate de importar Navigate
import Home from './componentes/Home';
import LoginForm from './componentes/LoginForm';
import RegisterForm from './componentes/RegisterForm';
import Logout from './componentes/Logout';
import AdminDashboard from './componentes/Admin/AdminDashboard';  // Nuevo componente para admin
import RecoverPassword from './componentes/RecoverPassword';
import ResetPassword from './componentes/ResetPassword';
import VerificarCorreo from './componentes/VerificarCorreo';
import Navbar from './componentes/Compartido/Navbar'; 
import About from './componentes/About';
import Footer from './componentes/Compartido/Footer';
import AdminProfile from './componentes/Admin/AdminProfile';
import UserDashboard from './componentes/User/UserDashboard';
/* import UserProfile from './componentes/User/UserProfile'; */

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para manejo de login
  const [verifiedEmail, setVerifiedEmail] = useState(null); // Verificación de correo para el registro
  const [userRole, setUserRole] = useState(null); // Rol del usuario (admin o usuario regular)

  return (
    <Router>
      <div>
        {/* Navbar y Footer */}
        <Navbar isLoggedIn={isLoggedIn} userRole={userRole} />
        <Footer isLoggedIn={isLoggedIn} />

        {/* Rutas de la aplicación */}
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />

          {/* Rutas de autenticación */}
          <Route 
            path="/login" 
            element={<LoginForm setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} 
          /> {/* Pasamos setUserRole para capturar el rol en login */}

          <Route 
            path="/register" 
            element={verifiedEmail ? <RegisterForm verifiedEmail={verifiedEmail} /> : <VerificarCorreo onVerified={setVerifiedEmail} />} 
          />

          <Route 
            path="/logout" 
            element={<Logout setIsLoggedIn={setIsLoggedIn} />} 
          />

          <Route 
            path="/profile" 
            element={isLoggedIn ? <UserDashboard /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />} 
          />

          <Route 
            path="/reset-password/:token" 
            element={<ResetPassword />} 
          />

          <Route 
            path="/recover-password" 
            element={<RecoverPassword />} 
          />

          <Route 
            path="/about" 
            element={<About />} 
          />

          {/* Rutas protegidas para administrador */}
          <Route 
            path="/admin/profile" 
            element={isLoggedIn && userRole === 'admin' ? <AdminProfile /> : <Navigate to="/login" />} 
          />

          <Route 
            path="/admin/dashboard" 
            element={isLoggedIn && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} 
          />

          {/* Rutas protegidas para usuarios regulares */}
          {/* <Route 
            path="/user/profile" 
            element={isLoggedIn && userRole === 'user' ? <UserProfile /> : <Navigate to="/login" />} 
          /> */}

        </Routes>

        {/* Footer */}
        <Footer /> {/* Footer at the bottom */}
      </div>
    </Router>
  );
}

export default App;
