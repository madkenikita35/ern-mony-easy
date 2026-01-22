import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true }, // For the short video explanation
  location: { type: String, required: true },
  wage: { type: Number, required: true },
  duration: { type: String, required: true }, // e.g., "2 hours", "1 day"
  status: { type: String, enum: ['active', 'closed'], default: 'active' }
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);