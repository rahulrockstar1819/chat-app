import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useToast } from "@chakra-ui/react";
const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const toast = useToast();
    const login = async (username, password) => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            // Check if the response is okay
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Login failed'); // Use a fallback error message
            }

            const data = await res.json();
            console.log(data); 

            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
            if (data?.user) { 
                 console.log(error.message)
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            toast({ title: "Error",
                 description: error.message,
                 status: "error",
                 duration: 2000,
                 position: "top",
                 isClosable: true });
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;
