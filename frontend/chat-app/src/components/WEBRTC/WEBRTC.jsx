import React, { useState, useEffect, useRef } from 'react';
import { initiateCall, answerCall } from '../../utils/signalling'; // Import signaling logic

const WebRTC = () => {
  const [isInitiator, setIsInitiator] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  
  const mediaConstraints = { video: true, audio: true };
  
  const [localStream, setLocalStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  
  useEffect(() => {
    const startMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
        setLocalStream(stream);
        localVideoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };
    startMediaStream();

    // Listen for signaling events
    initiateCall(remoteVideoRef, localStream, setIsConnected, setPeerConnection);
    
    return () => {
      // Cleanup
      if (peerConnection) {
        peerConnection.close();
      }
    };
  }, [peerConnection, localStream]);

  const startCall = () => {
    setIsInitiator(true);
    initiateCall(remoteVideoRef, localStream, setIsConnected, setPeerConnection);
  };

  const answerIncomingCall = () => {
    setIsInitiator(false);
    answerCall(remoteVideoRef, localStream, setIsConnected, setPeerConnection);
  };

  return (
    <div>
      <h2>WebRTC Simple Video Chat</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <video ref={localVideoRef} autoPlay muted style={{ width: '45%' }} />
        <video ref={remoteVideoRef} autoPlay style={{ width: '45%' }} />
      </div>
      <div>
        {!isConnected && (
          <button onClick={startCall}>{isInitiator ? 'Start Call' : 'Answer Call'}</button>
        )}
      </div>
    </div>
  );
};

export default WebRTC;
