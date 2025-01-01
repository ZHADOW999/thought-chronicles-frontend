import api from "../api/axiosConfig";
import UseFetch from "./useFetch";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import UseFetchLoggedUser from "./useFetchLoggedUser";
import DOMPurify from "dompurify";
import ProfilePicture from "./profilePic";

const BlogDetails = () => {
    const [deletePopUp, setDeletePopUp] = useState(false);

    const { id } = useParams();
    const { data: blog, loading, error } = UseFetch(`https://tc.a.7o7.cx/api/blogs/${id}`);
    const { userData } = UseFetchLoggedUser("/api/users/me");

    const history = useNavigate();

    const handleDelete = async () => {
        try {
            await api.delete(`/api/blogs/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            console.log("Blog deleted successfully");
            history(-1);
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    const formatDate = (dateString) => {
        const options = { month: "long", day: "numeric", year: "numeric" };
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString("en-US", options).toLowerCase();
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    };

    return (
        <div className="bg-bg-color-light1">
            {loading && (
                <div className="min-h-screen flex w-full justify-center items-center flex-col">
                    <div class="loader book">
                        <figure class="page"></figure>
                        <figure class="page"></figure>
                        <figure class="page"></figure>
                    </div>

                    <h1 className="load">Loading</h1>
                </div>
            )}
            {error && (
                <div className="text-4xl uppercase mt-40 w-[80%] m-auto flex flex-col gap-5 justify-center items-center">
                    {error}
                </div>
            )}
            {blog && (
                <div className="pt-32 md:w-[70%] w-[90%] m-auto flex flex-col gap-5 justify-center ">
                    <h2 className="text-2xl md:text-4xl ">{blog.Blog.title}</h2>
                    <div className="flex flex-col md:flex-row  justify-between md:items-center">

                        <div className="w-full mb-2 md:mb-0 flex flex-row  justify-start self-start h-auto">
                            <Link to={`/profile/${blog.Blog.owner_id}`}>
                                <ProfilePicture
                                    size={30}
                                    userId={blog.Blog.owner_id}
                                    altText={`User ${blog.Blog.owner_id}'s Profile Picture`}
                                />
                            </Link>
                            <div className="w-full ml-5 flex-row  gap-10 flex  md:mt-0">
                                <Link to={`/profile/${blog.Blog.owner_id}`} className="cursor-pointer hover:underline font-semibold">{blog.Blog.owner.author}</Link>
                                <p className="opacity-50 text-1 flex justify-center items-center">{formatDate(blog.Blog.created_at)}</p>
                            </div>
                        </div>

                        {userData && userData.id === blog.Blog.owner_id && (
                            <div className="flex gap-5">
                                <button
                                    onClick={() => setDeletePopUp((prev) => !prev)}
                                    className="text-red-500 hover:underline"
                                >
                                    delete
                                </button>
                                {deletePopUp && (
                                    <div className="fixed top-0 right-0 overflow-auto w-full h-full z-50 bg-black/50">
                                        <div className="mt-52 m-auto flex flex-col items-center w-[90%] md:w-[30%] h-auto bg-white p-10 rounded-lg">
                                            <h2 className="text-2xl font-bold text-center mb-5">
                                                Are you sure you want to delete this post ? 👀
                                            </h2>
                                            <div className="flex gap-5">
                                                <button
                                                    onClick={handleDelete}
                                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all ease-in-out duration-300"
                                                >
                                                    Yes
                                                </button>
                                                <button
                                                    onClick={() => setDeletePopUp((prev) => !prev)}
                                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all ease-in-out duration-300"
                                                >
                                                    No
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <Link to={`/edit/${id}`} className="text-blue-600 hover:underline duration-300">edit</Link>
                            </div>
                        )}
                    </div>
                    <div
                        className="max-w-full prose blog-content"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(blog.Blog.body, {
                                ADD_TAGS: ["video", "source"],
                                ADD_ATTR: [
                                    "controls",
                                    "autoplay",
                                    "muted",
                                    "loop",
                                    "poster",
                                    "src",
                                    "type",
                                ],
                            }),
                        }}
                    ></div>


                </div>
            )}
        </div>
    );
};

export default BlogDetails;



