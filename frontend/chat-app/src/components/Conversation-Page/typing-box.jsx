import React from 'react'

const TypingBox = () => {
  return (
        <form className="px-4 my-3">
          <div className='w-full'>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-grow px-4 py-2 mr-2 w-[90%] h-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                        <button 
                        className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Send
                        </button>
                        </div>
                 </form>
  )
}

export default TypingBox;