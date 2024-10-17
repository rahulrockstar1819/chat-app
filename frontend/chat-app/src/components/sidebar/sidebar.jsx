import OnlineUsers from './online-users'
import { RiLogoutCircleLine } from '@remixicon/react'

const Sidebar = () => {
  return (
    <div className="w-96 flex justify-center items-center rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50">
        <div className="flex flex-col w-full h-full">
            <div className="w-full flex-1 rounded-md m-4 overflow-y-auto p-3 bg-white">
            <div className="flex p-2">
                <input type="text" placeholder="Search..." className="flex w-full px-2 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
                            <OnlineUsers />
                            <OnlineUsers />
                            <OnlineUsers />
                            <OnlineUsers />
                            <OnlineUsers />
                            <OnlineUsers />
                            <OnlineUsers />
                            <OnlineUsers />
                            <OnlineUsers />
                            <OnlineUsers />
                            <OnlineUsers />
                            <OnlineUsers />
                            <OnlineUsers />
                            <OnlineUsers />
                            <OnlineUsers />
                            <OnlineUsers />
                            <OnlineUsers />
                            <OnlineUsers />
                            
                <button className="flex p-1 m-2 sticky top-0 bottom-2">
                             <RiLogoutCircleLine
                              size={25} // set custom `width` and `height`
                              color="black"
                              className="logout-circle-line" // add custom class name
                              />
                        </button>
             </div>
         </div>
    </div>
  )
}

export default Sidebar