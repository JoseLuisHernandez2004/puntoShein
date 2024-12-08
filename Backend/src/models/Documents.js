// models/Document.js
import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      enum: ['Política de privacidad', 'Términos y condiciones', 'Deslinde legal'], // Solo títulos permitidos
    },
    content: {
      type: String,
      required: true,
      minlength: 10, // Longitud mínima para asegurar contenido significativo
      maxlength: 10000, // Puedes ajustar este valor según el límite permitido
    },
    version: {
      type: Number,
      default: 1,
      min: 1, // Las versiones deben ser al menos 1
    },
    effectiveDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v instanceof Date && !isNaN(v); // Validar que sea una fecha válida
        },
        message: (props) => `${props.value} no es una fecha válida!`,
      },
    },
    isDeleted: {
      type: Boolean,
      default: false, // Inicialmente no está eliminado
    },
    status: {
      type: String,
      enum: ['vigente', 'no vigente'], // Solo valores permitidos
      default: 'vigente',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Referencia al modelo User
      required: true,
    },
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Referencia al modelo User
    },
  },
  {
    timestamps: true, // Agrega automáticamente los campos 'createdAt' y 'updatedAt'
  }
);

// Índices para optimizar las consultas
documentSchema.index({ title: 1, version: -1 }); // Para búsquedas rápidas por título y versión
documentSchema.index({ status: 1, isDeleted: 1 }); // Para búsquedas rápidas por estado y eliminación lógica

export default mongoose.model('Document', documentSchema);
