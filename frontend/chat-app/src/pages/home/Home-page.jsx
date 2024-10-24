import Sidebar from "../../components/sidebar/sidebar"
import MessegeBox from "../../components/Conversation-Page/Messege-box"

const Home = () => {
    return(
        <div className="flex relative h-screen w-screen m-0 rounded-md overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
            <div className="flex-col w-full h-full flex border-white rounded-md m-4">
                <div className="flex absolute bg-white border- rounded-lg w-[27%] h-[95%]">
                    <Sidebar />
                </div>
                <div className="flex absolute right-0 bg-white border- rounded-lg w-[70%] h-[95%] mr-4">
                    <MessegeBox />
                </div>
            </div>
        </div>
    )
}

export default Home;