import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import Home from './componentes/Home';
import LoginForm from './componentes/LoginForm';
import RegisterForm from './componentes/RegisterForm';
import Logout from './componentes/Logout';
import RecoverPassword from './componentes/RecoverPassword';
import ResetPassword from './componentes/ResetPassword';
import VerificarCorreo from './componentes/VerificarCorreo';
import Navbar from './componentes/Compartido/Navbar'; 
import About from './componentes/About';
import Footer from './componentes/Compartido/Footer';
import AdminLayout from './componentes/Admin/AdminLayout'; // Admin layout importado
import UserLayout from './componentes/User/UserLayout'; // User layout importado
import UserProfile from './componentes/User/UserProfile';
import UserDashboard from './componentes/User/UserDashboard';
import VerifyMfa from './componentes/VerifyMfa';
import AdminDashboard from './componentes/Admin/AdminDashboard';
import AdminProfile from './componentes/Admin/AdminProfile';
import AdminPanel from './componentes/Admin/AdminPanel'; // Panel de administración para documentos
import Products from './componentes/Admin/products'; // Componente para gestionar productos
import MyUsers from './componentes/Admin/myUsers';
import ListaPedidos from './componentes/Admin/ListaPedidos';
import CompanyProfile from './componentes/Admin/CompanyProfile'; // Componente para gestionar el perfil de la empresa


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState(null);
  const [userRole, setUserRole] = useState(null);

  return (
    <Router>
      <div>
        {/* Navbar (siempre visible) */}
        <Navbar isLoggedIn={isLoggedIn} userRole={userRole} />
        
        {/* Rutas de la aplicación */}
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />

          {/* Rutas de autenticación */}
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
          <Route path="/register" element={verifiedEmail ? <RegisterForm verifiedEmail={verifiedEmail} /> : <VerificarCorreo onVerified={setVerifiedEmail} />} />
          <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route path="/verify-mfa" element={<VerifyMfa setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
          <Route path="/about" element={<About />} />

          {/* Rutas para usuarios regulares usando UserLayout */}
          <Route path="/user/*" element={isLoggedIn && userRole === 'user' ? <UserLayout /> : <Navigate to="/login" />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="profile" element={<UserProfile />} />
            {/* Puedes agregar más rutas aquí si es necesario */}
          </Route>

          {/* Rutas protegidas para administrador usando AdminLayout */}
          <Route path="/admin/*" element={isLoggedIn && userRole === 'admin' ? <AdminLayout /> : <Navigate to="/login" />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="documents" element={<AdminPanel />} />
            <Route path="products" element={<Products />} />
            <Route path="myUsers" element={<MyUsers />} />
            <Route path="Listapedidos" element={<ListaPedidos />} />
            <Route path="company-profile" element={<CompanyProfile />} /> {/* Nueva ruta agregada para el perfil de la empresa */}
          </Route>
        </Routes>

        {/* Footer (siempre visible) */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
