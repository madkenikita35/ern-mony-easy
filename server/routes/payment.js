import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/subscribe', async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Set expiry to 30 days from now
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    const updatedUser = await User.findByIdAndUpdate(userId, {
      isSubscribed: true,
      subscriptionExpiry: expiryDate
    }, { new: true });

    res.status(200).json({ message: "Subscription Successful!", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;