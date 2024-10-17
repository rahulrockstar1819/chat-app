import ConversationBox from './conversation-box'
import Divider from '../assets/divider'
import Sidebar from './sidebar/sidebar'


const ConversationPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="flex h-[95vh] w-[95vw] rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 border border-gray-100">
                <Sidebar />
                <div className="flex m-0 p-0 w-4 ">
                  <Divider />
                </div>
                <div className="w-full relative flex-1 rounded-md m overflow-y-scroll m-4 bg-white">
                  <ConversationBox />
                </div>
             </div>
        </div>
    </>
  )
}

export default ConversationPage;