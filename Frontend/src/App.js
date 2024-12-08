import React, { useState } from 'react';
import { ThemeProvider } from './componentes/Style/Tema';
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
import AdminLayout from './componentes/Admin/AdminLayout';
import UserLayout from './componentes/User/UserLayout';
import UserProfile from './componentes/User/UserProfile';
import UserDashboard from './componentes/User/UserDashboard';
import VerifyMfa from './componentes/VerifyMfa';
import AdminDashboard from './componentes/Admin/AdminDashboard';
import AdminProfile from './componentes/Admin/AdminProfile';
import AdminPanel from './componentes/Admin/AdminPanel';
import Products from './componentes/Admin/products';
import MyUsers from './componentes/Admin/myUsers';
import ListaPedidos from './componentes/Admin/ListaPedidos';
import CompanyProfile from './componentes/Admin/CompanyProfile';
import CompanyPublicProfile from './componentes/CompanyPublicProfile';
import Terms from './componentes/Terms';  // Nuevo componente para Términos y Condiciones
import Privacy from './componentes/Politicas';  // Nuevo componente para Política de Privacidad
import DeslideL from './componentes/DeslideL';  // Nuevo componente para Deslinde Legal
import AdminIncidencias from './componentes/Admin/AdminIndicencias';
import Productos from './componentes/Public/DetalleProductos';
import Productos2 from './componentes/Public/DetalleProductos2';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState(null);
  const [userRole, setUserRole] = useState(null);

  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Navbar */}
          <Navbar isLoggedIn={isLoggedIn} userRole={userRole} />

          {/* Contenido principal */}
          <main className="flex-grow mt-16 mb-16 px-4">
            <Routes>
              {/* Ruta principal */}
              <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
              <Route path="/perfilEmpresaPublico" element={<CompanyPublicProfile />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/productos2" element={<Productos2 />} />


              {/* Rutas de autenticación */}
              <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
              <Route path="/register" element={verifiedEmail ? <RegisterForm verifiedEmail={verifiedEmail} /> : <VerificarCorreo onVerified={setVerifiedEmail} />} />
              <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/recover-password" element={<RecoverPassword />} />
              <Route path="/verify-mfa" element={<VerifyMfa setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
              <Route path="/about" element={<About />} />

              {/* Rutas para usuarios regulares */}
              <Route path="/user/*" element={isLoggedIn && userRole === 'user' ? <UserLayout /> : <Navigate to="/login" />}>
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="profile" element={<UserProfile />} />
              </Route>

              {/* Rutas protegidas para administrador */}
              <Route path="/admin/*" element={isLoggedIn && userRole === 'admin' ? <AdminLayout /> : <Navigate to="/login" />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="documents" element={<AdminPanel />} />
                <Route path="products" element={<Products />} />
                <Route path="myUsers" element={<MyUsers />} />
                <Route path="Listapedidos" element={<ListaPedidos />} />
                <Route path="company-profile" element={<CompanyProfile />} />


                {/* Administracion de incidencias */}
                <Route path="incidencias" element={<AdminIncidencias />} />

              </Route>

              {/* Rutas para documentos regulatorios */}
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/legal" element={<DeslideL />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
