import TypingBox from "./typing-box"
import Messages from "./Messeges"
import useConversation from "../../zustand/useConversation"
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";




const MessegeBox = () => {
  const {selectedConversation, setSelectedConversation} = useConversation();

  useEffect(() => {
    console.log(selectedConversation);
    return () => setSelectedConversation(null)
  },[selectedConversation, setSelectedConversation])
  
  return (
      <>
        <div className="bg-slate-500 px-4 py-2 h-14 max-sm:h-[62px] flex items-center">
          <div className="mask mask-squircle">
            <div className="w-12 rounded-full"> 
              {selectedConversation && selectedConversation.profilePic && (
                <img src={selectedConversation.profilePic} alt='user avatar'/>
              )}
            </div>
          </div>
          <span className="label-text"></span>{" "}
          <span className="text-white font-bold ml-2">
            {selectedConversation && selectedConversation.fullname}
          </span>
          <button className="flex justify-end items-end">Call</button>
        </div>
        <div className="flex-1 lg:h-[calc(100vh-15vh)] max-sm:h-[calc(100vh-11vh)] overflow-y-auto bg-orange-500 rounded-xl">
            <Messages />
          </div>
        <TypingBox />
      </>
  )
};

export default MessegeBox;

