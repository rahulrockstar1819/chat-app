import {Input, Button, select} from "@heroui/react";
import {Link} from "react-router-dom";
import React from "react";
import Password from "./password";
import CheckBox from "./check-box";
import PhotoUploader from "./cameraIcon";
import useSignup from "../../hooks/useSignup";


export default function SignUp() {
  const [username, setUsername] = React.useState("");
  const [fullname, setFullname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [gender, setGender] = React.useState(""); 

  const {loading, signUp} = useSignup();
  

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleFullnameChange = (e) => {
    setFullname(e.target.value);
  };
  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
  }
  const handleConfirmPasswordChange = (newConfirmPassword) => {
    setConfirmPassword(newConfirmPassword);
  }
  const handleGenderSelection = (gender) => {
    setGender(gender);
    console.log(gender)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp({fullname, username, password, confirmPassword, gender});
    console.log("Submitting form...");
    console.log("Username: ", username);
    console.log("Fullname: ", fullname);
    console.log("Password: ", password);
    console.log(gender);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-slate-950">
      <div className="w-96 flex flex-col gap-2">
        <div className="flex flex-col gap-4 border-2 border-slate-800 rounded-lg p-2">
          <h1 className="text-3xl text-center text-slate-200">Sign Up</h1> 
          <div className="flex justify-center">
            <div className="h-12 w-12 bg-yellow-300 rounded-xl">
              <image href=""/>
            </div>
          </div>
            <Input 
              label="Username" 
              type="text" 
              variant="flat"
              value={username}
              onChange={handleUsernameChange}
            />
            <Input 
              label="Fullname" 
              type="text" 
              variant="flat" 
              value={fullname}
              onChange={handleFullnameChange}
            />
            <Password 
              onPasswordChange={handlePasswordChange} 
              onConfirmPasswordChange={handleConfirmPasswordChange} 
            />
            <CheckBox
            onGenderChange={handleGenderSelection}
            />
            <PhotoUploader />
          <div className="flex flex-wrap gap-4 items-center justify-center">
           <Button color="secondary"
            onClick={handleSubmit}
           >Submit</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-center">
          <p className="mt-2 text-center mb-2 text-sm sm:text-base text-white">
          Already have an account? <Link to="/app/login" className="text-blue-600 hover:underline">Log in</Link>
        </p>
          </div>
        </div>
      </div>
    </div>
  );
}
