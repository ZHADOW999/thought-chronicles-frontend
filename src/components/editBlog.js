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
        <BlogCreateForm onSubmit={handleSubmit} Blogtitle={(e) => setTitle(e.target.value)} BlogBody={(value) => setBody(value)} body={body} title={title} header={"Edit Blog"} isSubmittingBlogText={"Update Blog"} SubmittingBlogText={"Updating..."}/>
        // <div className="w-[80%] m-auto mt-32">
        //     <h1 className="text-3xl font-bold mb-5">Edit Blog</h1>
        //     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        //         {/* Title Input */}
        //         <div>
        //             <label htmlFor="title" className="block font-bold mb-2">Title</label>
        //             <input
        //                 id="title"
        //                 type="text"
        //                 value={title}
        //                 onChange={(e) => setTitle(e.target.value)}
        //                 className="border border-gray-300 p-2 rounded w-full"
        //                 required
        //             />
        //         </div>

        //         {/* React Quill Editor for Body */}
        //         <div>
        //             <label htmlFor="body" className="block font-bold mb-2">Body</label>
        //             <ReactQuill
        //             modules={modules}
        //                 id="body"
        //                 value={body}
        //                 onChange={setBody} // Update state when editor content changes
        //                 className="border border-gray-300 p-2 rounded w-full"
        //                 required
        //             />
        //         </div>

        //         {/* Submit Button */}
        //         <button
        //             type="submit"
        //             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        //         >
        //             Update Blog
        //         </button>
        //     </form>
        // </div>
    );
};

export default EditBlog;


// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";
// import api from "../api/axiosConfig";
// import ReactQuill from "react-quill"; // Import React Quill
// import "react-quill/dist/quill.snow.css"; // Import Quill's default styles

// const EditBlog = () => {
//     const { id } = useParams(); // Extract id from URL
//     const navigate = useNavigate(); // For navigation after submission

//     const [title, setTitle] = useState("");
//     const [body, setBody] = useState(""); // To store rich text editor value
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const toolbarOptions = [
//         ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
//         ['blockquote', 'code-block'],
//         ['link', 'image', 'video', 'formula'],
      
//         [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
//         [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
//         [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
//         [{ 'direction': 'rtl' }],                         // text direction
      
//         [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
//         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
//         [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
//         [{ 'font': [] }],
//         [{ 'align': [] }],
      
//         ['clean']                                         // remove formatting button
//       ];
      
//         const modules = {
//           // Equivalent to { toolbar: { container: '#toolbar' }}
//           toolbar: toolbarOptions
//         }

//     useEffect(() => {
//         const toolbar = document.querySelector('.ql-toolbar');
//         if (toolbar) {
//           const tooltips = {
//             'ql-bold': 'Bold',
//             'ql-italic': 'Italic',
//             'ql-underline': 'Underline',
//             'ql-strike': 'Strikethrough',
//             'ql-code-block': 'Code Block',
//             'ql-link': 'Insert Link',
//             'ql-image': 'Insert Image',
//             'ql-video': 'Insert Video',
//             'ql-header': 'Heading',
//             'ql-list': 'List',
//             'ql-indent': 'Indent',
//             'ql-direction': 'Text Direction',
//             'ql-size': 'Font Size',
//             'ql-color': 'Text Color',
//             'ql-background': 'Background Color',
//             'ql-font': 'Font Family',
//             'ql-align': 'Text Align',
//             'ql-list-type': 'List Type',
//             'ql-script': 'Script',
//             'ql-blockquote': 'Blockquote',
//             'ql-code': 'Code',
//             'ql-formula': 'Formula',
//             'ql-clean': 'Remove Formatting',
            
//           };
    
//           Object.entries(tooltips).forEach(([className, tooltip]) => {
//             const button = toolbar.querySelector(`.${className}`);
//             if (button) {
//               button.setAttribute('data-tooltip', tooltip);
//             }
//           });
//         }
//       }, []);

//     // Fetch the blog data when the component mounts
//     useEffect(() => {
//         const fetchBlog = async () => {
//             try {
//                 const response = await api.get(`/api/blogs/${id}`, {
//                     headers: {
//                         'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Include the token
//                         'Content-Type': 'multipart/form-data', // Ensure the content type is set correctly
//                     },
//                 });
//                 const blog = response.data.Blog; // Assuming the API returns a 'blog' object
//                 setTitle(blog.title); // Pre-fill title
//                 setBody(blog.body);   // Pre-fill body
//                 setLoading(false);
//             } catch (err) {
//                 setError("Failed to fetch blog");
//                 setLoading(false);
//                 console.error(err);
//             }
//         };

//         fetchBlog();
//     }, [id]);

//     // Handle form submission to update the blog
    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const formData = new FormData();
//             formData.append("title", title);
//             formData.append("body", body); // Send the editor's content as body

//             const response = await api.put(`/api/blogs/${id}`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include the token
//                     'Content-Type': 'multipart/form-data', // Ensure the content type is set correctly
//                 },
//                 withCredentials: true,
//             });

//             console.log(response.data.message);
//             navigate(`/${id}`); // Redirect to the blog's details page
//         } catch (err) {
//             setError("Failed to update blog");
//             console.error("Error updating blog:", err);
//         }
//     };

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p className="text-red-500 h-screen mt-52 text-5">{error}</p>;
//     }

    

        
//     return (
//         <div className="w-[80%] m-auto mt-32">
//             <h1 className="text-3xl font-bold mb-5">Edit Blog</h1>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                 {/* Title Input */}
//                 <div>
//                     <label htmlFor="title" className="block font-bold mb-2">Title</label>
//                     <input
//                         id="title"
//                         type="text"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         className="border border-gray-300 p-2 rounded w-full"
//                         required
//                     />
//                 </div>

//                 {/* React Quill Editor for Body */}
//                 <div>
//                     <label htmlFor="body" className="block font-bold mb-2">Body</label>
//                     <ReactQuill
//                     modules={modules}
//                         id="body"
//                         value={body}
//                         onChange={setBody} // Update state when editor content changes
//                         className="border border-gray-300 p-2 rounded w-full"
//                         required
//                     />
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                     type="submit"
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 >
//                     Update Blog
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default EditBlog;
