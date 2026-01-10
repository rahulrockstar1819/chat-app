import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS Configuration - MUST match your frontend URL
const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

// Storage
const userSocketMap = {};
const callRooms = new Map(); // Track active calls
const pendingCalls = new Map(); // Track pending calls

// Helper functions
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const generateRoomId = (callerId, receiverId) => {
    return `call_${Date.now()}_${callerId}_${receiverId}`;
};

const cleanupCall = (roomId) => {
    if (callRooms.has(roomId)) {
        const room = callRooms.get(roomId);
        // Notify both users if they're still connected
        room.users.forEach(user => {
            const socket = io.sockets.sockets.get(user.socketId);
            if (socket) {
                socket.emit("call-ended", {
                    roomId,
                    reason: "Call ended by system",
                    timestamp: Date.now()
                });
            }
        });
        callRooms.delete(roomId);
        console.log(`🧹 Cleaned up room: ${roomId}`);
    }
    
    if (pendingCalls.has(roomId)) {
        clearTimeout(pendingCalls.get(roomId).timeout);
        pendingCalls.delete(roomId);
        console.log(`🧹 Cleaned up pending call: ${roomId}`);
    }
};

// Track connection stats for health endpoint
const connectionStats = {
    totalConnections: 0,
    activeCalls: 0,
    pendingCalls: 0
};

export { app };

