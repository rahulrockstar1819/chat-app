import Sidebar from "../../components/sidebar/sidebar"
import MessegeBox from "../../components/Conversation-Page/Messege-box"
import useSidebarToggle from "../../hooks/useSidebarToggle"

const Home = () => {
    const { isSidebarVisible, hideSidebar } = useSidebarToggle();

    const handleConversationSelect = () => {
        hideSidebar();
    };

    return(
        <div className="flex relative h-[calc(100Vh-0.5px)] w-[calc(100Vw-1px)] rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
            <div className="flex-col w-full flex border-black rounded-md m-4">
            {isSidebarVisible && ( 
                <div className="transition-all duration-500 ease-in-out absolute bg-white border- rounded-lg w-[27%] h-[95%] overflow-y-auto pr-4">
                    <Sidebar onSelect={handleConversationSelect} />
                </div>
            )}
                <div className={`transition-all duration-500 ease-in-out absolute right-0 bg-white border rounded-lg h-[95%] ${isSidebarVisible ? "w-[70%] mr-4" : "w-[calc(100%-16px)]"}`}>
                    <MessegeBox />
                </div>
            </div>
        </div>
    )
}

export default Home;