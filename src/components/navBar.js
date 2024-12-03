import { Link } from "react-router-dom";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import bg from "../images/logo-1-bg.png"


const Navbar = () => {
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
        <nav className="w-[80%] mt-5 m-auto flex justify-between items-center">
            <img src={bg} alt="logo" className="w-20 h-20 rounded-full" />
            <ul className="flex items-center justify-center space-x-6">
                <Link className="uppercase" to="/blogs">Home</Link>
                <Link className="uppercase" to="/newblog">New Blog</Link>
                <Link className="uppercase" to="/logout" onClick={handleLogout}>Logout</Link>
            </ul>
        </nav>
     );
}
 
export default Navbar;