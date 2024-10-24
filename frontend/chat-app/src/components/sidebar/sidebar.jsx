import Searchinput from "./Searchinput"
import Conversations from "./Conversations"
import LogoutBtn from "./LogoutBtn"




const Sidebar = () => {

  return (
    <div className="flex w-full h-10 m-2">
     <Searchinput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutBtn />
    </div>
  )
}

export default Sidebar