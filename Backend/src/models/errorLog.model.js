import mongoose from 'mongoose';

const errorLogSchema = new mongoose.Schema({
    message: { type: String, required: true },
    stack: { type: String },
    date: { type: Date, default: Date.now },
    route: { type: String, required: true },
    userEmail: { type: String },
    method: { type: String },
    statusCode: { type: Number },
    type: { type: String, required: true, enum: ['error', 'failed-action'] }, // Campo para indicar tipo de registro
}, {
    timestamps: true,
});

export default mongoose.model('ErrorLog', errorLogSchema);
