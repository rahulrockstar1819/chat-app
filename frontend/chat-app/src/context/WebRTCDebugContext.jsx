// context/WebRTCDebugContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';

const WebRTCDebugContext = createContext();

export const useWebRTCDebug = () => {
  const context = useContext(WebRTCDebugContext);
  if (!context) {
    throw new Error('useWebRTCDebug must be used within WebRTCDebugProvider');
  }
  return context;
};

export const WebRTCDebugProvider = ({ children }) => {
  const [debugLog, setDebugLog] = useState([]);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isCallIncoming, setIsCallIncoming] = useState(false);
  const [callData, setCallData] = useState(null);
  const [incomingCallData, setIncomingCallData] = useState(null);
  const [connectionState, setConnectionState] = useState('new');
  const [iceConnectionState, setIceConnectionState] = useState('new');
  const [socketConnected, setSocketConnected] = useState(false);
  const [mediaError, setMediaError] = useState(null);
  const [callStats, setCallStats] = useState(null);

  const log = useCallback((message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] [${type.toUpperCase()}] ${message}`;
    setDebugLog(prev => [...prev.slice(-50), logEntry]); // Keep last 50 logs
    console.log(`WebRTC Debug: ${logEntry}`);
  }, []);

  const updateCallState = useCallback((state) => {
    setIsCallActive(state.isCallActive || false);
    setIsCallIncoming(state.isCallIncoming || false);
    setCallData(state.callData || null);
    setIncomingCallData(state.incomingCallData || null);
    setConnectionState(state.connectionState || 'new');
    setIceConnectionState(state.iceConnectionState || 'new');
    setSocketConnected(state.socketConnected || false);
    setMediaError(state.mediaError || null);
  }, []);

  const updateStats = useCallback((stats) => {
    setCallStats(stats);
  }, []);

  const getCallStats = useCallback(() => callStats, [callStats]);

  const clearLogs = useCallback(() => {
    setDebugLog([]);
  }, []);

  const value = {
    debugLog,
    isCallActive,
    isCallIncoming,
    callData,
    incomingCallData,
    connectionState,
    iceConnectionState,
    socketConnected,
    mediaError,
    getCallStats,
    log,
    updateCallState,
    updateStats,
    clearLogs
  };

  return (
    <WebRTCDebugContext.Provider value={value}>
      {children}
    </WebRTCDebugContext.Provider>
  );
};