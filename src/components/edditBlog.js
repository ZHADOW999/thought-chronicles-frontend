import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import Quill's default styles

const EditBlog = () => {
    const { id } = useParams(); // Extract id from URL
    const navigate = useNavigate(); // For navigation after submission

    const [title, setTitle] = useState("");
    const [body, setBody] = useState(""); // To store rich text editor value
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the blog data when the component mounts
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:4000/api/blogs/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Include the token
                        'Content-Type': 'multipart/form-data', // Ensure the content type is set correctly
                    },
                });
                const blog = response.data.Blog; // Assuming the API returns a 'blog' object
                setTitle(blog.title); // Pre-fill title
                setBody(blog.body);   // Pre-fill body
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch blog");
                setLoading(false);
                console.error(err);
            }
        };

        fetchBlog();
    }, [id]);

    // Handle form submission to update the blog
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("body", body); // Send the editor's content as body

            const response = await axios.put(`http://127.0.0.1:4000/api/blogs/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include the token
                    'Content-Type': 'multipart/form-data', // Ensure the content type is set correctly
                },
                withCredentials: true,
            });

            console.log(response.data.message);
            navigate(`/${id}`); // Redirect to the blog's details page
        } catch (err) {
            setError("Failed to update blog");
            console.error("Error updating blog:", err);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500 h-screen mt-52 text-5">{error}</p>;
    }

    return (
        <div className="w-[80%] m-auto mt-32">
            <h1 className="text-3xl font-bold mb-5">Edit Blog</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Title Input */}
                <div>
                    <label htmlFor="title" className="block font-bold mb-2">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                    />
                </div>

                {/* React Quill Editor for Body */}
                <div>
                    <label htmlFor="body" className="block font-bold mb-2">Body</label>
                    <ReactQuill
                        id="body"
                        value={body}
                        onChange={setBody} // Update state when editor content changes
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Update Blog
                </button>
            </form>
        </div>
    );
};

export default EditBlog;
