import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";

const TypingBox = () => {
  const [message, setMessage] = useState('');
	const { loading, sendMessage } = useSendMessage('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};
  return (
        <form className="px-5 ml-64" onSubmit={handleSubmit}>
          <div className='flex w-full justify-end'>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-grow max-sm:w-full max-sm:mr-[-20px] absolute px-4 py-2 mr-2 w-[90%] h-10 rounded-full border border-gray-300 focus:outline-none"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            />
                        <button 
                        className="px-4 py-1.5 mt-0.5 mr-2.5 max-sm:mr-[-17px] absolute bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none">
                        Send  
                        </button>
                        </div>
                 </form>
  )
}

export default TypingBox;

//customize the send button