// Socket.IO connection logic
io.on("connection", (socket) => {
    console.log("✅ New socket connection:", socket.id);
    connectionStats.totalConnections++;

    const userId = socket.handshake.query.userId;
    
    if (userId) {
        userSocketMap[userId] = socket.id;
        console.log(`User ${userId} connected (socket: ${socket.id})`);
        
        // Send all online users to everyone
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }

    // ==================== CALL INITIATION ====================
    socket.on("call-initiate", (data) => {
        console.log(`📞 Call initiation from ${userId} to ${data.to}`);
        console.log(`Call type: ${data.callType || 'video'}`);
        
        const receiverSocketId = getReceiverSocketId(data.to);
        
        if (!receiverSocketId) {
            socket.emit("call-error", { 
                message: "User is offline or not connected",
                to: data.to 
            });
            return;
        }
        
        // Check if receiver is already in a call
        for (const [roomId, room] of callRooms.entries()) {
            if (room.users.some(u => u.userId === data.to)) {
                socket.emit("call-error", {
                    message: "User is busy in another call",
                    to: data.to
                });
                return;
            }
        }
        
        // Generate unique room ID
        const roomId = generateRoomId(userId, data.to);
        const caller = { userId, socketId: socket.id };
        
        // Set timeout for call response (30 seconds)
        const timeout = setTimeout(() => {
            console.log(`⏰ Call timeout for room ${roomId}`);
            socket.emit("call-timeout", { 
                roomId, 
                to: data.to 
            });
            cleanupCall(roomId);
        }, 30000); // 30 seconds
        
        // Store pending call
        pendingCalls.set(roomId, {
            caller,
            receiverId: data.to,
            callType: data.callType || 'video',
            timestamp: Date.now(),
            timeout
        });
        
        connectionStats.pendingCalls = pendingCalls.size;
        
        // Send call request to receiver
        io.to(receiverSocketId).emit("incoming-call", {
            from: userId,
            callType: data.callType || 'video',
            roomId,
            timestamp: Date.now()
        });
        
        // Send confirmation to caller
        socket.emit("call-initiated", {
            to: data.to,
            roomId,
            callType: data.callType || 'video',
            timestamp: Date.now()
        });
        
        console.log(`📞 Call request sent to ${data.to}, room: ${roomId}`);
    });

    // ==================== CALL ACCEPTANCE ====================
    socket.on("call-accept", (data) => {
        console.log(`✅ Call acceptance from ${userId} for room ${data.roomId}`);
        
        const pendingCall = pendingCalls.get(data.roomId);
        if (!pendingCall) {
            socket.emit("call-error", { 
                message: "Call request expired or not found",
                roomId: data.roomId
            });
            return;
        }
        
        // Create call room
        const receiver = { userId, socketId: socket.id };
        const callRoom = {
            id: data.roomId,
            users: [pendingCall.caller, receiver],
            callType: pendingCall.callType,
            startedAt: Date.now(),
            status: 'active'
        };
        
        callRooms.set(data.roomId, callRoom);
        connectionStats.activeCalls = callRooms.size;
        
        // Clear pending timeout
        clearTimeout(pendingCall.timeout);
        pendingCalls.delete(data.roomId);
        connectionStats.pendingCalls = pendingCalls.size;
        
        // Notify both users
        io.to(pendingCall.caller.socketId).emit("call-accepted", {
            roomId: data.roomId,
            from: userId,
            callType: pendingCall.callType,
            timestamp: Date.now()
        });
        
        io.to(socket.id).emit("call-accepted-confirm", {
            roomId: data.roomId,
            callType: pendingCall.callType,
            timestamp: Date.now()
        });
        
        console.log(`✅ Call room created: ${data.roomId}`);
        console.log(`   Caller: ${pendingCall.caller.userId}`);
        console.log(`   Receiver: ${userId}`);
        console.log(`   Type: ${pendingCall.callType}`);
    });

    // ==================== CALL REJECTION ====================
    socket.on("call-reject", (data) => {
        console.log(`❌ Call rejection from ${userId} for room ${data.roomId}`);
        
        const pendingCall = pendingCalls.get(data.roomId);
        if (pendingCall) {
            // Notify caller
            io.to(pendingCall.caller.socketId).emit("call-rejected", {
                from: userId,
                roomId: data.roomId,
                timestamp: Date.now()
            });
            
            // Cleanup
            cleanupCall(data.roomId);
            connectionStats.pendingCalls = pendingCalls.size;
        }
    });

    // ==================== CALL END ====================
    socket.on("call-end", (data) => {
        console.log(`📞 Call end from ${userId} for room ${data.roomId}`);
        console.log(`Reason: ${data.reason || "User ended call"}`);
        
        const room = callRooms.get(data.roomId);
        if (room) {
            // Notify other user
            const otherUser = room.users.find(u => u.userId !== userId);
            if (otherUser) {
                io.to(otherUser.socketId).emit("call-ended", {
                    from: userId,
                    roomId: data.roomId,
                    reason: data.reason || "Call ended",
                    timestamp: Date.now()
                });
            }
            
            // Cleanup
            cleanupCall(data.roomId);
            connectionStats.activeCalls = callRooms.size;
        }
        
        // Also cleanup if it's a pending call
        cleanupCall(data.roomId);
        connectionStats.pendingCalls = pendingCalls.size;
    });

    // ==================== WEBRTC SIGNALING ====================
    socket.on("webrtc-signal", (data) => {
        const { roomId, signal, type } = data;
        const room = callRooms.get(roomId);
        
        if (!room) {
            console.log(`❌ WebRTC signal for non-existent room: ${roomId}`);
            return;
        }
        
        // Find the other user in the room
        const otherUser = room.users.find(u => u.userId !== userId);
        if (otherUser) {
            io.to(otherUser.socketId).emit("webrtc-signal", {
                from: userId,
                roomId,
                signal,
                type,
                timestamp: Date.now()
            });
            
            // console.log(`📡 WebRTC ${type} signal forwarded from ${userId} to ${otherUser.userId}`);
        }
    });

    // ==================== ICE CANDIDATES ====================
    socket.on("ice-candidate", (data) => {
        const { roomId, candidate } = data;
        const room = callRooms.get(roomId);
        
        if (room) {
            const otherUser = room.users.find(u => u.userId !== userId);
            if (otherUser) {
                io.to(otherUser.socketId).emit("ice-candidate", {
                    from: userId,
                    roomId,
                    candidate,
                    timestamp: Date.now()
                });
            }
        }
    });

    // ==================== MUTE/UNMUTE ====================
    socket.on("user-muted", (data) => {
        const { roomId, isMuted } = data;
        const room = callRooms.get(roomId);
        
        if (room) {
            const otherUser = room.users.find(u => u.userId !== userId);
            if (otherUser) {
                io.to(otherUser.socketId).emit("user-muted", {
                    from: userId,
                    roomId,
                    isMuted,
                    timestamp: Date.now()
                });
            }
        }
    });

    // ==================== VIDEO TOGGLE ====================
    socket.on("user-video-toggled", (data) => {
        const { roomId, videoOff } = data;
        const room = callRooms.get(roomId);
        
        if (room) {
            const otherUser = room.users.find(u => u.userId !== userId);
            if (otherUser) {
                io.to(otherUser.socketId).emit("user-video-toggled", {
                    from: userId,
                    roomId,
                    videoOff,
                    timestamp: Date.now()
                });
            }
        }
    });

    // ==================== DISCONNECT ====================
    socket.on("disconnect", (reason) => {
        console.log("❌ Socket disconnected:", socket.id, "Reason:", reason);
        connectionStats.totalConnections--;
        
        // Clean up user from all call rooms
        for (const [roomId, room] of callRooms.entries()) {
            const userInRoom = room.users.find(u => u.socketId === socket.id);
            if (userInRoom) {
                // Notify other user
                const otherUser = room.users.find(u => u.socketId !== socket.id);
                if (otherUser) {
                    io.to(otherUser.socketId).emit("call-ended", {
                        from: userInRoom.userId,
                        roomId,
                        reason: "User disconnected",
                        timestamp: Date.now()
                    });
                }
                // Cleanup room
                cleanupCall(roomId);
                connectionStats.activeCalls = callRooms.size;
            }
        }
        
        // Clean up pending calls
        for (const [roomId, pendingCall] of pendingCalls.entries()) {
            if (pendingCall.caller.socketId === socket.id) {
                cleanupCall(roomId);
                connectionStats.pendingCalls = pendingCalls.size;
            }
        }
        
        // Remove user from map
        for (const [uid, socketId] of Object.entries(userSocketMap)) {
            if (socketId === socket.id) {
                delete userSocketMap[uid];
                console.log(`Removed user ${uid} from map`);
                break;
            }
        }
        
        // Update online users
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// ==================== HEALTH CHECK ====================
app.get("/socket-health", (req, res) => {
    const memoryUsage = process.memoryUsage();
    
    res.json({
        // Server info
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        
        // Performance
        memory: {
            rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
            heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
            heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`
        },
        
        // Connection stats
        connections: {
            total: connectionStats.totalConnections,
            activeCalls: connectionStats.activeCalls,
            pendingCalls: connectionStats.pendingCalls,
            onlineUsers: Object.keys(userSocketMap).length
        },
        
        // Detailed info
        userSocketMap,
        callRooms: Array.from(callRooms.entries()).map(([roomId, room]) => ({
            roomId,
            users: room.users.map(u => u.userId),
            callType: room.callType,
            duration: `${Math.round((Date.now() - room.startedAt) / 1000)}s`
        })),
        pendingCalls: Array.from(pendingCalls.entries()).map(([roomId, pending]) => ({
            roomId,
            caller: pending.caller.userId,
            receiver: pending.receiverId,
            callType: pending.callType,
            waiting: `${Math.round((Date.now() - pending.timestamp) / 1000)}s`
        }))
    });
});

// ==================== TEST ENDPOINTS ====================
app.post("/api/test-call", (req, res) => {
    const { toUserId, fromUserId = "test-user", callType = "video" } = req.body;
    
    const receiverSocketId = getReceiverSocketId(toUserId);
    
    if (receiverSocketId) {
        const roomId = generateRoomId(fromUserId, toUserId);
        
        io.to(receiverSocketId).emit("incoming-call", {
            from: fromUserId,
            callType,
            roomId,
            timestamp: Date.now()
        });
        
        res.json({ 
            success: true, 
            message: `Test ${callType} call sent to ${toUserId}`,
            roomId,
            socketId: receiverSocketId
        });
    } else {
        res.status(404).json({ 
            success: false, 
            message: `User ${toUserId} not connected` 
        });
    }
});

app.get("/api/call-status", (req, res) => {
    res.json({
        activeRooms: callRooms.size,
        pendingCalls: pendingCalls.size,
        details: {
            active: Array.from(callRooms.entries()).map(([id, room]) => ({
                id,
                users: room.users.map(u => u.userId),
                type: room.callType
            })),
            pending: Array.from(pendingCalls.entries()).map(([id, pending]) => ({
                id,
                caller: pending.caller.userId,
                receiver: pending.receiverId
            }))
        }
    });
});

// ✅ Export server so main file can start it
export { io, server };