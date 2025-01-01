
import api from "../api/axiosConfig";
import { useNavigate,useSearchParams,Link } from "react-router-dom";
import bg from "../images/logo-1-bg.png";
import { useState, useEffect,useCallback } from "react";
import "../index.css";
import ProfilePicture from "./profilePic";
import SearchBar from "./Search";
// import axios from "axios";





const Navbar = ({ userId }) => {
    
   

    const [data, setData] = useState()
    const [hover,setHover] = useState(false)
    // eslint-disable-next-line
    const [IsActive, setIsActive] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true); // State to control navbar visibility
    const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position

    const navigate = useNavigate();
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSearch = (searchTerm) => {
        const params = searchTerm ? { search: searchTerm } : {};
        setSearchParams(params); // Update the URL query
    };

    const handleLogout = async () => {
        try {
          // Send logout request to backend
            await api.post(
            "/api/logout",
            {},
            {
              withCredentials: true, // Ensure cookies are included in the request
            }
            
          );
          
          navigate("/login");
        } catch (error) {
          console.error("Logout failed:", error);
          alert("An error occurred while logging out. Please try again.");
        }
      };
    
    
useEffect(() => {
    const fetchOwnerId = async () => {
        try {
            const response = await api.get('/api/users/me'); // Use Axios to fetch user data
            setData(response.data); // Assuming the user ID is in the response
            
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    };

    fetchOwnerId();
}, []);

    const handleScroll = useCallback(() => {
        if (typeof window !== "undefined") {
            const currentScrollY = window.scrollY;
            setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 100); // Show navbar when scrolling up or at the top
            setLastScrollY(currentScrollY); // Update last scroll position
        }
    },[lastScrollY])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY,handleScroll]);


    
    return (
        <nav className={` h-auto z-50 fixed bg-bg-color-light1 w-full  top-0 left-0 right-0 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className={` gap-5 md:gap-0 md:w-[80%] w-[95%]  p-2 m-auto flex justify-between items-center `}>
                <Link to="/" className="flex items-center md:w-auto md:h-auto w-24 h-12 ">
                    <img src={bg} alt="logo" className="sm:w-12 sm:h-12 w-14 h-14 rounded-full" /><p className="hidden md:block uppercase text-4 leading-none font-roboto-black w-20"> thought chronicles</p>
                </Link>
                <ul className={`hidden  z-50  md:flex    transition-all duration-300 ease-in-out  flex-row items-center justify-center sm:space-x-14 sm:space-y-0 sm:border-0 ${IsActive ? "right-0" : "-right-full"}`}>
                    <Link to="/library" className="capitalize font-roboto-bold hover:scale-110 transition-all duration-100 ease-linear hover:text-gray-900">Library</Link>
                    <Link className="capitalize font-roboto-bold hover:scale-110 transition-all duration-300 ease-linear hover:text-gray-900" to="/stories">Stories</Link>
                    <li><svg className="w-7 h-7 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416l400 0c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4l0-25.4c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112l0 25.4c0 47.9 13.9 94.6 39.7 134.6L72.3 368C98.1 328 112 281.3 112 233.4l0-25.4c0-61.9 50.1-112 112-112zm64 352l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/></svg></li>
                    {data && <div className="cursor-pointer relative" onClick={() => setHover((prev) => !prev)}
                     ><ProfilePicture    size={55} userId={data.id} />
    
    
                     {hover &&<div id="dropdown" className="z-10 absolute -right-10 -bottom-30 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                <Link to={`/profile/${userId}`}>
                    <button type="button" className="font-roboto-regular inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">View Profile</button>
                </Link>
                {/* <li>
                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit Profile</button>
                </li> */}
                
                <Link to="/logout" onClick={handleLogout}>
                    <button type="button" className="font-roboto-regular inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout</button>
                </Link>
                </ul>
            </div>
    }
    
                     </div>}
                     
                </ul>
                <div className="md:hidden">
                    <SearchBar
                    onSearch={handleSearch} 
                        height={50} 
                        showProfilePic={true} 
                        userId={userId} 
                        data={data} 
                        handleLogout={handleLogout}
                    />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;