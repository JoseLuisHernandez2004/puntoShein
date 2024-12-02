//C:\xampp\htdocs\puntoShein\Frontend\src\Global\ActualizacionGlobal.js
import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

const ActualizacionGlobal = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userRole,
        setUserRole,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ActualizacionGlobal;
