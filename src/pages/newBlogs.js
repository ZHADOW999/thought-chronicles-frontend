import { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axiosConfig';  // Import the configured axios instance
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const NewBlog = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isPending, setIspending] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleImageChange=(e)=>{
        const file = e.target.files[0];
        if (file){
            setImage(URL.createObjectURL(file));
        }
    }

    const handleRemoveImage = () => {
        setImage(null); // Reset the image state to remove the selected image
        if (fileInputRef.current){
            fileInputRef.current.value = '';
    
    }
    }
    const handleSubmit =  (e) => {
        e.preventDefault();
        const post = { title, body,image };
        setIspending(true);

        api.post('/api/blogs', post, {
            withCredentials: true,  // Ensure credentials are sent
        })
        .then(() => {
            setIspending(false);
            navigate("/blogs");
            console.log("Blog posted successfully");
        })
        .catch((error) => {
            console.error("There was an error creating the blog post!", error);
            setIspending(false);
        });
    }

    return (
        <div className="sm:mt-20 mt-12 sm:w-[85%] w-[90%] m-auto pb-10">
            <img
                className="mx-auto w-[70vw] h-[250px] rounded-lg object-cover"
                src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
            />
            <form className="relative" onSubmit={handleSubmit}>
                <div className=" flex items-center">
                    <label htmlFor="fileInput" className="relative"
                    onMouseEnter={() => setShowTooltip(true)} // Show tooltip on hover
                    onMouseLeave={() => setShowTooltip(false)} // Hide tooltip on mouse leave
                    >
                        <FontAwesomeIcon icon={faPlus} className="p-2 w-6 h-6 border border-gray-400 rounded-full text-gray-600 flex items-center justify-center cursor-pointer" />
                        {showTooltip && (
                            <span className="absolute -left-[100%] transform -translate-x-1/2  -translate-y-full bg-gray-700 text-white text-xs rounded py-1 px-2">
                                Add Images
                            </span>
                        )}
                    </label>
                    <input id="fileInput" type="file"  style={{ display: "none" }} onChange={handleImageChange} 
                    ref={fileInputRef}
                    />
                    <input
                        className="mb-1 bg-bg-color-light1 text-6 border-none p-5 w-[70vw] focus:outline-none  focus:ring-0 "
                        placeholder="Title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        autoFocus={true}
                    />
                </div>
                <div className="">
                    <textarea
                        className="focus:ring-0 bg-bg-color-light1 w-[70vw] h-[100vh] text-lg border-none p-5 focus:outline-none"
                        placeholder="Tell your story..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </div>
                {/* Display the selected image */}
                {image && (
                    <div className="flex flex-col border-2 border-black items-center mx-auto justify-center w-[50vw] h-[50px]  mt-4">
                        <img 
                            src={image} 
                            alt="Selected" 
                            className="w-full rounded-lg object-cover border-2 border-black" 
                        />
                        <button 
            className="mt-2 bg-red-500 text-white p-2 rounded" 
            onClick={handleRemoveImage} // Call the function to remove the image
        >
            Remove Image
        </button>
                    </div>

                )}
                
                {!isPending &&<button className="fixed end-6 bottom-6 bg-black text-white p-5 mt-5 rounded-2xl hover:scale-105 transition-all ease-in-out duration-300">Add new blog</button>}
                    {isPending &&<button className="fixed end-6 bottom-6 bg-black text-white p-5 mt-5 rounded-2xl hover:scale-105 transition-all ease-in-out duration-300"disabled>Adding new blog...</button>}
            </form>
        </div>
    );
}

export default NewBlog;

// // import axios from "axios";
// import {  useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from '../api/axiosConfig';  // Import the configured axios instance
// import "./newBlog.css"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";

// const NewBlog = () => {
//     const [title,setTitle] = useState("")
//     const [body,setBody] = useState("")
//     const [isPending,setIspending]= useState(false)
//     const navigate = useNavigate();

//     const handleSubmit=(e)=>{
//         e.preventDefault();
//         const post = { title, body };
//         setIspending(true);

//         api.post('/api/blogs', post, {
//             withCredentials: true,  // Ensure credentials are sent
//         })
//         .then(() => {
//             setIspending(false);
//             navigate("/blogs");
//             console.log("blog posted successfully");
//         })
//         .catch((error) => {
//             console.error("There was an error creating the blog post!", error);
//             setIspending(false);
//             //navigate("/");
//         });
//     }


//     return ( 

        
        
//         // <form className="flex flex-col justify-center sm:w-[100%] w-[90%] m-auto items-center mt-20" onSubmit={handleSubmit}>
//         //     <div className="flex flex-col space-y-2 sm:w-[50%] w-full">
//         //         <label>Blog title</label>
//         //         <input
//         //         className="w-full h-20 rounded-2xl indent-5"
//         //         type="text"
//         //         required
//         //         value={title}
//         //         onChange={(e)=>setTitle(e.target.value)}
//         //         ></input>

//         //     </div>
//         //     <div className="flex flex-col space-y-2 sm:w-[50%] w-full">
//         //         <label>Blog Content</label>
//         //         <textarea
//         //         className="w-full h-44 rounded-2xl indent-5"
//         //         type="text"
//         //         required
//         //         value={body}
//         //         onChange={(e)=>setBody(e.target.value)}
//         //         ></textarea>

//         //     </div>
//         //     {!isPending &&<button className="bg-black text-white p-5 mt-5 rounded-2xl hover:scale-105 transition-all ease-in-out duration-300">Add new blog</button>}
//         //         {isPending &&<button className="bg-black text-white p-5 mt-5 rounded-2xl hover:scale-105 transition-all ease-in-out duration-300"disabled>Adding new blog...</button>}
//         // </form>
//     //     <div className="write">
//     //   <img
//     //     className="writeImg"
//     //     src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
//     //     alt=""
//     //   />
//     //   <form className="writeForm">
//     //     <div className="writeFormGroup">
//     //       <label htmlFor="fileInput">
//     //         {/* <i className="writeIcon fas fa-plus"></i> */}
//     //         <FontAwesomeIcon icon={faPlus} className="writeIcon" />
//     //       </label>
//     //       <input id="fileInput" type="file" style={{ display: "none" }} />
//     //       <input
//     //         className="writeInput"
//     //         placeholder="Title"
//     //         type="text"
//     //         autoFocus={true}
//     //       />
//     //     </div>
//     //     <div className="writeFormGroup">
//     //       <textarea
//     //         className="writeInput writeText"
//     //         placeholder="Tell your story..."
//     //         type="text"
//     //         autoFocus={true}
//     //       />
//     //     </div>
//     //     <button className="writeSubmit" type="submit">
//     //       Publish
//     //     </button>
//     //   </form>
//     // </div>
//      );
// }
 
// export default NewBlog;
