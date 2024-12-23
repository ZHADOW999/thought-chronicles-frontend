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
            <main className="bg-bg-color-light1 min-h-screen">{children}</main>
        </>
    );
}

export default MainLayout;