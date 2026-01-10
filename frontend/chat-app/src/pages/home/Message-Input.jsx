import React from "react";
import { IoMdSend } from "react-icons/io";
import { FiSmile } from "react-icons/fi";
import { IoAttach } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";
import useSendMessage from "../../hooks/useSendMessage";

export const MessageInput = () => {
  const [input, setInput] = React.useState("");
  const { sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage(input);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="px-4 py-2 bg-[#1f2c34]">
      <form 
        onSubmit={handleSubmit}
        className="flex items-center gap-2"
      >
        {/* Emoji Button */}
        <button
          type="button"
          className="p-3 text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-full transition-colors"
        >
          <FiSmile className="text-2xl" />
        </button>
        
        {/* Attachment Button */}
        <button
          type="button"
          className="p-3 text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-full transition-colors rotate-45"
        >
          <IoAttach className="text-xl" />
        </button>
        
        {/* Input Field */}
        <div className="flex-1 bg-[#2a3942] rounded-lg">
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full bg-transparent outline-none px-4 py-3 text-white placeholder-gray-400"
          />
        </div>
        
        {/* Send/Voice Button */}
        {input.trim() ? (
          <button
            type="submit"
            className="p-3 bg-green-600 text-white hover:bg-green-700 rounded-full transition-colors"
          >
            <IoMdSend className="text-xl" />
          </button>
        ) : (
          <button
            type="button"
            className="p-3 text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-full transition-colors"
          >
            <MdKeyboardVoice className="text-2xl" />
          </button>
        )}
      </form>
    </div>
  );
};