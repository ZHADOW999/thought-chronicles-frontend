// import React from "react";
import { useState,useEffect } from "react";
import api from "../api/axiosConfig";
const UseFetchLoggedUser = (url) => {
    const [userLoader, setUserLoader] = useState(true);
    const [userError, setUserError] = useState(null);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchUserBlog = async () => {
            try {
                const response = await api.get(url); // Use Axios to fetch user data
                setUserData(response.data); // Assuming the user ID is in the response
                // console.log("data: " , response.data);
                // console.log(response.data);
            } catch (err) {
                setUserError(err.message); // Set error message
            } finally {
                setUserLoader(false); // Set loading to false
            }
        };

        fetchUserBlog();
    }, [url]);
    return { userData, userLoader, userError };
}
 
export default UseFetchLoggedUser;