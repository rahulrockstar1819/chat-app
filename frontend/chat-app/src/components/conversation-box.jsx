import ChatBubble from './chat-bubble'
import TypingBox from './typing-box';
const ConversationBox = () => {
  return (
    <div className="flex justify-center items-center rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50">
            <div className="flex flex-col h-full w-full">
                <div className="flex-1 w-full rounded-md m-0 overflow-y-auto p-0 bg-white">
                    <div className='flex-col p-2'>
                        <ChatBubble />
                        <ChatBubble />
                        <ChatBubble />
                        <ChatBubble />
                        <ChatBubble />
                        <ChatBubble />
                        <ChatBubble />
                        <ChatBubble />
                        <ChatBubble />
                        <ChatBubble />
                        <ChatBubble />
                        <ChatBubble />
                        <ChatBubble />
                        <ChatBubble />
                        <ChatBubble />
                        <ChatBubble />
                        <ChatBubble />
                        <ChatBubble />
                        <ChatBubble />
                        <ChatBubble />
                    <div className="flex p-1 m-2 sticky top-0 bottom-0">
                    <TypingBox />
                    </div>
                </div>
                </div>
            </div>
      </div>
  )
}

export default ConversationBox;   