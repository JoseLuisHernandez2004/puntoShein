import React, { useContext } from 'react';
import UsuariosBloqueados from './Incidencias/UsuariosBloqueados';
import ActualizarNumSesion from './Incidencias/ActualizarNumSesion';
import { ThemeContext } from '../Style/Tema';

const AdminIncidencias = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen flex flex-col items-center`}
    >
      <header className="mt-16 mb-12 text-center">
        <h1 className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
          Gestión de Incidencias
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Administra y supervisa las incidencias reportadas por los usuarios
        </p>
      </header>

      <main className="w-full max-w-6xl">
        <section
          className={`mb-12 p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md border ${
            darkMode ? 'border-gray-700' : 'border-gray-300'
          }`}
        >
          <h2 className={`text-3xl font-semibold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
            Usuarios Bloqueados
          </h2>
          <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Consulta y gestiona la lista de usuarios bloqueados.
          </p>
          <UsuariosBloqueados />
        </section>
      </main>
      <main className="w-full max-w-6xl">
        <section
          className={`mb-12 p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md border ${
            darkMode ? 'border-gray-700' : 'border-gray-300'
          }`}
        >
          <h2 className={`text-3xl font-semibold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
            Actualizar números de intentos de sesióon
          </h2>
          <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Definir número de intentos de sesión
          </p>
          <ActualizarNumSesion />
        </section>
      </main>
    </div>
  );
};

export default AdminIncidencias;
