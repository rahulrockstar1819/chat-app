// pages/TestSocket.jsx
import { useState, useEffect } from 'react';
import { useSocketContext } from '../../context/SocketContext';
import { useAuthContext } from '../../context/AuthContext';

const TestSocket = () => {
  const { authUser } = useAuthContext();
  const { socket, onlineUsers, connectionStatus } = useSocketContext();
  const [logs, setLogs] = useState([]);
  const [testUserIds, setTestUserIds] = useState([]);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-20), `${timestamp}: ${message}`]);
  };

  useEffect(() => {
    if (socket) {
      addLog(`Socket created: ${socket.id ? 'Yes' : 'No'}`);
      addLog(`Connected: ${socket.connected}`);
      addLog(`Connection Status: ${connectionStatus}`);
    }
  }, [socket, connectionStatus]);

  useEffect(() => {
    addLog(`Online users updated: ${onlineUsers.length} users`);
    setTestUserIds(onlineUsers);
  }, [onlineUsers]);

  const testConnection = () => {
    if (!socket) {
      addLog('❌ No socket instance');
      return;
    }
    
    addLog('🔍 Testing connection...');
    addLog(`Socket ID: ${socket.id}`);
    addLog(`Connected: ${socket.connected}`);
    addLog(`Transport: ${socket.io?.engine?.transport?.name}`);
    
    if (socket.connected) {
      addLog('✅ Socket is connected');
      socket.emit('getOnlineUsers');
    } else {
      addLog('❌ Socket is not connected');
    }
  };

  const simulateCall = () => {
    if (!socket.connected) {
      addLog('❌ Cannot simulate call: Socket not connected');
      return;
    }
    
    if (testUserIds.length > 1) {
      const otherUserId = testUserIds.find(id => id !== authUser._id);
      if (otherUserId) {
        addLog(`📞 Simulating call to: ${otherUserId}`);
        socket.emit('call-initiated', {
          offer: { type: 'offer', sdp: 'test-sdp' },
          to: otherUserId,
          callType: 'video'
        });
      } else {
        addLog('❌ No other user found to call');
      }
    } else {
      addLog('❌ Need at least 2 users online to test calls');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Socket Connection Test</h1>
      
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-3 h-3 rounded-full ${
            connectionStatus === 'connected' ? 'bg-green-500' :
            connectionStatus === 'error' ? 'bg-red-500' :
            'bg-yellow-500'
          }`}></div>
          <span className="text-lg">Status: {connectionStatus}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>Current User: {authUser?._id?.slice(0, 10)}...</div>
          <div>Socket ID: {socket?.id?.slice(0, 10)}...</div>
          <div>Connected: {socket?.connected ? 'Yes' : 'No'}</div>
          <div>Online Users: {onlineUsers.length}</div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button 
          onClick={testConnection}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Test Connection
        </button>
        <button 
          onClick={simulateCall}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
          disabled={!socket?.connected || onlineUsers.length < 2}
        >
          Test Call
        </button>
        <button 
          onClick={() => socket?.connect()}
          className="px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-700"
        >
          Manual Connect
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Online Users ({testUserIds.length})</h2>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {testUserIds.map((userId, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-700 rounded">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div className="font-mono text-sm">
                  {userId === authUser._id ? (
                    <span className="text-green-300">{userId.slice(0, 20)}... (You)</span>
                  ) : (
                    <span>{userId.slice(0, 20)}...</span>
                  )}
                </div>
              </div>
            ))}
            {testUserIds.length === 0 && (
              <div className="text-gray-400 italic">No users online</div>
            )}
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Connection Logs</h2>
          <div className="font-mono text-sm space-y-1 max-h-60 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className={`p-1 ${log.includes('❌') ? 'text-red-300' : log.includes('✅') ? 'text-green-300' : 'text-gray-300'}`}>
                {log}
              </div>
            ))}
            {logs.length === 0 && (
              <div className="text-gray-400 italic">No logs yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSocket;