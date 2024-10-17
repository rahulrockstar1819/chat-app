import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useSignup from "../../hooks/useSignup"
import Checkbox from './check-box';


const SignUp = () => {
  const [input, setInput] = useState({
    username: '',
    fullname: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });

  const{loading, signUp} = useSignup()

  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(input);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput(prevInput => ({
      ...prevInput,
      [name]: value
    }));
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prevState => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  }

  return (
    <Fragment>
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="rounded-md shadow-md w-full max-w-md mx-4 sm:w-96 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 flex flex-col items-center animate-[rotateY_0.8s_ease-in-out] origin-left">
        <style jsx>{`
          @keyframes rotateY {
            from {
              transform: rotateY(-90deg);
            }
            to {
              transform: rotateY(0);
            }
          }
        `}</style>
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-5 text-center mt-4">Sign Up</h2>
        <form className="space-y-3 sm:space-y-4 w-full px-4 sm:px-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="username" className="block mb-1 font-medium text-sm sm:text-base">Username</label>
            <input 
              type="text" 
              placeholder="Username" 
              className="input input-bordered w-full max-w-xs text-sm sm:text-base" 
              name="username"
              value={input.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="fullname" className="block mb-1 font-medium text-sm sm:text-base">Full Name</label>
            <input 
              type="text" 
              placeholder="Full Name" 
              className="input input-bordered w-full max-w-xs text-sm sm:text-base" 
              name="fullname"
              value={input.fullname}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="block mb-1 font-medium text-sm sm:text-base">Password</label>
            <div className="relative">
              <input
                type={showPasswords.password ? "text" : "password"}
                placeholder="••••••••"
                className="input input-bordered w-full max-w-xs pr-10 text-sm sm:text-base"
                id="password"
                name="password"
                value={input.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 sm:pr-8 flex items-center text-white-400 hover:text-white"
                onClick={() => togglePasswordVisibility('password')}
              >
                {showPasswords.password ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                    <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                    <path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="block mb-1 font-medium text-sm sm:text-base">Confirm Password</label>
            <div className="relative">
            <input 
            type={showPasswords.confirmPassword ? "text" : "password"}
            placeholder="••••••••" 
            className="input input-bordered w-full max-w-xs text-sm sm:text-base"
            id="confirmPassword"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={handleInputChange}
            />
            <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 sm:pr-8 flex items-center text-white-400 hover:text-white"
                onClick={() => togglePasswordVisibility('confirmPassword')}
              >
                {showPasswords.confirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                    <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                    <path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"></path>
                  </svg>
                )}
             </button>
          </div>
          </div>
          <Checkbox />
          <div className="flex justify-center">
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm sm:text-base">Sign Up</button>
          </div>
        </form>
        <p className="mt-4 text-center mb-4 text-sm sm:text-base">
          Already have an account? <Link to="/app/login" className="text-blue-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  </Fragment>
  )
}



export default SignUp;   