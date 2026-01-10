import { useState } from 'react';

const WebRTCDebugPanel = () => {
  const [logs, setLogs] = useState([]);
  
  if (process.env.NODE_ENV !== 'development') return null;
  
  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-10), `${timestamp}: ${message}`]);
  };
  
  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg max-w-sm">
      <h3 className="font-bold mb-2">WebRTC Debug</h3>
      <div className="text-xs space-y-1 max-h-40 overflow-y-auto">
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default WebRTCDebugPanel;