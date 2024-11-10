import TypingBox from "./typing-box"
import Messeges from "./Messeges"
import useConversation from "../../zustand/useConversation"
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useSidebarToggle from "../../hooks/useSidebarToggle"




const MessegeBox = () => {
  const {selectedConversation, setSelectedConversation} = useConversation();
  const {toggleSidebar, isSidebarVisible} = useSidebarToggle();
  console.log(toggleSidebar)

  useEffect(() => {
    return () => setSelectedConversation(null)
  },[setSelectedConversation])
  
  return (
    <div className='flex flex-col h-full w-full'>
            {!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
             <div className='bg-slate-400 h-16 px-4 py-2 mb border- rounded-md '>
                <div className="flex items-center justify-start h-full gap-2 ">
                <button onClick={toggleSidebar} className="text-gray-700">
                {!isSidebarVisible ? "Show Sidebar" : "Hide Sidebar"}
              </button>
                <div className="avatar">
                 <div className="mask mask-squircle w-10">
                   <img src= {selectedConversation?.profilePic} />
                 </div>
                 </div>
                <span className='label-text'></span>
                <span className='text-gray-500 font-bold'>{selectedConversation?.fullname}</span>
                </div>
             </div>
             <Messeges />
             <TypingBox />
        </>
      )}
    </div>
  )
}

export default MessegeBox


//Here goes the no chat selected part
//In future improve the ui by implimentin some gif animation
const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-500 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<Messeges className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};