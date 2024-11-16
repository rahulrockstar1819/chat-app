import Searchinput from "./Searchinput"
import Conversations from "./Conversations"
import LogoutBtn from "./LogoutBtn"



const Sidebar = () => {


  return (
    <div className= 'h-full p-4 flex flex-col bg-slate-400 lg:rounded-r-2xl'>
      <Searchinput />
      <div className="divider px-3" />
      <Conversations />
      <LogoutBtn />
    </div>
);
};

export default Sidebar; 