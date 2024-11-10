import { useEffect, useState } from 'react'
import {useToast} from '@chakra-ui/react'

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations,setSelectedConversations] = useState([]);
    const toast = useToast();

    useEffect(() => {
        const useGetConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/user");
                const data = await res.json();
                if(data.error) {
                    throw new Error(data.error);
                }
                setSelectedConversations(data);
            } catch (error) {
                toast({ title: "Error",
                    description: error.message,
                    status: "error",
                    duration: 2000,
                    position: "top",
                    isClosable: true });
            }finally{
                setLoading(false);
            }
        }
        useGetConversations();
    },[]);
    return {loading, conversations};
}

export default useGetConversations