import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axiosConfig'; 
import BlogCreateForm from "./blogCreateForm";

const BlogCreate = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ IsPending,setIsPending] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = new FormData();
        post.append("title", title);
        post.append("body", body); 
        setIsPending(true);

        try {
            const response= await api.post("/api/blogs", post, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            if (!response.ok) {
                throw new Error("Image must be below 1 megabyte");
              }
      
            setIsSubmitting(true)
            setIsPending(false);
            navigate("/");
            console.log("Blog posted successfully");
        } catch (error) {
            console.error("Error creating the blog post:", error);
            setIsPending(false);
            alert(error)
        }
    };

    

    return (
        <BlogCreateForm onSubmit={handleSubmit} Blogtitle={(e) => setTitle(e.target.value)} BlogBody={(value) => setBody(value)} body={body} title={title} isSubmitting={isSubmitting} header={"Creat a New Blog"} SubmittingBlogText={"Posting..."} isSubmittingBlogText={"Post Blog"}/>
    );
};

export default BlogCreate;

