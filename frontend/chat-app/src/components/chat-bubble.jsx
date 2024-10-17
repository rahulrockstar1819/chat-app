import React from 'react'

const chatBubble = () => {
  return (
    //this is received conversation
    /*<div className='bottom-0 right-0 left-0 pr-4 m-5 w-full bg-slate-400'>
         <div className="chat chat-start">
           <div className="chat-image avatar">
             <div className="w-10 rounded-full">
              <img
                 alt="Tailwind CSS chat bubble component"
                  src="https://avatar.iran.liara.run/public" />
               </div>
             </div>
       <div className="chat-header">
           Obi-Wan Kenobi
         <time className="text-xs opacity-50">12:45</time>
        </div>
      <div className="chat-bubble">You were the Chosen One!</div>
         <div className="chat-footer opacity-50">Delivered</div>
      </div>*/
       
      <div className="chat chat-end  pr-4 w-full h-full">
        <div className="chat-image avatar">
           <div className="w-10 rounded-full">
              <img
                 alt="Tailwind CSS chat bubble component"
                 src="https://avatar.iran.liara.run/public" />
           </div>
          </div>
      <div className="chat-header text-black">
          Anakin
        <time className="text-xs opacity-50">12:46</time>
      </div>
     <div className="chat-bubble">I hate you!</div>
     <div className="chat-footer text-black">Seen at 12:46</div>
 </div>

    
  )
}

export default chatBubble