import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  try {
    // Check if the Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token, authorization denied" });

    const token = authHeader.split(" ")[1];
    
    // Verify the token using your secret
    const decodedData = jwt.verify(token, process.env.JWT_SECRET || 'test');
    
    // Attach the user ID and role to the request object
    req.user = { id: decodedData?.id, role: decodedData?.role }; 
    
    next(); // Move to the next function (checkSubscription)
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};