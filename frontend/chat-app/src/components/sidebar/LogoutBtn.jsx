import { MdOutlineLogout } from "react-icons/md";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {

  const {loading, logout} = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/app/login');
  };

  return (
    <div className="w-10 h-10 justify-center flex backdrop-blur-sm">
      <button onClick={handleLogout} className="m">
        {!loading ? (
                  <MdOutlineLogout className="w-6 h-6 text-black cursor-pointer rotate-180" />
         ) : <loading className="w-6 h-6 text-black cursor-pointer rotate-180" />}
      </button>
    </div>
  )
}

export default LogoutBtn