import React, { useState } from 'react';
import Login from './componentes/Login';
import Home from './componentes/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {isLoggedIn ? <Home /> : <Login />}
    </div>
  );
}

export default App;
