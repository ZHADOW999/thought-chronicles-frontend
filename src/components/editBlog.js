import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
import api from "../api/axiosConfig";

import BlogCreateForm from "./blogCreateForm";

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
                const response = await api.get(`/api/blogs/${id}`, {
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
                setError("Failed to fetch blog"+err);
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

            const response = await api.put(`/api/blogs/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include the token
                    'Content-Type': 'multipart/form-data', // Ensure the content type is set correctly
                },
                withCredentials: true,
            });

            // if (response.ok) {
            //     if (response.status === 413) {
            //         throw new Error("Error: The uploaded file is too large. Please reduce the size and try again.");
            //     }
            //     throw new Error("Error: An unexpected error occurred.");
            // }

            console.log(response.data.message);
            navigate(`/${id}`); // Redirect to the blog's details page
        } catch (err) {
            // if (err.message === "Network Error") {
            //     throw new Error("Error: Unable to connect to the server. Please check your internet connection.");
            // } else {
            //     throw new Error(err.message); // Set the error message to display
            // }
            console.error("Error updating blog:", err);
            alert("Error: Image my be least than 1 mb"); // Alert the user with the error message
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    // if (error) {
    //     return <p className="text-red-500 h-screen mt-52 text-5">{error}</p>;
    // }

    

        
    return (
        <BlogCreateForm onSubmit={handleSubmit} Blogtitle={(e) => setTitle(e.target.value)} BlogBody={(value) => setBody(value)} body={body} title={title} header={"Edit Blog"} isSubmittingBlogText={"Update Blog"} SubmittingBlogText={"Updating..."}/>

    );
};

export default EditBlog;


