//import api from "../api/axiosConfig";
import UseFetch from "./useFetch";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
    const {id} = useParams();
    // const {data:blog,loading,error} = UseFetch(`https://tc.a.7o7.cx/api/blogs/${id}`);
    const {data:blog,loading,error} = UseFetch(`http://localhost:4000/api/blogs/${id}`);
    return ( 
        <div>
            {loading && <div className="text-3xl     mt-40 w-[80%] m-auto flex flex-col gap-5 justify-center items-center">Loading...</div>}
            {error && <div className="text-4xl uppercase mt-40 w-[80%] m-auto flex flex-col gap-5 justify-center items-center">{error}</div>}
            {blog && (<article className="mt-40 w-[80%] m-auto flex flex-col gap-5 justify-center items-center">
                    <h2 className="text-4xl font-black">{blog.title}</h2>
                    <div>{blog.body}</div>
                    {/* <button onClick={handleClick}>Delete</button> */}
                    <p className="text-[14px]">Written by: {blog.owner.author}</p>
                </article>)}
        </div>
     );
}
 
export default BlogDetails;