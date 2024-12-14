import { Link } from "react-router-dom";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
import ProfilePicture from "./profilePic";
const BlogList = ({blogs,title}) => {
    // const {userId} = useParams()
    return ( 
        <div className="">
            {/* <h1 className="text-5xl font-black">
                {title}
            </h1> */}
            {blogs.map((blog)=>(
               
                    <div  key={blog.Blog.id} className="rounded-xl mt-10 bg-white shadow p-5 space-y-5">
                         <Link to={`/blogs/${blog.Blog.id}` } key={blog.Blog.id}>
                        <img src="" alt="" className=" bg-gray-400 w-full h-56 rounded-lg"/>
                        <div className="flex mt-4 gap-10">
                            <div >
                            <ProfilePicture
                            userId={blog.Blog.owner_id}
                            fallbackImage="https://via.placeholder.com/150"
                            altText={`User ${blog.Blog.owner_id}'s Profile Picture`}
                                />
                            <div className="flex flex-col gap-10">
                                <p >{blog.Blog.owner.author}</p>
                                <p className="text-1">{blog.Blog.created_at} </p>
                            </div>
                            </div>

                            <div >
                                <h2 className="mb-5 sm:text-4xl text-2xl text-text-color font-sans font-black">{blog.Blog.title}</h2>
                                <p className="text-gray-600">{blog.Blog.body.substring(0, 1000)}...</p>
                                
                            </div>
                        </div>
                        </Link>
                    </div>
                
            ))}

        </div>
     );
}
 
export default BlogList;