import { Link } from "react-router-dom";
import { useState } from "react";
import ProfilePicture from "./profilePic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import UseFetchLoggedUser from "./useFetchLoggedUser";

const BlogList = ({ blogs }) => {
    
    const [hover1, setHover1] = useState(null)
    const [hover2, setHover2] = useState(null)
    const [hover3, setHover3] = useState(null)
    const sortedBlogs = [...blogs].sort((a, b) => new Date(b.Blog.created_at) - new Date(a.Blog.created_at));
    const { userData: userData, userLoader, userError } = UseFetchLoggedUser("/api/users/me");

    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        const formattedDate= date.toLocaleDateString('en-US', options).toLowerCase(); // e.g., "dec 15"
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    };

    return (
        <div className="">
            {/* <h1 className="text-5xl font-black">
                {title}
            </h1> */}
            {sortedBlogs.map((blog) => (

                <div key={blog.Blog.id} className=" rounded-xl mt-10 bg-white shadow p-5 space-y-5">
                    

                        <div className="items-center  flex flex-row w-full justify-between">
                            <div className="flex flex-col justify-between h-full">
                                <ProfilePicture
                                    size={80}
                                    userId={blog.Blog.owner_id}
                                    // fallbackImage="https://via.placeholder.com/150"
                                    altText={`User ${blog.Blog.owner_id}'s Profile Picture`}
                                />
                                <div className=" justify-center flex flex-col gap-10 mt-5">
                                    <p >{blog.Blog.owner.author}</p>
                                    <p className="text-1 flex justify-self-end">{formatDate( blog.Blog.created_at)} </p>
                                </div>
                            </div>

                            <div className={`w-[40%] space-y-5 ${blog.Images && blog.Images.length > 0 ? "w-[40%]":"w-[80%]"}`}>
                                <h2 className="  sm:text-4xl text-2xl text-text-color font-sans font-black">{blog.Blog.title.substring(0, 30)}...</h2>
                                <p className="text-gray-600 ">{blog.Blog.body.substring(0, 200)}...<Link to={`/${blog.Blog.id}`} className="font-black tracking-wide text-black text-1.5 hover:text-blue-600 hover:underline">Read more </Link></p>
                                {/* Delete button */}
                            {/* {userData && userData.id === blog.Blog.owner_id && (
                                <button onClick={() => onDelete(blog.Blog.id)} className=" text-red-500 hover:underline">
                                    Delete
                                </button>
                            )} */}
                                <div className="flex flex-row gap-5 items-center">
                                    {/* follow */}
                                    <span className="relative cursor-pointer"
                                        onMouseEnter={() => setHover1(blog.Blog.id)}
                                        onMouseLeave={() => setHover1(false)}
                                    >

                                        {hover1 === blog.Blog.id && (<span className="absolute -bottom-[200%] transform -translate-x-1/2  -translate-y-full bg-gray-700 text-white text-xs rounded py-1 px-2">
                                            follow
                                        </span>)}
                                        <p className="sr-only">follow</p>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hover:transition-all hover:duration-300 size-6 hover:ease-in-out hover:scale-110">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                        </svg>
                                    </span>

                                    {/* bookmark */}
                                    <span
                                        
                                        onMouseEnter={() => setHover2(blog.Blog.id)}
                                        onMouseLeave={() => setHover2(false)}

                                        className="relative cursor-pointer">
                                        <FontAwesomeIcon icon={faBookmark} className="hover:transition-all hover:duration-300 hover:ease-in-out hover:scale-110" />

                                        {hover2 === blog.Blog.id && (<span className="absolute -bottom-[200%] transform -translate-x-1/2  -translate-y-full bg-gray-700 text-white text-xs rounded py-1 px-2">
                                            bookmark
                                        </span>)}
                                        <p className="sr-only">bookmark</p>
                                    </span>

                                            {/* like */}
                                    <span 
                                        onMouseEnter={() => setHover3(blog.Blog.id)}
                                        onMouseLeave={() => setHover3(false)}
                                        className="relative cursor-pointer">
                                        <FontAwesomeIcon icon={faHeart} className="hover:transition-all hover:duration-300 hover:ease-in-out hover:scale-110" />

                                        {hover3 === blog.Blog.id && (<span className="absolute -bottom-[200%] transform -translate-x-1/2  -translate-y-full bg-gray-700 text-white text-xs rounded py-1 px-2">

                                            echo
                                        </span>)}
                                        <p className="sr-only">like</p>
                                    </span>
                                </div>

                            </div>
                            <div className={`${blog.Images && blog.Images.length > 0 ? "block":"hidden"}`}>
                                {blog.Images && blog.Images.length > 0 ? (  <img src={ `http://127.0.0.1:4000/${blog.Images[0].filename}`} alt="" className=" bg-gray-400 w-52 h-44 " />):(<p></p>)}
                            </div>
                        </div>
                    
                </div>

            ))}
                
        </div>
    );
}

export default BlogList;