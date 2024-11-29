import { Link } from "react-router-dom";

const BlogList = ({blogs,title}) => {
    // const blogs = props.blogs;
    // const title = props.title
    return ( 
        <div className="mt-40 w-[80%] m-auto">
            <h1 className="text-5xl font-black">
                {title}
            </h1>
            {blogs.map((blog)=>(
               
                    <div  key={blog.id} className="mt-10 bg-white shadow p-5 space-y-5">
                         <Link to={`/blogs/${blog.id}`}>
                        <h2 className="text-4xl text-text-color font-sans font-black">{blog.title}</h2>
                        <p>Written by: {blog.owner.author}</p>
                        </Link>
                    </div>
                
            ))}

        </div>
     );
}
 
export default BlogList;