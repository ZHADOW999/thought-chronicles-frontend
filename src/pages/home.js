import { useState } from "react";
import BlogList from "../components/blogList";
import UseFetch from "../components/useFetch";
import SearchBar from "../components/Search";
import React from "react";


const Home = () => {
    const [search, setSearch] = useState("")
    // const [url,setUrl] = useState("http://127.0.0.1:4000/api/blogs")
    const {data:blogs ,loading,error} = UseFetch("https://tc.a.7o7.cx/api/blogs",search)
    

    const handleSearch = (searchTerm) => {
        setSearch(searchTerm);
        // setUrl(`http://127.0.0.1:4000/api/blogs?search=${encodeURIComponent(search)}`);
    };

    // const {data:blogs ,loading,error} = UseFetch("http://localhost:4000/api/blogs")
    return ( 
        <>
            {error &&<p className="text-5xl text-center uppercase">{error}</p>}
            {loading && <div className="text-5xl text-center uppercase">Loading...</div>}
            <main className="sm:mt-20 mt-20 sm:w-[80%] w-[90%] m-auto pb-10">
                <SearchBar onSearch={handleSearch}/>
                {blogs && <BlogList blogs={blogs} title="All Blogs"/>}
            </main>
        </>
     );
}
 
export default Home;
