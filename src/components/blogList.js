import { Link } from "react-router-dom";

const BlogList = ({blogs,title}) => {
    // const blogs = props.blogs;
    // const title = props.title
    return ( 
        <div className="sm:mt-36 mt-20 sm:w-[80%] w-[90%] m-auto pb-10">
            <h1 className="text-5xl font-black">
                {title}
            </h1>
            {blogs.map((blog)=>(
               
                    <div  key={blog.id} className="mt-10 bg-white shadow p-5 space-y-5">
                         <Link to={`/blogs/${blog.id}`}>
                        <h2 className="sm:text-4xl text-2xl text-text-color font-sans font-black">{blog.title}</h2>
                        <p>Written by: {blog.owner.author}</p>
                        </Link>
                    </div>
                
            ))}

        </div>
     );
}
 
export default BlogList;