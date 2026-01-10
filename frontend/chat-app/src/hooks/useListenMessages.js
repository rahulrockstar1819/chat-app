import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { newMessage, addNewMessage } = useConversation();
	console.log("Listening for new messages", newMessage);

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
			addNewMessage(newMessage);
		});

		return () => socket?.off("newMessage");
	}, [socket, addNewMessage]);
};
export default useListenMessages;