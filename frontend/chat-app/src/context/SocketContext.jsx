// SocketContext.js - Mobile-friendly version
import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const { authUser } = useAuthContext();

  // Function to detect if we should use local IP
  const getSocketUrl = () => {
    // Check if we're on mobile or accessing from another device
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1';
    
    if (isLocalhost) {
      return "http://localhost:5001";
    } else {
      // If accessing via IP (mobile), use the same hostname
      const protocol = window.location.protocol;
      const hostname = window.location.hostname;
      return `${protocol}//${hostname}:5001`;
    }
  };

  useEffect(() => {
    if (authUser && authUser._id) {
      const socketUrl = getSocketUrl();
      console.log(`🔗 Connecting to socket server: ${socketUrl}`);
      console.log(`📱 Current hostname: ${window.location.hostname}`);
      
      const socket = io(socketUrl, {
        query: {
          userId: authUser._id,
        },
        transports: ["polling"], // Use polling for better mobile compatibility
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
        timeout: 15000,
        forceNew: true,
        autoConnect: true,
        path: "/socket.io/",
        withCredentials: false
      });

      // Connection events
      socket.on("connect", () => {
        console.log(`✅ Socket CONNECTED to ${socketUrl}`);
        console.log(`Socket ID: ${socket.id}`);
        setConnectionStatus("connected");
      });

      socket.on("connect_error", (error) => {
        console.error(`❌ Socket CONNECT ERROR:`, error.message);
        setConnectionStatus("error");
        
        // Helpful error message for mobile users
        if (!window.location.hostname.includes('localhost')) {
          console.log(`💡 Mobile connection tip: Make sure your computer's IP is correct`);
          console.log(`💡 Current URL: ${socketUrl}`);
        }
      });

      socket.on("disconnect", (reason) => {
        console.log(`🔌 Socket DISCONNECTED: ${reason}`);
        setConnectionStatus("disconnected");
      });

      socket.on("connection-established", (data) => {
        console.log("✅ Server confirmed connection");
      });

      socket.on("getOnlineUsers", (users) => {
        console.log(`👥 Online users: ${users.length}`);
        setOnlineUsers(users);
      });

      setSocket(socket);
      setConnectionStatus("connecting");

      return () => {
        console.log("🧹 Cleaning up socket");
        if (socket && socket.connected) {
          socket.disconnect();
        }
      };
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      setOnlineUsers([]);
      setConnectionStatus("disconnected");
    }
  }, [authUser]);

  const manualReconnect = () => {
    if (socket) {
      console.log("🔄 Manual reconnect");
      socket.connect();
    }
  };

  return (
    <SocketContext.Provider value={{ 
      socket, 
      onlineUsers,
      connectionStatus,
      manualReconnect
    }}>
      {children}
    </SocketContext.Provider>
  );
};