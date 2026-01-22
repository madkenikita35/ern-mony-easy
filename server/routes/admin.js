import express from 'express';
import User from '../models/User.js';
import Job from '../models/Job.js';

const router = express.Router();

// 1. GET ALL USERS (To monitor platform activity)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. MODERATE JOB: Approve or Reject a Job Post
router.put('/job-status/:id', async (req, res) => {
  try {
    const { status } = req.body; // e.g., 'active' or 'suspended'
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. NEW: SUBSCRIPTION MONITORING
// This allows the admin to see which employers are active, on trial, or paid
router.get('/subscriptions', async (req, res) => {
  try {
    const employers = await User.find({ role: 'employer' })
      .select('name email isSubscribed trialStartDate subscriptionExpiry');
    res.status(200).json(employers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;