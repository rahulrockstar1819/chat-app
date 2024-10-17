import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';


const LoginPage = () => {
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");  
 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    // If login is successful, redirect to conversation page
    navigate('/app/conversation');
  };

  return (
    <div className='flex justify-center items-center h-screen w-screen'>
    <div className="flex flex-col items-center justify-center rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 animate-[rotateY_0.7s_ease-in-out] origin-left">
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
      <div className="p-6 rounded-lg shadow-md h-1/2">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block mb-1 font-medium"></label>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full max-w-xs"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium"></label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
        <Link to="/app/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
    </div>
  )
}

export default LoginPage;

