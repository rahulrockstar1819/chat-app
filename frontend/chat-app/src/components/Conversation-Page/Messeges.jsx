import { useEffect, useRef } from "react";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";




const Messeges = () => {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef(null);

	const scrollToBottom = () => {
		lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		if (!loading) {
			const timeoutId = setTimeout(scrollToBottom, 100);
			return () => clearTimeout(timeoutId);
		}
	}, [messages, loading]);

  return (
    <div className='px-4 flex-1 overflow-y-auto'>
       {!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
    </div>
  )
}

export default Messeges