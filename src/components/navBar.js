import { Link } from "react-router-dom";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import bg from "../images/logo-1-bg.png"
import { useState } from "react";

import "../index.css"

const Navbar = () => {
    const [IsActive, setIsActive] = useState(false);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post('/api/logout', {}, { withCredentials: true });
            localStorage.removeItem('isAuthenticated'); // Clear authentication state
            navigate('/');  // Use React Router navigation
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className="sm:w-[80%] w-[90%] mt-5 m-auto flex justify-between items-center relative">
            <img src={bg} alt="logo" className="sm:w-20 sm:h-20 w-14 h-14 rounded-full" />
            <div onClick={() => setIsActive((prev) => !prev)} className={`sm:hidden ham-menu cursor-pointer ${IsActive ? "active" : ""}`}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={` top-10 z-50 bg-white sm:bg-inherit flex flex-col p-2 sm:p-0 w-[50%] text-center absolute border-2 space-y-5 border-black transition-all duration-300 ease-in-out sm:relative sm:right-auto sm:top-auto sm:w-auto sm:h-auto sm:flex-row sm:items-center sm:justify-center sm:space-x-6 sm:space-y-0 sm:border-0 ${IsActive ? "right-0" : "-right-full"}`}>
                <Link className="uppercase" to="/blogs">Home</Link>
                <Link className="uppercase" to="/newblog">New Blog</Link>
                <Link className="uppercase" to="/logout" onClick={handleLogout}>Logout</Link>
            </ul>
        </nav>
    );
}

export default Navbar;