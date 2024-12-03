
//import { useState,useEffect } from "react";
import BlogList from "../components/blogList";
import UseFetch from "../components/useFetch";
// import Loader from "../components/Loader" 


const Home = () => {
    const {data:blogs ,loading,error} = UseFetch("https://tc.a.7o7.cx/api/blogs")
    // const {data:blogs ,loading,error} = UseFetch("http://localhost:4000/api/blogs")
    return ( 
        <>
            {error &&<p className="text-5xl text-center uppercase">{error}</p>}
            {loading && <div className="text-5xl text-center uppercase">Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs"/>}
        </>
     );
}
 
export default Home;
