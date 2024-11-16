import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Your signaling server URL

export const initiateCall = (remoteVideoRef, localStream, setIsConnected, setPeerConnection) => {
  const pc = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  });
  
  setPeerConnection(pc);
  
  localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
  
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit('ice-candidate', event.candidate);
    }
  };

  pc.ontrack = (event) => {
    remoteVideoRef.current.srcObject = event.streams[0];
    setIsConnected(true);
  };

  // Create and send offer to the other peer
  pc.createOffer().then((offer) => {
    pc.setLocalDescription(offer);
    socket.emit('offer', offer);
  });
  
  socket.on('answer', (answer) => {
    pc.setRemoteDescription(answer);
  });
  
  socket.on('ice-candidate', (candidate) => {
    pc.addIceCandidate(candidate);
  });
};

export const answerCall = (remoteVideoRef, localStream, setIsConnected, setPeerConnection) => {
  const pc = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  });

  setPeerConnection(pc);
  
  localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
  
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit('ice-candidate', event.candidate);
    }
  };

  pc.ontrack = (event) => {
    remoteVideoRef.current.srcObject = event.streams[0];
    setIsConnected(true);
  };

  socket.on('offer', (offer) => {
    pc.setRemoteDescription(offer);
    pc.createAnswer().then((answer) => {
      pc.setLocalDescription(answer);
      socket.emit('answer', answer);
    });
  });

  socket.on('ice-candidate', (candidate) => {
    pc.addIceCandidate(candidate);
  });
};
