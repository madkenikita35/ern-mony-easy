import express from 'express';
import { auth } from '../middleware/auth.js'; 
import Application from '../models/Application.js';
import Job from '../models/Job.js';

const router = express.Router();

// 1. SEEKER: Apply for a job
router.post('/apply/:jobId', auth, async (req, res) => {
  try {
    const { jobId } = req.params;
    const seekerId = req.user.id; 

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const alreadyApplied = await Application.findOne({ jobId, seekerId });
    if (alreadyApplied) return res.status(400).json({ message: "Already applied to this job" });

    const newApplication = new Application({
      jobId,
      seekerId,
      employerId: job.employerId
    });

    await newApplication.save();
    res.status(201).json({ message: "Applied successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. EMPLOYER: Get applications via Token (Used for your Dashboard)
router.get('/employer-inbox', auth, async (req, res) => {
  try {
    const applications = await Application.find({ employerId: req.user.id })
      .populate('jobId', 'title') 
      .populate('seekerId', 'name email phone') // Added phone here as well
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. ADMIN/SPECIFIC: Get applications via specific Employer ID
router.get('/employer/:employerId', auth, async (req, res) => {
  try {
    const apps = await Application.find({ employerId: req.params.employerId })
      .populate('jobId', 'title') 
      .populate('seekerId', 'name email phone') 
      .sort({ createdAt: -1 });

    res.status(200).json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;