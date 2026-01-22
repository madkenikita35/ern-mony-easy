import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Import connection
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';
import paymentRoutes from './routes/payment.js';
import applicationRoutes from './routes/applications.js';
import adminRoutes from './routes/admin.js';


// Initialize dotenv to use .env variables
dotenv.config();
connectDB(); // Execute connection

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);
app.use(cors());

// Basic Route
app.get('/', (req, res) => {
  res.send('Ern Money Easy Server is Running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});