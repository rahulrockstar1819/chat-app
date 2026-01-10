import Searchinput from "./Searchinput"
import Conversations from "./Conversations"
import LogoutBtn from "./LogoutBtn"



const Sidebar = () => {


  return (
    <div className= 'h-full w-full flex-col p-4 flex rounded-xl border-white border-2 rounded-r-2xl'>
      <Searchinput />
      <div className="divider px-3" />
      <Conversations />
      <div className="flex mt-16 w-10 h-10">
      <LogoutBtn />
      </div>
    </div>
);
};

export default Sidebar; 