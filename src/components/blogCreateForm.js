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

    
    

const BlogCreateForm = ({onSubmit,Blogtitle,BlogBody,title,body,isSubmitting,header,isSubmittingBlogText,SubmittingBlogText}) => {
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
        <div className="w-[95%] m-auto pt-32">
            <img
                    className="mx-auto w-[100vw] h-[250px] rounded-lg object-cover mb-6"
                    src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt="Blog Cover"
                />
            <h1 className="text-3xl font-bold mb-5">{header}</h1>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
                        className="border border-gray-300 p-2 rounded w-full h-screen"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-20 ">
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