import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['seeker', 'employer', 'admin'], 
    default: 'seeker' 
  },
  // Specific to Employers
  trialStartDate: { type: Date, default: Date.now },
  isSubscribed: { type: Boolean, default: false },
  subscriptionExpiry: { type: Date }
}, { timestamps: true });

export default mongoose.model('User', userSchema);