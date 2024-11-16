import { RiUserSearchLine } from "react-icons/ri";
import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversation";
import { useToast } from "@chakra-ui/react";


const Searchinput = () => {
  const toast = useToast();
  const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();
  const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast({ title: "Error",
                     description: "Search term must be at least 3 characters long",
                     status: "error",
                     duration: 2000,
                     position: "top",
                     isClosable: true });
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));
		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast({ title: "Error",
      description: "No Such User Found!",
      status: "error",
      duration: 2000,
      position: "top",
      isClosable: true });
	};
  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full justify-center">
      <input
        type="text"
        placeholder="Search..."
        className="px-4 py-2 mr-1 w-[95%] h-9 rounded-full border border-gray-300 focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button 
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2"
      >
        <RiUserSearchLine className="w-4 h-5" />
      </button>
    </form>
  )
}

export default Searchinput