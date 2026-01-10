import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {

    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async ({username, password}) => {
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
            
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;
