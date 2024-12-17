import api from "../api/axiosConfig";
import UseFetch from "./useFetch";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import UseFetchLoggedUser from "./useFetchLoggedUser";


const BlogDetails = () => {
    const [deletePopUp,setDeletePopUp] = useState(false)
    
    const {id} = useParams();
    const {data:blog,loading,error} = UseFetch(`http://127.0.0.1:4000/api/blogs/${id}`);
    const { userData: userData} = UseFetchLoggedUser("/api/users/me");

    const history = useNavigate();

    const handleDelete = async () => {
        try {
            await api.delete(`/api/blogs/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            console.log('Blog deleted successfully');
            history(`/profile/${userData.id}`);
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

  

    return ( 
        <div>
            {loading && <div className="text-3xl  mt-40 w-[80%] m-auto flex flex-col gap-5 justify-center items-center">Loading...</div>}
            {error && <div className="text-4xl uppercase mt-40 w-[80%] m-auto flex flex-col gap-5 justify-center items-center">{error}</div>}
            {blog && (<article className="mt-32 w-[80%] m-auto flex flex-col gap-5 justify-center items-center">
                    <h2 className="text-4xl font-black">{blog.Blog.title}</h2>
                    <div>{blog.Blog.body}</div>
                    <p className="text-[14px]">Written by: {blog.Blog.owner.author}</p>
                    {blog.Images && blog.Images.length > 0 ? (  <img src={ `http://127.0.0.1:4000/${blog.Images[0].filename}`} alt="" className=" bg-gray-400 w-52 h-44 " />):(<p></p>)}
                    {userData && userData.id === blog.Blog.owner_id && 

                    <div>
                        <button onClick={() =>setDeletePopUp((prev) => !prev)} className="text-red-500 hover:underline">
                            Delete
                        </button>
                        {deletePopUp && <div className="fixed top-0  right-0 overflow-auto  w-full h-full z-50 bg-black/50 ">
                            <div className="mt-52 m-auto flex flex-col items-center    w-[30%] h-auto bg-white p-10 rounded-lg">
                                <h2 className="text-2xl font-bold text-center mb-5">Are you sure you want to delete this blog? 👀</h2>
                                <div className="flex gap-5">
                                    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all ease-in-out duration-300">Yes</button>
                                    <button onClick={() => setDeletePopUp((prev) =>!prev)} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all ease-in-out duration-300">No</button>
                                </div>
                            </div>
                            
                            </div>}
                    </div>
                    }
                </article>)}
        </div>
     );
}
 
export default BlogDetails;