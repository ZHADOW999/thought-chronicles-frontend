import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axiosConfig'; 
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { useDropzone } from 'react-dropzone'; // Import React Dropzone
import 'react-quill/dist/quill.snow.css';
const forbiddenWords = [
    // Add your forbidden words list 
    
];

const BlogCreate = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    // const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    // const [imagePreviews, setImagePreviews] = useState([]);
    // const fileInputRef = useRef(null);
    const [isPending, setIsPending] = useState(null);
    const navigate = useNavigate();

    const containsForbiddenWords = (text) =>
        forbiddenWords.some((word) => text.toLowerCase().includes(word.toLowerCase()));

    const isPostDisabled = containsForbiddenWords(title) || containsForbiddenWords(body);

    useEffect(() => {
        if (isPostDisabled) {
            setShowPopup(true);
            const timer = setTimeout(() => setShowPopup(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isPostDisabled]);

    // Drag and drop handler using react-dropzone
    // const onDrop = (acceptedFiles) => {
    //     const previews = acceptedFiles.map((file) => URL.createObjectURL(file));
    //     setImagePreviews((prev) => [...prev, ...previews]);
    //     setImages((prev) => [...prev, ...acceptedFiles]);
    // };

    // const { getRootProps, getInputProps } = useDropzone({
    //     onDrop,
    //     accept: 'image/*',
    //     multiple: true
    // });

    // const handleRemoveImage = (index) => {
    //     setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    //     setImages((prev) => prev.filter((_, i) => i !== index));
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = new FormData();
        post.append("title", title);
        post.append("body", body); 

        // if (images.length > 0) {
        //     images.forEach((file) => post.append("images", file));
        // }

        setIsPending(true);

        try {
            await api.post("/api/blogs", post, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            setIsSubmitting(true)
            setIsPending(false);
            navigate("/");
            console.log("Blog posted successfully");
        } catch (error) {
            console.error("Error creating the blog post:", error);
            setIsPending(false);
        }
    };

    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
    
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
    
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
    
      ['clean']                                         // remove formatting button
    ];

    
      const modules = {
        // Equivalent to { toolbar: { container: '#toolbar' }}
        toolbar: toolbarOptions
      }
    

      useEffect(() => {
        const toolbar = document.querySelector('.ql-toolbar');
        if (toolbar) {
          const tooltips = {
            'ql-bold': 'Bold',
            'ql-italic': 'Italic',
            'ql-underline': 'Underline',
            'ql-strike': 'Strikethrough',
            'ql-code-block': 'Code Block',
            'ql-link': 'Insert Link',
            'ql-image': 'Insert Image',
            'ql-video': 'Insert Video',
            'ql-header': 'Heading',
            'ql-list': 'List',
            'ql-indent': 'Indent',
            'ql-direction': 'Text Direction',
            'ql-size': 'Font Size',
            'ql-color': 'Text Color',
            'ql-background': 'Background Color',
            'ql-font': 'Font Family',
            'ql-align': 'Text Align',
            'ql-list-type': 'List Type',
            'ql-script': 'Script',
            'ql-blockquote': 'Blockquote',
            'ql-code': 'Code',
            'ql-formula': 'Formula',
            'ql-clean': 'Remove Formatting',
            
          };
    
          Object.entries(tooltips).forEach(([className, tooltip]) => {
            const button = toolbar.querySelector(`.${className}`);
            if (button) {
              button.setAttribute('data-tooltip', tooltip);
            }
          });
        }
      }, []);

    return (
        <div className="container mx-auto p-6 mt-20 w-[95%]">
           <img
                    className="mx-auto w-[70vw] h-[250px] rounded-lg object-cover mb-6"
                    src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt="Blog Cover"
                />
            <div className=" rounded-lg p-6 shadow-lg mb-10">
               
                <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-4">Create a New Blog Post</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            placeholder="Blog Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="h-auto w-full p-4 border-2 bg-bg-color-light1 border-gray-400 rounded-lg shadow-md focus:outline-none focus:border-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>

                    <div>
                        <ReactQuill
                        modules={modules}
                            value={body}
                            onChange={(value) => setBody(value)}
                            placeholder="Write your blog content..."
                            className="w-full h-screen border-2 border-none border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            theme="snow"
                        />
                    </div>

                    {/* <div>
                        <label className="block font-semibold text-gray-700 mb-2 mt-20">Upload Images:</label>
                        <div {...getRootProps()} className="cursor-pointer w-full border-2 border-gray-300 p-6 text-center rounded-lg hover:bg-gray-200">
                            <input {...getInputProps()} />
                            <p className="text-gray-600">Drag & Drop your images here, or click to select files</p>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-4">
                            {imagePreviews.map((src, index) => (
                                <div key={index} className="relative">
                                    <img src={src} alt={`Preview ${index}`} className="w-32 h-32 object-cover rounded-lg shadow-md" />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div> */}

                    <div className="flex justify-center pt-20 ">
                        <button
                            type="submit"
                            disabled={isSubmitting || isPostDisabled}
                            className={`px-6 py-3 w-full sm:w-auto text-white bg-bg-color-dark hover:bg-text-color  rounded-lg shadow-md ${isSubmitting || isPostDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-text-color'}`}
                        >
                            {isSubmitting ? "Posting..." : "Post Blog"}
                        </button>
                    </div>
                </form>
            </div>

            {showPopup && (
                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
                    Title or content contains forbidden words!
                </div>
            )}
        </div>
    );
};

export default BlogCreate;




