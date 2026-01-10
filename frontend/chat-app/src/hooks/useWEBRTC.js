// hooks/useWebRTC.js - SIMPLIFIED WORKING VERSION
import { useState, useRef, useEffect, useCallback } from 'react';
import { useSocketContext } from '../context/SocketContext';
import { useAuthContext } from '../context/AuthContext';

export const useWebRTC = () => {
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();
  
  // State
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isCallIncoming, setIsCallIncoming] = useState(false);
  const [incomingCallData, setIncomingCallData] = useState(null);
  const [callType, setCallType] = useState('video');
  const [mediaError, setMediaError] = useState(null);
  const [callData, setCallData] = useState(null);
  
  // Refs
  const peerConnection = useRef(null);
  const localStreamRef = useRef(null);
  const currentRoomId = useRef(null);
  
  // Socket event handlers
  useEffect(() => {
    if (!socket) return;
    
    console.log("🔌 Setting up WebRTC socket listeners...");
    
    const handleIncomingCall = (data) => {
      console.log("📞 INCOMING CALL RECEIVED:", data);
      setIncomingCallData(data);
      setIsCallIncoming(true);
      setCallType(data.callType || 'video');
    };
    
    const handleCallAccepted = (data) => {
      console.log("✅ Call accepted by peer:", data);
      setIsCallActive(true);
      setIsCallIncoming(false);
      setIncomingCallData(null);
      
      // Handle WebRTC signaling
      if (peerConnection.current && data.answer) {
        handleWebRTCSignal({ signal: data.answer, type: 'answer' });
      }
    };
    
    const handleCallEnded = (data) => {
      console.log("📞 Call ended:", data);
      setMediaError(data?.reason || "Call ended");
      cleanup();
    };
    
    const handleCallRejected = (data) => {
      console.log("❌ Call rejected:", data);
      setIsCallIncoming(false);
      setIncomingCallData(null);
    };
    
    const handleCallError = (data) => {
      console.log("❌ Call error:", data);
      setMediaError(data?.message || "Call error");
    };
    
    // Setup listeners
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);
    socket.on("call-ended", handleCallEnded);
    socket.on("call-rejected", handleCallRejected);
    socket.on("call-error", handleCallError);
    
    return () => {
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
      socket.off("call-ended", handleCallEnded);
      socket.off("call-rejected", handleCallRejected);
      socket.off("call-error", handleCallError);
    };
  }, [socket]);
  
  // Get local media
  const getLocalMedia = useCallback(async (type = 'video') => {
    try {
      setMediaError(null);
      
      const constraints = {
        audio: true,
        video: type === 'video' ? {
          width: { ideal: 640 },
          height: { ideal: 480 },
          frameRate: { ideal: 30 }
        } : false
      };
      
      console.log("🎥 Requesting media with constraints:", constraints);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      localStreamRef.current = stream;
      setLocalStream(stream);
      console.log("✅ Media obtained:", stream.id);
      
      return stream;
    } catch (error) {
      console.error("❌ Media error:", error);
      setMediaError(`Failed to access ${type === 'video' ? 'camera' : 'microphone'}: ${error.message}`);
      throw error;
    }
  }, []);
  
  // Setup WebRTC connection
  const setupPeerConnection = useCallback(async (type = 'video') => {
    try {
      const stream = await getLocalMedia(type);
      
      peerConnection.current = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" }
        ]
      });
      
      // Add local tracks
      stream.getTracks().forEach(track => {
        peerConnection.current.addTrack(track, stream);
      });
      
      // Handle remote stream
      peerConnection.current.ontrack = (event) => {
        console.log("📹 Remote track received:", event.track.kind);
        if (event.streams && event.streams[0]) {
          setRemoteStream(event.streams[0]);
        }
      };
      
      // ICE candidates
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate && currentRoomId.current && callData?.otherUserId) {
          socket.emit("ice-candidate", {
            to: callData.otherUserId,
            candidate: event.candidate
          });
        }
      };
      
      console.log("✅ Peer connection setup complete");
      return true;
    } catch (error) {
      console.error("❌ Peer connection setup failed:", error);
      setMediaError(error.message);
      return false;
    }
  }, [socket, getLocalMedia, callData]);
  
  // Handle WebRTC signaling
  const handleWebRTCSignal = useCallback(async (data) => {
    if (!peerConnection.current) return;
    
    try {
      if (data.type === 'offer') {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(data.signal)
        );
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        
        socket.emit("webrtc-signal", {
          to: incomingCallData?.from,
          signal: answer,
          type: 'answer'
        });
      } else if (data.type === 'answer') {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(data.signal)
        );
      }
    } catch (error) {
      console.error("WebRTC signaling error:", error);
    }
  }, [socket, incomingCallData]);
  
  // Start a call
  const startCall = useCallback(async (otherUserId, type = 'video') => {
    try {
      console.log(`📞 Starting ${type} call to ${otherUserId}`);
      
      setMediaError(null);
      setCallType(type);
      
      // Setup peer connection
      const success = await setupPeerConnection(type);
      if (!success) throw new Error("WebRTC setup failed");
      
      // Create offer
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      
      // Send call initiation
      socket.emit("call-initiate", {
        to: otherUserId,
        callType: type,
        offer: offer
      });
      
      setCallData({
        otherUserId,
        isCaller: true,
        startTime: Date.now()
      });
      
      currentRoomId.current = `call_${Date.now()}_${authUser?._id}_${otherUserId}`;
      
      console.log("✅ Call initiated successfully");
      
    } catch (error) {
      console.error("❌ Start call error:", error);
      setMediaError(error.message);
      cleanup();
    }
  }, [socket, setupPeerConnection, authUser]);
  
  // Accept incoming call
  const acceptIncomingCall = useCallback(async () => {
    if (!incomingCallData) {
      console.error("No incoming call to accept");
      return;
    }
    
    try {
      console.log(`✅ Accepting call from ${incomingCallData.from}`);
      
      setMediaError(null);
      
      // Setup peer connection
      const success = await setupPeerConnection(incomingCallData.callType);
      if (!success) throw new Error("WebRTC setup failed");
      
      // Create answer
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      
      // Send acceptance
      socket.emit("call-accept", {
        to: incomingCallData.from,
        answer: answer
      });
      
      setCallData({
        otherUserId: incomingCallData.from,
        isCaller: false,
        startTime: Date.now()
      });
      
      setIsCallActive(true);
      setIsCallIncoming(false);
      setIncomingCallData(null);
      
      console.log("✅ Call accepted successfully");
      
    } catch (error) {
      console.error("❌ Accept call error:", error);
      setMediaError(error.message);
      cleanup();
    }
  }, [socket, incomingCallData, setupPeerConnection]);
  
  // Reject incoming call
  const rejectIncomingCall = useCallback(() => {
    if (!incomingCallData) return;
    
    console.log(`❌ Rejecting call from ${incomingCallData.from}`);
    
    socket.emit("call-reject", {
      to: incomingCallData.from
    });
    
    setIsCallIncoming(false);
    setIncomingCallData(null);
  }, [socket, incomingCallData]);
  
  // End call
  const endCall = useCallback(() => {
    console.log("📞 Ending call");
    
    if (callData?.otherUserId) {
      socket.emit("call-ended", {
        to: callData.otherUserId,
        reason: "User ended call"
      });
    }
    
    cleanup();
  }, [socket, callData]);
  
  // Cleanup
  const cleanup = useCallback(() => {
    console.log("🧹 Cleaning up WebRTC");
    
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }
    
    setLocalStream(null);
    setRemoteStream(null);
    setIsCallActive(false);
    setIsCallIncoming(false);
    setIncomingCallData(null);
    setCallData(null);
    setMediaError(null);
    currentRoomId.current = null;
  }, []);
  
  // Toggle audio
  const toggleAudio = useCallback(() => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        console.log(`🎤 Audio ${audioTrack.enabled ? 'unmuted' : 'muted'}`);
        return audioTrack.enabled;
      }
    }
    return false;
  }, []);
  
  // Toggle video
  const toggleVideo = useCallback(() => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        console.log(`📹 Video ${videoTrack.enabled ? 'enabled' : 'disabled'}`);
        return videoTrack.enabled;
      }
    }
    return false;
  }, []);
  
  // Switch camera
  const switchCamera = useCallback(async () => {
    if (!localStreamRef.current) return;
    
    try {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (!videoTrack) return;
      
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(d => d.kind === 'videoinput');
      
      if (videoDevices.length < 2) {
        setMediaError("Only one camera available");
        return;
      }
      
      // Stop current track
      videoTrack.stop();
      
      // Get new camera
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      const newVideoTrack = newStream.getVideoTracks()[0];
      
      // Replace track in peer connection
      const sender = peerConnection.current?.getSenders()
        .find(s => s.track?.kind === 'video');
      
      if (sender) {
        sender.replaceTrack(newVideoTrack);
      }
      
      // Update local stream
      localStreamRef.current.removeTrack(videoTrack);
      localStreamRef.current.addTrack(newVideoTrack);
      
      setLocalStream(new MediaStream(localStreamRef.current.getTracks()));
      
      console.log("🔄 Camera switched");
      
    } catch (error) {
      console.error("❌ Switch camera error:", error);
      setMediaError("Failed to switch camera");
    }
  }, []);
  
  return {
    // State
    localStream,
    remoteStream,
    isCallActive,
    isCallIncoming,
    incomingCallData,
    callType,
    mediaError,
    callData,
    
    // Actions
    startCall,
    endCall,
    acceptIncomingCall,
    rejectIncomingCall,
    toggleAudio,
    toggleVideo,
    switchCamera,
    
    // Cleanup
    cleanup
  };
};