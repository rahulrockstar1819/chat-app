// components/WebRTCTest.jsx
import { useWebRTC } from '../hooks/useWEBRTC';
import { useWebRTCDebug } from '../context/WebRTCDebugContext';

const WebRTCTest = () => {
  const webrtc = useWebRTC();
  const debug = useWebRTCDebug();

  const simulateIncomingCall = () => {
    debug.log('Simulating incoming call from test-user', 'CALL');
    debug.updateCallState({
      isCallIncoming: true,
      incomingCallData: {
        from: 'test-user-123',
        callType: 'video',
        timestamp: Date.now()
      }
    });
  };

  const simulateActiveCall = () => {
    debug.log('Simulating active call', 'CALL');
    debug.updateCallState({
      isCallActive: true,
      callData: {
        otherUserId: 'test-peer-456',
        isCaller: true,
        startTime: Date.now()
      },
      connectionState: 'connected',
      iceConnectionState: 'connected'
    });
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 p-4 bg-gray-800 rounded-lg">
      <h3 className="text-white font-bold">WebRTC Test</h3>
      <div className="flex gap-2">
        <button 
          onClick={simulateIncomingCall}
          className="px-3 py-2 bg-yellow-600 hover:bg-yellow-700 rounded text-white text-sm"
        >
          Simulate Incoming Call
        </button>
        <button 
          onClick={simulateActiveCall}
          className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-white text-sm"
        >
          Simulate Active Call
        </button>
        <button 
          onClick={() => debug.updateCallState({
            isCallActive: false,
            isCallIncoming: false,
            callData: null,
            incomingCallData: null
          })}
          className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
        >
          Clear All
        </button>
      </div>
      <div className="text-white text-sm mt-2">
        <div>Hook State:</div>
        <div>Call Active: {webrtc.isCallActive ? 'Yes' : 'No'}</div>
        <div>Incoming: {webrtc.isCallIncoming ? 'Yes' : 'No'}</div>
      </div>
    </div>
  );
};

export default WebRTCTest;