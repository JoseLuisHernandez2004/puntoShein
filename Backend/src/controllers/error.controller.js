import ErrorLog from '../models/errorLog.model.js';
import User from '../models/user.model.js';

export const getErrors = async (req, res) => {
    try {
      const errors = await ErrorLog.find();
      res.json(errors);
    } catch (error) {
      console.error('Error al obtener los registros de error:', error);
      res.status(500).json({ message: 'Error al obtener los registros de error.' });
    }
  };
// Función para registrar errores del frontend
export const logFrontendError = async (req, res) => {
    try {
      const { message, stack, component, url } = req.body;
      const errorLog = new ErrorLog({
        message: message || 'Error en el frontend',
        stack,
        route: url,  // La URL en donde ocurrió el error
        userEmail: req.body?.email || 'Frontend Error',
        method: 'CLIENT',
        type: 'frontend-error',  // Identificador de que es un error del frontend
        component, // Componente React donde ocurrió el error
      });
      await errorLog.save();
      res.status(200).json({ message: 'Error registrado con éxito' });
    } catch (error) {
      console.error('Error al registrar error del frontend:', error);
      res.status(500).json({ message: 'Error al registrar el error del frontend' });
    }
  };