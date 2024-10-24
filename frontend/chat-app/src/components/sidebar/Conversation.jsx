
import { useEffect, useState } from 'react';

const Conversation = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/user')
      .then(response => response.json())
      .then(data => {
        setUser(data);
        console.log(data); // Log the user data
      });
  }, []);

  return (
    <>
    <div className="flex gap-2 items-center hover:bg-sky-500 rounded-md py-1 cursor-pointer">
      {user && <p>{user.fullname}</p>}
    </div>
    </>
  )
}

export default Conversation