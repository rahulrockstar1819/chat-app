import useConversations from "../../zustand/useConversation"
import {Avatar} from "@heroui/react";
import {Divider} from "@heroui/react";



const Conversation = ({conversation,lastIdx}) => {
  const {selectedConversation, setSelectedConversation} = useConversations();
  const isSelected = selectedConversation?._id === conversation._id;
    return (
    <>
     <div className={`flex gap-3 items-center hover:bg-sky-500 rounded p-5 py-8 cursor-pointer
      ${isSelected ? "bg-sky-500" : ""}`}
      onClick={() => {
              setSelectedConversation(conversation);
            }}>
      <Avatar isBordered radius="md" src={conversation.profilePic} />
      <div className='flex flex-col flex-1'>
        <div className='flex gap-3'>
          <p className='font-bold text-gray-700'>{conversation.fullname}</p>
        </div>
      </div>
     </div>
     {!lastIdx && <Divider className="my-4" />}
    </>
  )
     }

export default Conversation