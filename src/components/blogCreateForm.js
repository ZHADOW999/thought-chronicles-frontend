import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import Quill's default styles
import React,{ useEffect } from "react";



  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'formula'],
  
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

    
    

    const BlogCreateForm = ({ onSubmit, Blogtitle, BlogBody, title, body, isSubmitting, header, isSubmittingBlogText, SubmittingBlogText }) => {
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Check if body is empty or contains only whitespace
        if (!body.trim()) {
          alert("Please write something in the body of the blog!");
          return;
        }
    
        // Proceed with the actual submission if body is valid
        onSubmit(e);
      };
    
      return (
        <div className="w-[95%] m-auto pt-32">
          <img
            className="mx-auto w-[100vw] h-[250px] rounded-lg object-cover mb-6"
            src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="Blog Cover"
          />
          <h1 className="text-3xl font-bold mb-5">{header}</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block font-bold mb-2">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                placeholder="Blog Title"
                onChange={Blogtitle}
                className="h-auto w-full p-4 border-r-2 bg-bg-color-light1  border-gray-400 rounded-lg shadow-md focus:outline-none focus:border-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
    
            {/* React Quill Editor for Body */}
            <div>
              <label htmlFor="body" className="block font-bold mb-2">Body</label>
              <ReactQuill
                modules={modules}
                id="body"
                value={body}
                placeholder="Write your blog content..."
                onChange={BlogBody} // Update state when editor content changes
                className=" rounded w-full h-screen"
                required
              />
            </div>
    
            {/* Submit Button */}
            <div className="flex justify-center pt-40 md:pt-20 ">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 w-full sm:w-auto text-white bg-bg-color-dark hover:bg-text-color  rounded-lg shadow-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-text-color'}`}
              >
                {isSubmitting ? SubmittingBlogText : isSubmittingBlogText}
              </button>
            </div>
          </form>
        </div>
      );
    }
    
    export default BlogCreateForm;
    