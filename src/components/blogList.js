import { Link } from "react-router-dom";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
import ProfilePicture from "./profilePic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUserPlus,faHeart,faBookmark } from "@fortawesome/free-regular-icons";
import { faBookmark,faHeart } from "@fortawesome/free-regular-svg-icons";

const BlogList = ({blogs}) => {
    // const {userId} = useParams()
    // Sort blogs by created_at in descending order
    const sortedBlogs = [...blogs].sort((a, b) => new Date(b.Blog.created_at) - new Date(a.Blog.created_at));

    return ( 
        <div className="">
            {/* <h1 className="text-5xl font-black">
                {title}
            </h1> */}
            {sortedBlogs.map((blog)=>(
               
                    <div  key={blog.Blog.id} className=" rounded-xl mt-10 bg-white shadow p-5 space-y-5">
                         <Link to={`/blogs/${blog.Blog.id}` } key={blog.Blog.id}>
                        
                        <div className="items-center  flex flex-row  justify-between">
                            <div className="flex flex-col ">
                            <ProfilePicture
                            size={20}
                            userId={blog.Blog.owner_id}
                            fallbackImage="https://via.placeholder.com/150"
                            altText={`User ${blog.Blog.owner_id}'s Profile Picture`}
                                />
                            <div className=" justify-center flex flex-col gap-10 mt-5">
                                <p >{blog.Blog.owner.author}</p>
                                <p className="text-1 flex justify-self-end">{blog.Blog.created_at} </p>
                            </div>
                            </div>

                            <div className="w-[40%] ">
                                <h2 className=" mb-5 sm:text-4xl text-2xl text-text-color font-sans font-black">{blog.Blog.title.substring(0, 30)}...</h2>
                                <p className="text-gray-600 ">{blog.Blog.body.substring(0, 200)}...</p>
                                <div className="flex flex-row gap-5 items-center justify-center">
                                    <FontAwesomeIcon icon={faBookmark}/>
                                    
                                    <FontAwesomeIcon icon={faHeart}/>
                                   {/* <FontAwesomeIcon icon={faUserPlus}/> */}
                                </div>
                                
                            </div>
                            <div >
                            <img src="https://via.placeholder.com/150" alt="" className=" bg-gray-400 w-full h-56 rounded-lg"/>
                            </div>
                        </div>
                        </Link>
                    </div>
                
            ))}

        </div>
     );
}
 
export default BlogList;