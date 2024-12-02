import React, {useContext } from 'react';
import UsuariosBloqueados from './Incidencias/UsuariosBloqueados';
import { ThemeContext } from '../Style/Tema';

const AdminIncidencias = () => {
  const { darkMode } = useContext(ThemeContext);
 
 
  return (
    <div className={`p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen flex flex-col items-center`}>
      <div className="mt-16 mb-12 text-center">
        <h1 className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}>Gestión incidencias</h1>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Administra las incidencias de los usuarios</p>
      </div>

      <section className={`mb-12 p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-300'} w-full max-w-2xl`}>
        <h2 className={`text-3xl font-semibold mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>Ver usuarios bloqueados</h2>
        <UsuariosBloqueados />
      </section>
    </div>
  );
};

export default AdminIncidencias;
