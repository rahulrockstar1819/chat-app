import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";



const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser}= useAuthContext()
    const signUp = async ({fullname, username, password, confirmPassword, gender}) => {
        const success = handleInputErrors({fullname, username, password, confirmPassword, gender});
        if (!success) return;

        setLoading(true);
        try{
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({fullname, username, password, confirmPassword, gender})
            })

            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);
        }
        catch(error){
            console.error(error.message)
        }
        finally{
            setLoading(false);
        }
    }
    return{loading, signUp}
};
export default useSignup;

function handleInputErrors ({fullname, username, password, confirmPassword, gender}) {
    if(!fullname || !username || !password || !confirmPassword || !gender) {
        console.log("Please fill all the required fields..")
        return false;
    }
    if(password !== confirmPassword){
        console.log("Password do not match..")
        return false;
    }
    if(password.length < 6){
        console.log("Password must be at least 6 characters long.")
        return false;
    }
    return true;
}