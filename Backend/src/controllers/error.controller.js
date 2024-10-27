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
  