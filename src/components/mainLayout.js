import Navbar from "./navBar";
// import {useState } from "react";
// import api from "../api/axiosConfig";
import UseFetchLoggedUser from "./useFetchLoggedUser";

const MainLayout = ({ children }) => {
    const {userData} = UseFetchLoggedUser("/api/users/me");
    // const [ownerId, setOwnerId] = useState(null);
    


    return (
        <>
            {userData && <Navbar userId={userData ? userData.id : null} />}
            {children}
        </>
    );
}

export default MainLayout;