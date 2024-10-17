import React from 'react'

const OnlineUsers = () => {
  const [users, setUsers] = React.useState([]);
  
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('///api/user');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
        console.log(response)
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <>
     <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-2 cursor-pointer">
      <div className="mask mask-squircle">
        <div className="w-12 rounded-full">
          <img src='https://avatar.iran.liara.run/public' alt='user avatar'/>

        </div>
      </div>
      <div className='flex flex-col flex-1'>
        <div className='flex gap-3'>
          <p className='font-bold text-gray-500'>Rahul Pal</p>
        </div>
      </div>
     </div>
     <div className='divider my-0 py-0 h-1'/>
    </>
  )
}

export default OnlineUsers
