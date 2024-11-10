import { useState } from "react"
import Searchinput from "./Searchinput"
import Conversations from "./Conversations"
import LogoutBtn from "./LogoutBtn"




const Sidebar = ({onSelect}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleConversationSelect = () => {
    setIsVisible(false);
    if (onSelect) {
      onSelect(); // Call the onSelect function passed from the parent
    }
};

  return (
    isVisible && (
    <div className="w-full m-2 scroll-y-auto">
     <Searchinput />
      <div className="divider px-3"></div>
      <Conversations  onSelect={handleConversationSelect} />
      <LogoutBtn />
    </div>
  )
);
}

export default Sidebar