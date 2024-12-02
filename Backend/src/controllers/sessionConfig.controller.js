import SessionConfig from '../models/sessionConfig.model.js';
import User from '../models/user.model.js';


export const updateSessionConfig = async (req, res) => {
    const { maxIntentos, tiempoBloqueo } = req.body; // Usar los nuevos nombres
  
    try {
      const config = await SessionConfig.findOneAndUpdate(
        {}, // Busca el único documento
        { maxIntentos, tiempoBloqueo }, // Actualiza valores con los nuevos nombres
        { new: true, upsert: true } // Crea si no existe
      );
  
      res.status(200).json({ message: 'Configuración actualizada con éxito', config });
    } catch (error) {
      console.error('Error al actualizar configuración de sesión:', error);
      res.status(500).json({ message: 'Error al actualizar la configuración de sesión.' });
    }
  };
  
export const getSessionConfig = async (req, res) => {
    try {
      const config = await SessionConfig.findOne();
      if (!config) {
        return res.status(404).json({ message: 'Configuración no encontrada.' });
      }
      res.status(200).json(config);
    } catch (error) {
      console.error('Error al obtener configuración de sesión:', error);
      res.status(500).json({ message: 'Error al obtener la configuración de sesión.' });
    }
  };

