import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark');
    } else {
      setDarkMode(false);
      document.body.classList.add('light');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.body.classList.replace('dark', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.replace('light', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
