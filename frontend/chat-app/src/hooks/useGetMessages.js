import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import {useToast} from "@chakra-ui/react";

const useGetMessages = () => {
	const toast = useToast();
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
	
	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/messages/${selectedConversation._id}`);
				if (!res.ok) throw new Error('Failed to fetch messages');
				const data = await res.json();
				setMessages(data);
				console.log(data)
			} catch (error) {
				toast({ title: "Error",
                 description: error.message,
                 status: "error",
                 duration: 2000,
                 position: "top",
                 isClosable: true });
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;