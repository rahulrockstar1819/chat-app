import TypingBox from "./typing-box"
import Messeges from "./Messeges"



const MessegeBox = () => {
  return (
    <>
    <div className='md:min-w-[450px] flex flex-col right-0 h-full w-full'>
             <div className='bg-slate-300 h-16 px-4 py-2 mb-2 border- rounded-md'>
                <div className="flex items-center justify-start h-full">
                <span className='label-text'></span>
                <span className='text-gray-500 font-bold'>Rahul Pal</span>
                </div>
             </div>
             <Messeges />
             <TypingBox />
        
    </div>
    </>
  )
}

export default MessegeBox