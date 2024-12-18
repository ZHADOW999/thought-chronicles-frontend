import Navbar from "./navBar";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

const MainLayout = ({ children }) => {
    const [ownerId, setOwnerId] = useState(null);


    useEffect(() => {
        const fetchOwnerId = async () => {
            try {
                const response = await api.get('/api/users/me'); // Use Axios to fetch user data
                setOwnerId(response.data.id); // Assuming the user ID is in the response
            } catch (err) {
                console.error(err);
            }
        };

        fetchOwnerId();
    }, []);

    return (
        <>
            <Navbar userId={ownerId} />
            {children}
        </>
    );
}

export default MainLayout;