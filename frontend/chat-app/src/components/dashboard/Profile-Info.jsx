import { useEffect, useState } from "react";


const ProfileInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = JSON.parse(localStorage.getItem("chat-user"));
      setUser(user);
    };

    fetchUser();
  }, []);

  return (
    <>
      <div className='flex relative justify-center items-center h-[100vh] w-full bg-slate-500 border p-1 rounded-l-2xl'>
        <div className='bg-orange-500 h-[95%] w-[60%] flex justify-center items-center'>
          <div className='inline-block p-5 h-full w-full border-black overflow-hidden flex flex-col items-center'>
            <div className='flex h-[32vh] w-[14vw] rounded-full overflow-hidden mb-2 bg-cover bg-center'>
              <img src={user ? user.profilePic : 'Loading.....'} alt='Profile Picture' className='mx-auto'></img>
            </div>
            <div className='bg-zinc-800 h-96 w-full p-5 flex justify-center items-center'>
              <div className='text-white text-2xl flex gap-5'>
                <h1>{user ? user.fullname : 'Loading...'}</h1>
                <button className='bg-black rounded-full text-sm'>edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileInfo;