import React from "react";
import {Input, Button, select} from "@heroui/react";
import useLogin from "../../hooks/useLogin";



const Login = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const {loading, login} = useLogin();

      
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
      };
    const handlepasswordChange = (e) => {
        setPassword(e.target.value);
      }  

      const handleSubmit = async (e) => {
        e.preventDefault();
        await login({username, password});
        console.log("Submitting form...");
        console.log("Username: ", username);
        console.log("Password: ", password);
      };
    return (
         <div className="flex justify-center items-center h-screen bg-slate-950">
              <div className="w-96 flex flex-col gap-2">
                <div className="flex flex-col gap-4 border-2 border-slate-800 rounded-lg p-2">
                  <h1 className="text-3xl text-center text-slate-200">Log In</h1> 
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input 
                      label="Username" 
                      type="text" 
                      variant="flat"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                    <Input 
                      label="Password"
                      type="password" 
                      variant="flat" 
                      value={password}
                      onChange={handlepasswordChange}
                    />
                    <div className="flex flex-wrap gap-4 items-center justify-center">
                      <Button color="secondary" type="submit">
                        Submit
                      </Button>
                    </div>
                  </form>
         </div>
             </div>
                 </div>           
    )
}

export default Login;