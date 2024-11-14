// models/Document.js
import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  version: { type: Number, default: 1.0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  effectiveDate: { type: Date, required: true },
  isDeleted: { type: Boolean, default: false },
  status: { type: String, enum: ['vigente', 'no vigente'], default: 'vigente' }
});

export default mongoose.model('Document', documentSchema);
