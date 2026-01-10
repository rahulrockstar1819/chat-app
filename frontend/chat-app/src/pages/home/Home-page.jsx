import Sidebar from "../../components/sidebar/sidebar";
import useConversations from "../../zustand/useConversation";
import { Avatar } from "@heroui/react";
import { IoArrowBack } from "react-icons/io5";
import { MessageInput } from "./Message-Input";
import Messages from "./Messages";
import { IoVideocam } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMic, IoMicOff, IoVideocamOff, IoCameraReverse } from "react-icons/io5";
import { useWebRTC } from "../../hooks/useWEBRTC";
import { useEffect, useRef, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import { useAuthContext } from "../../context/AuthContext";

const Home = () => {
  const selectedConversation = useConversations(state => state.selectedConversation);
  const setSelectedConversation = useConversations(state => state.setSelectedConversation);
  const messagesEndRef = useRef(null);
  const [callTimer, setCallTimer] = useState(0);
  const timerRef = useRef(null);

  const { authUser } = useAuthContext();
  const { socket, onlineUsers } = useSocketContext();
  
  const { 
    localStream, 
    remoteStream, 
    isCallActive,
    isCallIncoming,
    incomingCallData,
    callType,
    mediaError,
    startCall,
    endCall,
    acceptIncomingCall,
    rejectIncomingCall,
    toggleAudio,
    toggleVideo,
    switchCamera
  } = useWebRTC();

  // Debug log
  useEffect(() => {
    console.log("📞 CALL DEBUG:", {
      isCallIncoming,
      incomingCallData,
      isCallActive,
      callType,
      mediaError,
      selectedConversation: selectedConversation?._id
    });
  }, [isCallIncoming, incomingCallData, isCallActive, callType, mediaError, selectedConversation]);

  // TEST: Force show incoming call for debugging
  const [testIncomingCall, setTestIncomingCall] = useState(false);
  
  // Format call timer
  const formatCallTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start/stop call timer
  useEffect(() => {
    if (isCallActive) {
      timerRef.current = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setCallTimer(0);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [isCallActive]);

  const handleVideoCall = () => {
    if (selectedConversation) {
      console.log("📹 Starting video call to:", selectedConversation._id);
      startCall(selectedConversation._id, 'video');
    }
  };

  const handleAudioCall = () => {
    if (selectedConversation) {
      console.log("📞 Starting audio call to:", selectedConversation._id);
      startCall(selectedConversation._id, 'audio');
    }
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation]);

  // Determine what to show
  const showIncomingCallUI = isCallIncoming || testIncomingCall;
  const showActiveCallUI = isCallActive;

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white relative">
      {/* Debug panel */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 left-4 z-[100] bg-black/90 p-4 rounded-lg text-xs border border-gray-700">
          <div className="font-bold mb-2">🔍 CALL DEBUG</div>
          <div>📞 Incoming: <span className={isCallIncoming ? "text-green-400" : "text-red-400"}>
            {isCallIncoming ? "YES" : "NO"}
          </span></div>
          <div>📱 Active: <span className={isCallActive ? "text-green-400" : "text-red-400"}>
            {isCallActive ? "YES" : "NO"}
          </span></div>
          <div>🆔 From: {incomingCallData?.from || "None"}</div>
          <div>🎥 Type: {incomingCallData?.callType || "None"}</div>
          <div>🆔 Room: {incomingCallData?.roomId?.substring(0, 20) || "None"}</div>
          
          <div className="mt-2 pt-2 border-t border-gray-700">
            <button 
              onClick={() => setTestIncomingCall(true)}
              className="px-2 py-1 bg-blue-600 text-xs rounded mr-2"
            >
              Test Call
            </button>
            <button 
              onClick={() => setTestIncomingCall(false)}
              className="px-2 py-1 bg-red-600 text-xs rounded"
            >
              Hide Test
            </button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`${selectedConversation ? "hidden md:flex" : "flex"} 
        w-full md:w-[30%] lg:w-[25%] xl:w-[20%] border-r border-gray-800`}>
        <Sidebar />
      </div>
      
      {/* Chat Container - Always visible unless call is active */}
      <div className={`${selectedConversation ? "flex" : "hidden md:flex"} 
        flex-1 flex-col h-full relative ${showActiveCallUI ? 'hidden' : ''}`}>
        
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1f2c34] border-b border-gray-800 z-10">
              <div className="flex items-center">
                <button 
                  onClick={() => setSelectedConversation(null)}
                  className="md:hidden mr-4 p-2 hover:bg-gray-800 rounded-full"
                >
                  <IoArrowBack className="text-xl" />
                </button>
                
                <Avatar 
                  src={selectedConversation.profilePic} 
                  className="h-10 w-10 cursor-pointer"
                  isBordered
                  radius="full"
                />
                
                <div className="ml-4">
                  <h2 className="font-semibold text-lg">
                    {selectedConversation.fullname}
                  </h2>
                  <p className="text-xs text-gray-400">online</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleAudioCall}
                  className="p-3 hover:bg-gray-900 rounded-full transition-colors"
                  title="Audio call"
                  disabled={isCallActive || isCallIncoming}
                >
                  <IoCall className={`text-xl ${isCallActive || isCallIncoming ? 'text-gray-600' : ''}`} />
                </button>
                
                <button
                  onClick={() => {
                    if (mediaError) {
                      alert(`Cannot start call: ${mediaError}`);
                    } else {
                      handleVideoCall();
                    }
                  }}
                  className="p-3 hover:bg-gray-800 rounded-full transition-colors"
                  title="Video call"
                  disabled={isCallActive || isCallIncoming}
                >
                  <IoVideocam className={`text-xl ${isCallActive || isCallIncoming ? 'text-gray-600' : ''}`} />
                </button>
                
                <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                  <BsThreeDotsVertical className="text-xl" />
                </button>
              </div>
            </div>
            
            {/* Messages Container */}
            <div className={`flex-1 overflow-hidden bg-[url('https://web.whatsapp.com/img/bg-chat-tile-light_686b98c9fdffef3f63127759e2057750.png')] bg-repeat bg-opacity-5`}>
              <div className="flex flex-col h-full bg-gradient-to-b from-[#0c1317] via-[#0c1317] to-[#0a1014]">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4">
                  <Messages />
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Message Input */}
                <div className="p-3 bg-[#1f2c34]">
                  <MessageInput />
                </div>
              </div>
            </div>
          </>
        ) : (
          // Empty State
          <div className="hidden md:flex flex-col items-center justify-center h-full bg-gradient-to-br from-[#0c1317] to-[#0a1014]">
            <div className="text-center px-8">
              <div className="w-48 h-48 mx-auto mb-8 bg-gradient-to-br from-green-900 to-green-700 rounded-full flex items-center justify-center">
                <div className="w-40 h-40 bg-gradient-to-br from-green-800 to-green-600 rounded-full flex items-center justify-center">
                  <div className="text-6xl">💬</div>
                </div>
              </div>
              <h1 className="text-3xl font-light mb-4">WhatsApp Web</h1>
              <p className="text-gray-400 mb-2">
                Send and receive messages without keeping your phone online.
              </p>
              <p className="text-gray-400">
                Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ==================== INCOMING CALL NOTIFICATION ==================== */}
      {(showIncomingCallUI || testIncomingCall) && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Semi-transparent overlay */}
          <div 
            className="absolute inset-0 bg-black/90"
            onClick={() => {
              if (isCallIncoming) {
                rejectIncomingCall();
              } else {
                setTestIncomingCall(false);
              }
            }}
          />
          
          {/* Call notification card */}
          <div className="relative z-10 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mb-4 animate-pulse">
                {(incomingCallData?.callType === 'video' || testIncomingCall) ? (
                  <IoVideocam className="text-4xl text-white" />
                ) : (
                  <IoCall className="text-4xl text-white" />
                )}
              </div>
              
              <h2 className="text-2xl font-bold mb-2 text-white">
                Incoming {(incomingCallData?.callType === 'video' || testIncomingCall) ? 'Video' : 'Audio'} Call
              </h2>
              
              <p className="text-gray-300 mb-2">
                From: <span className="font-semibold text-blue-300">
                  {incomingCallData?.from || (selectedConversation?.fullname || 'Unknown User')}
                </span>
              </p>
              
              <p className="text-sm text-gray-400 mb-6">
                Click outside or press reject to decline
              </p>
              
              <div className="flex justify-center gap-6">
                <button
                  onClick={() => {
                    if (isCallIncoming) {
                      rejectIncomingCall();
                    } else {
                      setTestIncomingCall(false);
                    }
                  }}
                  className="flex flex-col items-center justify-center p-4 bg-red-600 hover:bg-red-700 rounded-full transition-all duration-200 transform hover:scale-105"
                  title="Reject"
                >
                  <IoCall className="text-2xl rotate-[135deg]" />
                  <span className="text-xs mt-2">Reject</span>
                </button>
                
                <button
                  onClick={() => {
                    if (isCallIncoming) {
                      acceptIncomingCall();
                    } else {
                      setTestIncomingCall(false);
                      // Start a test call
                      if (selectedConversation) {
                        startCall(selectedConversation._id, 'video');
                      }
                    }
                  }}
                  className="flex flex-col items-center justify-center p-4 bg-green-600 hover:bg-green-700 rounded-full transition-all duration-200 transform hover:scale-105"
                  title="Accept"
                >
                  <IoCall className="text-2xl" />
                  <span className="text-xs mt-2">Accept</span>
                </button>
              </div>
              
              {/* Debug info */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-6 p-3 bg-gray-900/50 rounded-lg text-xs border border-gray-700">
                  <div className="font-mono">
                    <div>isCallIncoming: {isCallIncoming.toString()}</div>
                    <div>testIncomingCall: {testIncomingCall.toString()}</div>
                    <div>Data exists: {!!incomingCallData ? "YES" : "NO"}</div>
                    {incomingCallData && (
                      <>
                        <div>From: {incomingCallData.from}</div>
                        <div>Room: {incomingCallData.roomId}</div>
                        <div>Type: {incomingCallData.callType}</div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================== ACTIVE CALL UI ==================== */}
      {showActiveCallUI && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
          {/* Top bar with call info */}
          <div className="flex items-center justify-between p-4 bg-black/80 backdrop-blur-sm">
            <div className="flex items-center">
              <Avatar 
                src={selectedConversation?.profilePic} 
                className="h-10 w-10"
                isBordered
                radius="full"
              />
              <div className="ml-3">
                <h3 className="font-semibold text-white">{selectedConversation?.fullname}</h3>
                <p className="text-sm text-green-400">
                  {callType === 'video' ? 'Video' : 'Audio'} call • {formatCallTime(callTimer)}
                </p>
              </div>
            </div>
            
            <button 
              onClick={endCall}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <IoCall className="rotate-[135deg]" />
              End Call
            </button>
          </div>
          
          {/* Video Grid */}
          <div className="flex-1 flex items-center justify-center relative">
            {/* Remote Video */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
              {remoteStream && callType === 'video' ? (
                <video 
                  autoPlay 
                  playsInline 
                  ref={video => {
                    if (video && remoteStream) {
                      video.srcObject = remoteStream;
                      video.onloadedmetadata = () => video.play();
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              ) : callType === 'audio' ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <Avatar 
                    src={selectedConversation?.profilePic} 
                    className="h-48 w-48"
                    isBordered
                    radius="full"
                  />
                  <p className="mt-6 text-xl text-white">Audio call in progress...</p>
                  <p className="text-green-400 text-2xl font-mono mt-2">{formatCallTime(callTimer)}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-32 h-32 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-xl text-white">Connecting...</p>
                </div>
              )}
            </div>
            
            {/* Local Video (PiP) - Only for video calls */}
            {callType === 'video' && localStream && (
              <div className="absolute bottom-6 right-6 w-48 h-32 bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-700 shadow-2xl">
                <video 
                  autoPlay 
                  playsInline 
                  muted
                  ref={video => {
                    if (video && localStream) {
                      video.srcObject = localStream;
                      video.onloadedmetadata = () => video.play();
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* Call Controls */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
              <button 
                onClick={toggleAudio}
                className="p-4 bg-gray-800/70 hover:bg-gray-700/90 rounded-full backdrop-blur-sm transition-all duration-200"
                title={localStream?.getAudioTracks()[0]?.enabled ? "Mute" : "Unmute"}
              >
                {localStream?.getAudioTracks()[0]?.enabled ? (
                  <IoMic className="text-xl text-white" />
                ) : (
                  <IoMicOff className="text-xl text-red-500" />
                )}
              </button>
              
              {callType === 'video' && (
                <>
                  <button 
                    onClick={toggleVideo}
                    className="p-4 bg-gray-800/70 hover:bg-gray-700/90 rounded-full backdrop-blur-sm transition-all duration-200"
                    title={localStream?.getVideoTracks()[0]?.enabled ? "Turn off video" : "Turn on video"}
                  >
                    {localStream?.getVideoTracks()[0]?.enabled ? (
                      <IoVideocam className="text-xl text-white" />
                    ) : (
                      <IoVideocamOff className="text-xl text-red-500" />
                    )}
                  </button>
                  
                  <button 
                    onClick={switchCamera}
                    className="p-4 bg-gray-800/70 hover:bg-gray-700/90 rounded-full backdrop-blur-sm transition-all duration-200"
                    title="Switch camera"
                  >
                    <IoCameraReverse className="text-xl text-white" />
                  </button>
                </>
              )}
              
              <button 
                onClick={endCall}
                className="p-4 bg-red-600 hover:bg-red-700 rounded-full transition-all duration-200"
                title="End call"
              >
                <IoCall className="text-xl rotate-[135deg] text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {mediaError && (
        <div className="fixed top-4 right-4 z-[100] bg-red-600 text-white p-4 rounded-lg shadow-lg max-w-md animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2">⚠️</span>
              <span>{mediaError}</span>
            </div>
            <button 
              onClick={() => {}}
              className="ml-4 text-white hover:text-gray-200 text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;