import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import { useAuthContext } from "../../context/AuthContext";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages = [] } = useGetMessages();
  const { authUser } = useAuthContext();
  const messagesEndRef = useRef(null);
  useListenMessages();
  console.log("New messages", messages)

  const isMyMessage = (messages) => {
    return String(messages.senderId) === String(authUser?._id);
   
  };
   console.log(messages._id)
    console.log(authUser._id)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Loading and error states
  const { loading, error } = useGetMessages();
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (messages.length === 0) return <EmptyState />;

  return (
    <div className="messages-container mb-0">
      {messages.map((message) => (
        <MessageBubble 
          key={message._id || message.id || Math.random().toString(36)}
          message={message}
           isMe={isMyMessage(message)}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

// Extracted components for better readability
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-20">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorMessage = ({ error }) => (
  <div className="text-red-500 p-4 text-center bg-red-50 rounded-lg mx-4">
    Error: {error}
  </div>
);

const EmptyState = () => (
  <div className="text-center text-gray-500 py-4">
    No messages yet. Start the conversation!
  </div>
);

const MessageBubble = ({ message, isMe }) => {
  const messageText = message.text || message.content || message.message || "";
  const timestamp = message.createdAt || message.time || message.timestamp || new Date();

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] mb-3 ${isMe ? "bg-gray-200" : "bg-gray-100"} px-4 mt-3 py-2 rounded-3xl ${isMe ? "rounded-br-none" : "rounded-tl-none"}`}>
        <p className="text-sm font-normal leading-snug">{messageText}</p>
        <div className="flex justify-end mt-1">
          <span className="text-xs text-gray-500 font-medium">
            {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Messages;
