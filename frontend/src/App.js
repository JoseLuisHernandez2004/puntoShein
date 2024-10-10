import React, { useState } from 'react';
import Login from './componentes/Login';
import Register from './componentes/Registro';
import ForgotPassword from './componentes/ForgotPassword';
import Home from './componentes/Home';

function App() {
  const [view, setView] = useState('login');

  const renderView = () => {
    switch (view) {
      case 'login':
        return <Login setView={setView} />;
      case 'register':
        return <Register />;
      case 'forgotPassword':
        return <ForgotPassword />;
      case 'home':
        return <Home />;
      default:
        return <Login setView={setView} />;
    }
  };

  return (
    <div className="App">
      {renderView()}
    </div>
  );
}

export default App;
