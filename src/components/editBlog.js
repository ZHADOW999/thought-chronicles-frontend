import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const blog = response.data.Blog; // Assuming the API returns a 'blog' object
        setTitle(blog.title); // Pre-fill title
        setBody(blog.body); // Pre-fill body
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blog: " + err.message);
        setLoading(false);
        console.error(err);
      }
    };

    fetchBlog();
  }, [id]);

  // Handle form submission to update the blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate body content
    if (!body.trim()) {
      alert("Please write something in the body of the blog!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body); // Send the editor's content as body

      const response = await api.put(`/api/blogs/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log(response.data.message);
      navigate(`/${id}`); // Redirect to the blog's details page
    } catch (err) {
      if (err.response?.status === 413) {
        alert("Error: Payload too large. Ensure the image or content size is below 1MB.");
      } else {
        console.error("Error updating blog:", err);
        alert("Error updating blog: " + (err.response?.data?.message || err.message));
      }
    }
  };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500 h-screen mt-52 text-5">{error}</p>;
//   }

  return (
    <BlogCreateForm
      onSubmit={handleSubmit}
      Blogtitle={(e) => setTitle(e.target.value)}
      BlogBody={(value) => setBody(value)}
      body={body}
      title={title}
      header={"Edit Blog"}
      isSubmittingBlogText={"Update Blog"}
      SubmittingBlogText={"Updating..."}
    />
  );
};

export default EditBlog;
