// import { useSocketContext } from "../context/SocketContext";

// const DebugSocket = () => {
//   const { socket, onlineUsers, connectionStatus, connectionDetails, manualReconnect, refreshOnlineUsers } = useSocketContext();
  
//   // Only show in development
//   if (process.env.NODE_ENV !== 'development') return null;
  
//   const transport = socket?.io?.engine?.transport?.name;
//   const isConnected = socket?.connected;
  
//   // Connection status colors
//   const statusColors = {
//     connected: 'bg-green-500',
//     error: 'bg-red-500',
//     disconnected: 'bg-yellow-500',
//     connecting: 'bg-blue-500'
//   };
  
//   return (
//     <div className="fixed bottom-4 right-4 z-50 bg-gray-900 text-white p-3 rounded-lg shadow-lg max-w-xs font-mono text-xs border border-gray-700">
//       <div className="flex justify-between items-center mb-2">
//         <div className="flex items-center gap-2">
//           <div className={`w-2 h-2 rounded-full ${statusColors[connectionStatus] || 'bg-gray-500'}`}></div>
//           <span className="font-bold">Socket Debug</span>
//         </div>
//         <div className="flex gap-1">
//           <button 
//             onClick={manualReconnect}
//             className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded"
//             title="Reconnect"
//           >
//             🔄
//           </button>
//           <button 
//             onClick={refreshOnlineUsers}
//             className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded"
//             title="Refresh Online Users"
//           >
//             👥
//           </button>
//         </div>
//       </div>
      
//       <div className="space-y-1 text-gray-300">
//         <div className="grid grid-cols-2 gap-1">
//           <span>Status:</span>
//           <span className={connectionStatus === 'connected' ? 'text-green-400' : 'text-red-400'}>
//             {connectionStatus}
//           </span>
//         </div>
        
//         <div className="grid grid-cols-2 gap-1">
//           <span>Transport:</span>
//           <span className="text-blue-400">{transport || 'N/A'}</span>
//         </div>
        
//         <div className="grid grid-cols-2 gap-1">
//           <span>Connected:</span>
//           <span className={isConnected ? 'text-green-400' : 'text-red-400'}>
//             {isConnected ? 'YES' : 'NO'}
//           </span>
//         </div>
        
//         <div className="grid grid-cols-2 gap-1">
//           <span>Socket ID:</span>
//           <span className="text-purple-400 truncate" title={socket?.id}>
//             {socket?.id ? `${socket.id.slice(0, 10)}...` : 'N/A'}
//           </span>
//         </div>
        
//         <div className="grid grid-cols-2 gap-1">
//           <span>Online Users:</span>
//           <div className="flex items-center gap-1">
//             <span className="text-yellow-400">{onlineUsers.length}</span>
//             {onlineUsers.length === 0 && isConnected && (
//               <span className="text-red-400 text-[10px]">(Empty!)</span>
//             )}
//           </div>
//         </div>
//       </div>
      
//       {/* Show connection details if available */}
//       {connectionDetails && (
//         <div className="mt-2 pt-2 border-t border-gray-700">
//           <div className="text-gray-400 text-[10px]">Connection Details:</div>
//           <div className="text-[10px] text-gray-300 space-y-1">
//             <div>Transport: {connectionDetails.transport}</div>
//             <div>Connected: {connectionDetails.connectedAt?.split('T')[1]?.split('.')[0]}</div>
//             {connectionDetails.serverConfirm && (
//               <div>Server ID: {connectionDetails.serverConfirm.userId?.slice(0, 10)}...</div>
//             )}
//           </div>
//         </div>
//       )}
      
//       {/* Show online users if any */}
//       {onlineUsers.length > 0 && (
//         <div className="mt-2 pt-2 border-t border-gray-700">
//           <div className="text-gray-400 text-[10px]">Connected Users ({onlineUsers.length}):</div>
//           <div className="text-[10px] text-gray-300 space-y-1 max-h-20 overflow-y-auto">
//             {onlineUsers.map((userId, index) => (
//               <div key={index} className="flex items-center gap-2">
//                 <div className="w-1 h-1 rounded-full bg-green-400"></div>
//                 <span title={userId}>{userId.slice(0, 15)}...</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
      
//       {/* Show debug info when no users are online but connected */}
//       {isConnected && onlineUsers.length === 0 && (
//         <div className="mt-2 pt-2 border-t border-red-700">
//           <div className="text-red-300 text-[10px] mb-1">⚠️ Debug Info:</div>
//           <ul className="text-[9px] text-gray-400 space-y-1 pl-2">
//             <li>• Connected but no users in list</li>
//             <li>• Check server userSocketMap</li>
//             <li>• User might not be added to map</li>
//             <li>• Click 👥 button to refresh</li>
//           </ul>
//         </div>
//       )}
      
//       {/* Connection troubleshooting tips */}
//       {!isConnected && connectionStatus === 'error' && (
//         <div className="mt-2 pt-2 border-t border-gray-700">
//           <div className="text-[10px] text-red-300 mb-1">⚠️ Troubleshooting:</div>
//           <ul className="text-[9px] text-gray-400 space-y-1 pl-2">
//             <li>• Run: <code>curl http://localhost:5000/health</code></li>
//             <li>• Check server console logs</li>
//             <li>• Verify server is running on port 5000</li>
//             <li>• Check browser console for errors</li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DebugSocket ;