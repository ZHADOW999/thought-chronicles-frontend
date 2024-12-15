import { useState} from "react";
import BlogList from "../components/blogList";
import UseFetch from "../components/useFetch";
import SearchBar from "../components/Search";
import SpeedDialBtn from "../components/speedDialBtn";
import React from "react";



const Home = () => {
    const [search, setSearch] = useState("");
    const { data: blogs, loading, error } = UseFetch("http://127.0.0.1:4000/api/blogs", search);
    // const [ownerId, setOwnerId] = useState("");

    // useEffect(() => {
    //     if (blogs && blogs.length > 0) {
    //         setOwnerId(blogs[0].Blog.owner_id);
    //         console.log("my shit", blogs);
    //     }
    // }, [blogs]);

    const handleSearch = (searchTerm) => {
        setSearch(searchTerm);
        // setUrl(`http://127.0.0.1:4000/api/blogs?search=${encodeURIComponent(search)}`);
    };

    // const {data:blogs ,loading,error} = UseFetch("http://localhost:4000/api/blogs")
    return ( 
        <>
            {error && <p className="text-5xl text-center uppercase">{error}</p>}
            {loading && <div className="text-5xl text-center uppercase">Loading...</div>}
            <main className="sm:mt-28 mt-20 sm:w-[80%] w-[90%] m-auto pb-10">
                <SearchBar onSearch={handleSearch} />
                {blogs && <BlogList blogs={blogs} />}
                <SpeedDialBtn />
                {/* <Navbar userId={ownerId} /> */}
            </main>
        </>
    );
};

export default Home;
