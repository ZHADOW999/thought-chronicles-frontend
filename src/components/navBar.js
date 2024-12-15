import { Link } from "react-router-dom";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
import bg from "../images/logo-1-bg.png"
import { useState } from "react";


// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../index.css"


const Navbar = ({ userId }) => {
    // useEffect(() => {
    //     axios.get('http://localhost:4000/api/blogs')
    //     .then((response) => {
    //         console.log(response.data);
    //     })
    //     .catch((error) => {})
    // })


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
        <nav className="fixed z-50 sm:w-[90%] w-[90%] p-2 m-auto flex justify-between items-center  top-0 left-0 right-0 bg-bg-color-light1 ">
            <Link to="/blogs" className="flex">
                <img src={bg} alt="logo" className="sm:w-12 sm:h-12 w-14 h-14 rounded-full" />
            
            </Link>
            <div onClick={() => setIsActive((prev) => !prev)} className={`sm:hidden ham-menu cursor-pointer ${IsActive ? "active" : ""}`}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={` top-10 z-50 bg-white sm:bg-inherit flex flex-col p-2 sm:p-0 w-[50%] text-center absolute border-2 space-y-5 border-black transition-all duration-300 ease-in-out sm:relative sm:right-auto sm:top-auto sm:w-auto sm:h-auto sm:flex-row sm:items-center sm:justify-center sm:space-x-6 sm:space-y-0 sm:border-0 ${IsActive ? "right-0" : "-right-full"}`}>
                {/* <Link className="capitalize" to="/blogs">Home</Link> */}
                
                <Link className="capitalize">Library</Link>
                <Link className="capitalize" to="/stories">Stories</Link>
                <Link className="capitalize" to="/logout" onClick={handleLogout}>Logout</Link>
                <li><svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416l400 0c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4l0-25.4c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112l0 25.4c0 47.9 13.9 94.6 39.7 134.6L72.3 368C98.1 328 112 281.3 112 233.4l0-25.4c0-61.9 50.1-112 112-112zm64 352l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/></svg></li>
                <Link className="capitalize" to={`/profile/${userId}`}>Profile</Link>
            </ul>
        </nav>
    );
}

export default Navbar;