import Navbar from "./navBar";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

const MainLayout = ({ children }) => {
    const [ownerId, setOwnerId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOwnerId = async () => {
            try {
                const response = await api.get('/api/users/me'); // Use Axios to fetch user data
                setOwnerId(response.data.id); // Assuming the user ID is in the response
            } catch (err) {
                setError(err.message); // Set error message
            } finally {
                setLoading(false); // Set loading to false
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