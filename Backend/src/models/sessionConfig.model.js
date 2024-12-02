import mongoose from 'mongoose';

const sessionConfigSchema = new mongoose.Schema({
  maxIntentos: {
    type: Number,
    default: 3, // Valor predeterminado
    required: true,
  },
  tiempoBloqueo: {
    type: Number, // Tiempo en minutos
    default: 5, // Valor predeterminado en minutos
    required: true,
  },
}, {
  timestamps: true, // Para registrar cuándo se actualizó
});

export default mongoose.model('Configuracion_Login', sessionConfigSchema);
