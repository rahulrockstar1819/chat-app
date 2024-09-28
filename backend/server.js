import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authroutes.js';
import connectToMongoDB from './db/connectToMongodb.js';
import messagesRoutes from './routes/message.route.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true })); 
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cookieParser()); // For parsing cookies



// Routes
app.use("/api/auth/", authRoutes);
app.use("/api/message/", messagesRoutes);
app.use("/api/user/", userRoutes);


app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});
