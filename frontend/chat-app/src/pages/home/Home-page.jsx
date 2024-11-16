import Sidebar from "../../components/sidebar/sidebar"
import ProfileInfo from "../../components/dashboard/Profile-Info";

const Home = () => {
    
    return(
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-4 h-screen md:h-screen overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0'>
                <div className='flex-1 col-span-3'>
                    <Sidebar />
                </div>
                <div className="flex-1 hidden lg:block col-span-9">
                <ProfileInfo />
                </div>
        </div>

    )
}

export default Home; 