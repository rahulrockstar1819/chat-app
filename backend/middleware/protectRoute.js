import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
        
const protectRoute = async (req, res, next) => {
   try {
    const token = req.cookies.jwt;
   
    if(!token) {
        return res.status(401).json({ error: "Unauthorized - no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
    if(!decoded) {
        return res.status(401).json({ error: "Unauthorized - invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
   
    if(!user) {
        return res.status(401).json({ error: "Unauthorized - user not found" });
    }

    req.user = user;    
    next();
   } catch (error) {
    console.log(error.message, "Internal server error");
    res.status(500).json({ error: error.message });
   }
    
}

export default protectRoute;
