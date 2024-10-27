import mongoose from 'mongoose';

const errorLogSchema = new mongoose.Schema({
  message: { type: String, required: true },
  stack: { type: String },
  route: { type: String, required: true },
  userEmail: { type: String },
  method: { type: String }, // CLIENT para errores del frontend
  type: { type: String, required: true, enum: ['error', 'failed-action', 'frontend-error'] },
  component: { type: String }, // Componente donde ocurrió el error (si es frontend)
}, {
  timestamps: true,
});

export default mongoose.model('ErrorLog', errorLogSchema);
