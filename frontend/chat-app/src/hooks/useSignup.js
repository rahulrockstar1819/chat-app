import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { position, useToast } from "@chakra-ui/react";


const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser}= useAuthContext()
    const toast = useToast();

    const signUp = async ({fullname, username, password, confirmPassword, gender}) => {
        const success = handleInputErrors({fullname, username, password, confirmPassword, gender});
        if (!success) return;

        setLoading(true);
        try{
            const verifyRes = await fetch(`/api/user?username=${username}`, {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            });
            console.log(username)
            const verifyData = await verifyRes.json();
            if(!verifyData.exists){
                const res = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({fullname, username, password, confirmPassword, gender})
                });

                if (!res.ok) {
                    const errorResponse = await res.json();
                    throw new Error(errorResponse.error);
                }

                const data = await res.json();
                localStorage.setItem("chat-user", JSON.stringify(data));
                setAuthUser(data);
            } else {
                throw new Error("User already exists.");
            }
        }
        catch(error){
            toast({ title: "Error",
                description: error.message,
                status: "error",
                duration: 2000,
                position: "top",
                isClosable: true });
            
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
        toast({
            title: "Please fill all the required fields..",
            status: "error",
            duration: 2000,
            position: "top",
            isClosable: true
        })
        return false;
    }
    if(password !== confirmPassword){
        console.log("Password do not match..")
        toast({
            title: "Password do not match..",
            status: "error",
            duration: 2000,
            position: "top",
            isClosable: true
        })
        return false;
    }
    if(password.length < 6){
        console.log("Password must be at least 6 characters long.")
        toast({
            title: "Password must be at least 6 characters long.",
            status: "error",
            duration: 2000,
            position: "top",
            isClosable: true
        })
        return false;
    }
    return true;
}