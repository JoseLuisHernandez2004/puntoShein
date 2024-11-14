import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import Home from './componentes/Home';
import LoginForm from './componentes/LoginForm';
import RegisterForm from './componentes/RegisterForm';
import Logout from './componentes/Logout';
import AdminDashboard from './componentes/Admin/AdminDashboard'; 
import RecoverPassword from './componentes/RecoverPassword';
import ResetPassword from './componentes/ResetPassword';
import VerificarCorreo from './componentes/VerificarCorreo';
import Navbar from './componentes/Compartido/Navbar'; 
import About from './componentes/About';
import Footer from './componentes/Compartido/Footer';
import AdminProfile from './componentes/Admin/AdminProfile';
import UserProfile from './componentes/User/UserProfile';
import UserDashboard from './componentes/User/UserDashboard';
import VerifyMfa from './componentes/VerifyMfa';

// Importar componentes del CRUD de documentos
import AdminPanel from './componentes/Admin/AdminPanel'; // Panel de administración para documentos

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para manejo de login
  const [verifiedEmail, setVerifiedEmail] = useState(null); // Verificación de correo para el registro
  const [userRole, setUserRole] = useState(null); // Rol del usuario (admin o usuario regular)

  return (
    <Router>
      <div>
        {/* Navbar y Footer */}
        <Navbar isLoggedIn={isLoggedIn} userRole={userRole} />
        
        {/* Rutas de la aplicación */}
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />

          {/* Rutas de autenticación */}
          <Route 
            path="/login" 
            element={<LoginForm setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} 
          />

          <Route 
            path="/register" 
            element={verifiedEmail ? <RegisterForm verifiedEmail={verifiedEmail} /> : <VerificarCorreo onVerified={setVerifiedEmail} />} 
          />

          <Route 
            path="/logout" 
            element={<Logout setIsLoggedIn={setIsLoggedIn} />} 
          />

          {/* Rutas para usuarios regulares */}
          <Route 
            path="/user/dashboard" 
            element={isLoggedIn && userRole === 'user' ? <UserDashboard /> : <Navigate to="/login" />} 
          />

          <Route 
            path="/profile" 
            element={isLoggedIn && userRole === 'user' ? <UserProfile /> : <Navigate to="/login" />} 
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
            path="/verify-mfa" 
            element={<VerifyMfa setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} 
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

          {/* Rutas del CRUD de Documentos para administrador */}
          <Route 
            path="/admin/documents"     
            element={isLoggedIn && userRole === 'admin' ? <AdminPanel /> : <Navigate to="/login" />} 
          />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
