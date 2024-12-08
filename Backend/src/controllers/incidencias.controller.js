import Incidencias from '../models/incidencia.model.js';

// Obtener todas las incidencias
export const getAllIncidencias = async (req, res) => {
  try {
    const incidencias = await Incidencias.find().populate('userId', 'username email'); // Incluye detalles del usuario si es necesario
    res.status(200).json(incidencias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las incidencias: ' + error.message });
  }
};

// Obtener las incidencias de un usuario específico
export const getIncidenciasByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const incidencias = await Incidencias.find({ userId });
    if (incidencias.length === 0) {
      return res.status(404).json({ message: 'No se encontraron incidencias para este usuario.' });
    }
    res.status(200).json(incidencias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las incidencias: ' + error.message });
  }
};

// Crear una nueva incidencia manualmente (opcional)
export const createIncidencia = async (req, res) => {
  const { userId, message, status } = req.body;
  try {
    const newIncidencia = new Incidencias({
      userId,
      message,
      status,
      date: new Date(),
    });
    await newIncidencia.save();
    res.status(201).json({ message: 'Incidencia creada correctamente.', incidencia: newIncidencia });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la incidencia: ' + error.message });
  }
};
