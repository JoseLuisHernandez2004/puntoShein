// models/Document.js
import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    enum: ['Política de privacidad', 'Términos y condiciones', 'Deslinde legal'] // Lista de títulos permitidos
  },
  content: {
    type: String,
    required: true
  },
  version: {
    type: Number,
    default: 1, // La versión comienza en 1
  },
  effectiveDate: {
    type: Date,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['vigente', 'no vigente'],
    default: 'vigente'
  },
  createdBy: {
    type: String,
    required: true // Puede ser el nombre o el ID del usuario que creó el documento
  },
  modifiedBy: {
    type: String // Opcional, para quien realizó la última modificación
  }
}, {
  timestamps: true, // Automáticamente añade createdAt y updatedAt
});

// Índices para mejorar las consultas más comunes
documentSchema.index({ title: 1, version: -1 }); // Índice compuesto por título y versión para búsquedas eficientes del historial

export default mongoose.model('Document', documentSchema);
