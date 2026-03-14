import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; 
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';
import paymentRoutes from './routes/payment.js';
import applicationRoutes from './routes/applications.js';
import adminRoutes from './routes/admin.js';

dotenv.config();
connectDB(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);
app.use(cors());


app.get('/', (req, res) => {
  res.send('Ern Money Easy Server is Running');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});