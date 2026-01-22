import express from 'express';
import { auth } from '../middleware/auth.js'; 
import { checkSubscription } from '../middleware/checkSubscription.js';
import Job from '../models/Job.js';

const router = express.Router();

// 1. POST A NEW JOB (Keep your existing code here)
router.post('/post', auth, checkSubscription, async (req, res) => {
  try {
    const { title, description, videoUrl, location, wage, duration } = req.body;
    const newJob = new Job({
      employerId: req.user.id, 
      title,
      description,
      videoUrl,
      location,
      wage,
      duration
    });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. ADD THIS: GET ALL JOBS (This is what the Seeker sees)
router.get('/all', async (req, res) => {
  try {
    // We fetch all jobs and "populate" the employer's name from the User model
    const jobs = await Job.find().populate('employerId', 'name');
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;