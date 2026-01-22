// import User from '../models/User.js';

// export const checkSubscription = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.body.employerId || req.params.id);

//     if (!user || user.role !== 'employer') {
//       return res.status(403).json({ message: "Access denied. Employers only." });
//     }

//     // 1. Check if user is within the 8-day Free Trial [cite: 26]
//     const trialDuration = 8 * 24 * 60 * 60 * 1000; // 8 days in milliseconds
//     const now = new Date();
//     const isUnderTrial = (now - user.trialStartDate) < trialDuration;

//     // 2. Check if they have an active paid subscription [cite: 14, 25]
//     const hasActiveSubscription = user.isSubscribed && user.subscriptionExpiry > now;

//     if (isUnderTrial || hasActiveSubscription) {
//       next(); // Allowed to proceed
//     } else {
//       res.status(402).json({ 
//         message: "Trial expired. Please pay ₹100 subscription fee to continue.",
//         trialEnded: true 
//       });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

import User from '../models/User.js';

export const checkSubscription = async (req, res, next) => {
  try {
    // Look for user ID from req.user (populated by your auth middleware)
    const userId = req.user?.id || req.user?._id; 
    const user = await User.findById(userId);

    if (!user || user.role !== 'employer') {
      return res.status(403).json({ message: "Access denied. Employers only." });
    }

    // 1. Check if user is within the 8-day Free Trial
    const trialDuration = 8 * 24 * 60 * 60 * 1000; 
    const now = new Date();
    const isUnderTrial = (now - new Date(user.trialStartDate)) < trialDuration;

    // 2. Check if they have an active paid subscription
    const hasActiveSubscription = user.isSubscribed;

    if (isUnderTrial || hasActiveSubscription) {
      next(); 
    } else {
      res.status(402).json({ 
        message: "Trial expired. Please pay ₹100 subscription fee to continue.",
        trialEnded: true 
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};