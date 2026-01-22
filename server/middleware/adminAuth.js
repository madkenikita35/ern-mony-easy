export const adminAuth = (req, res, next) => {
  // Assuming 'req.user' is populated by your JWT auth middleware
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin rights required." });
  }
};