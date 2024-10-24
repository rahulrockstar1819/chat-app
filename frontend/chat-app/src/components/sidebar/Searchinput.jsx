import { RiUserSearchLine } from "react-icons/ri";


const Searchinput = () => {
  return (
    <form className="flex items-center w-full justify-center">
      <input
        type="text"
        placeholder="Search..."
        className="px-4 py-2 mr-2 w-[90%] h-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <RiUserSearchLine className="w-6 h-6" />
      </button>
    </form>
  )
}

export default Searchinput