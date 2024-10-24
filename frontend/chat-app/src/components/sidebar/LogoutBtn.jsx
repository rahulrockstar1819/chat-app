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
    <div className="absolute m-3 bottom-0 left-0">
      {!loading ? (
                <MdOutlineLogout className="w-6 h-6 text-black cursor-pointer rotate-180" onClick={handleLogout} />
       ) : <Spinner size='md' />}
    </div>
  )
}

export default LogoutBtn