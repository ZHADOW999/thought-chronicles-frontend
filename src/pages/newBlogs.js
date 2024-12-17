import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const forbiddenWords = [
  "abuse", "assault", "attack", "bastard", "beastiality", "bigotry", //...
];

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);

    // Append each selected image
    images.forEach((image) => {
      formData.append("Images", image);
    });

    setIsPending(true);

    api.post("/api/blogs", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })
      .then(() => {
        setIsPending(false);
        navigate("/");
        console.log("Blog posted successfully");
      })
      .catch((error) => {
        console.error("Error creating blog post!", error);
        setIsPending(false);
      });
  };

  const containsForbiddenWords = (text) => {
    return forbiddenWords.some((word) =>
      text.toLowerCase().includes(word.toLowerCase())
    );
  };

  const isPostDisabled =
    containsForbiddenWords(title) || containsForbiddenWords(body);

  useEffect(() => {
    if (isPostDisabled) {
      setShowPopup(true);
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [title, body, isPostDisabled]);

  return (
    <div className="sm:mt-20 mt-12 sm:w-[85%] w-[90%] m-auto pb-10">
      <form className="relative" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <label htmlFor="fileInput" className="relative">
            <FontAwesomeIcon
              icon={faPlus}
              className="p-2 w-6 h-6 border border-gray-400 rounded-full text-gray-600 cursor-pointer"
            />
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
            ref={fileInputRef}
            multiple
          />
          <input
            className="mb-1 bg-bg-color-light1 text-6 border-none p-5 w-[70vw]"
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus={true}
          />
        </div>
        <textarea
          className="focus:ring-0 bg-bg-color-light1 w-[70vw] h-[100vh] text-lg border-none p-5"
          placeholder="Tell your story..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        {images.length > 0 && (
          <div className="mt-4">
            {images.map((image, index) => (
              <div key={index} className="flex items-center mt-2">
                <span>{image.name}</span>
                <button
                  className="ml-4 bg-red-500 text-white p-1 rounded"
                  onClick={() => handleRemoveImage(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          className={`fixed bottom-6 right-6 bg-black text-white p-5 rounded-2xl ${
            isPostDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isPostDisabled}
        >
          {isPending ? "Adding blog..." : "Add Blog"}
        </button>
      </form>
      {showPopup && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-4 rounded shadow-lg">
          The title or body contains forbidden words!
        </div>
      )}
    </div>
  );
};

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

