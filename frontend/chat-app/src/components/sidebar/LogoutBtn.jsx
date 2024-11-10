import { MdOutlineLogout } from "react-icons/md";
import useLogout from "../../hooks/useLogout";
import { Spinner } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {

  const {loading, logout} = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/app/login');
  };

  return (
    <div className="w-10 h-10 bottom-8 left-7 fixed backdrop-blur-sm">
      <button onClick={handleLogout} className="m">
        {!loading ? (
                  <MdOutlineLogout className="w-6 h-6 text-black cursor-pointer rotate-180" />
         ) : <Spinner size='md' />}
      </button>
    </div>
  )
}

export default LogoutBtn