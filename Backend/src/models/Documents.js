// models/Document.js
import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    enum: ['Política de privacidad', 'Términos y condiciones', 'Deslinde legal']
  },
  content: {
    type: String,
    required: true,
    // Puedes agregar validaciones de longitud si es necesario
  },
  version: {
    type: Number,
    default: 1,
    min: 1
  },
  effectiveDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(v) {
        return v instanceof Date && !isNaN(v);
      },
      message: props => `${props.value} no es una fecha válida!`
    }
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
    required: true
  },
  modifiedBy: {
    type: String
  }
}, {
  timestamps: true,
});


// Índices para mejorar las consultas más comunes
documentSchema.index({ title: 1, version: -1 }); // Índice compuesto por título y versión para búsquedas eficientes del historial

export default mongoose.model('Document', documentSchema);
