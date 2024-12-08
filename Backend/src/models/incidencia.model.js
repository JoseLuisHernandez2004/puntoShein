import mongoose from 'mongoose';

const incidenciaSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true, // Relación con el usuario 
    },
    message: { 
      type: String, 
      required: true, // Motivo de la incidencia 
    },
    status: { 
      type: String, 
      enum: ['Activo', 'Bloqueado'], // Estado de la incidencia 
      required: true, 
    },
    date: { 
      type: Date, 
      default: Date.now, // Fecha de la incidencia 
    },
  },
  {
    timestamps: true, // Para registrar cuándo se creó o actualizó la incidencia
  }
);

export default mongoose.model('Incidencia', incidenciaSchema);
