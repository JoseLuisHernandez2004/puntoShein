import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './componentes/Login';
import Register from './componentes/Registro';
import ForgotPassword from './componentes/ForgotPassword';
import Home from './componentes/Home';

function App() {
  return (
    <Router>
      <div>
        {/* Menú de navegación */}
        <nav className="bg-gray-800 p-4">
          <ul className="flex justify-center space-x-4">
            <li>
              <Link to="/" className="text-white">Home</Link>
            </li>
            <li>
              <Link to="/login" className="text-white">Inicio de Sesión</Link>
            </li>
            <li>
              <Link to="/register" className="text-white">Registro</Link>
            </li>
          </ul>
        </nav>

        {/* Definir las rutas */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Página Home por defecto */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
