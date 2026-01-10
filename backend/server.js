// server.js (or index.js)
import dotenv from 'dotenv';
import connectToMongoDB from './db/connectToMongodb.js';
import authRoutes from './routes/authroutes.js';
import messagesRoutes from './routes/message.route.js';
import userRoutes from './routes/user.routes.js';
import uploadRoute from './routes/upload.route.js';

// Import the combined socket and app from socket.js
import { app, server } from './socket/socket.js'; // Changed from './socket/socket.js'

dotenv.config();
const PORT = process.env.PORT || 5001;

// ✅ Add ALL your Express routes to the same app instance
app.use("/api/auth/", authRoutes);
app.use("/api/messages/", messagesRoutes);
app.use("/api/user/", userRoutes);
app.use("/api", uploadRoute);

// ✅ Start the combined server
server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`✅ Combined server running on port ${PORT}`);
    console.log(`🌐 API: http://localhost:${PORT}/api`);
    console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/socket-health`);
});