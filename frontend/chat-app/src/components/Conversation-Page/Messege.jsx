import React from 'react'

const Messege = () => {
  return (
    <div className='chat chat-end'>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img 
                alt='Tailwind css chat bubble component'
                src='https://avatar.iran.liara.run/public'/>
            </div>
        </div>
        <div className={`chat-bubble text-black bg-blue-500`}>Hi Whats up?</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:12</div>

    </div>
  )
}

export default Messege