// components/ConnectionStatus.jsx
import { useSocketContext } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";

const ConnectionStatus = () => {
  const { authUser } = useAuthContext();
  const { socket, onlineUsers, connectionStatus } = useSocketContext();
  
  if (!authUser) return null;
  
  return (
    <div className="fixed top-4 right-4 z-50 bg-black bg-opacity-80 text-white p-3 rounded-lg text-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-3 h-3 rounded-full ${
          connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' :
          connectionStatus === 'error' ? 'bg-red-500' :
          'bg-yellow-500'
        }`}></div>
        <span className="font-semibold">
          {connectionStatus === 'connected' ? '🟢 Connected' :
           connectionStatus === 'error' ? '🔴 Connection Error' :
           '🟡 Connecting...'}
        </span>
      </div>
      <div className="text-xs text-gray-300 space-y-1">
        <div>User: {authUser.fullname || authUser.username}</div>
        <div>ID: {authUser._id?.slice(0, 8)}...</div>
        <div>Socket: {socket?.id?.slice(0, 8)}...</div>
        <div>Online Users: {onlineUsers.length}</div>
      </div>
    </div>
  );
};

export default ConnectionStatus;