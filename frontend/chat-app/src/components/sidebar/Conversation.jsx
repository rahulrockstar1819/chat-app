import useConversations from "../../zustand/useConversation"


const Conversation = ({conversation,lastIdx,onSelect}) => {
  const {selectedConversation, setSelectedConversation} = useConversations();
  const isSelected = selectedConversation?._id === conversation._id;
  return (
    <>
     <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-5 py-2 cursor-pointer
      ${isSelected ? "bg-sky-500" : ""}`}
      onClick={() => {
              setSelectedConversation(conversation);
               onSelect();
            }}>
      <div className="mask mask-squircle">
        <div className="w-12 rounded-full">
          <img src={conversation.profilePic}
           alt='user avatar'/>
        </div>
      </div>
      <div className='flex flex-col flex-1'>
        <div className='flex gap-3'>
          <p className='font-bold text-gray-500'>{conversation.fullname}</p>
        </div>
      </div>
     </div>
     {!lastIdx && <div className='divider my-0 py-0 h-1'/>}
    </>
  )
     }

export default Conversation