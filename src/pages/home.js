import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BlogList from "../components/blogList";
import UseFetch from "../components/useFetch";
import SearchBar from "../components/Search";
import SpeedDialBtn from "../components/speedDialBtn";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchQuery = searchParams.get("search") || ""; // Get the search term from the URL
    const [search, setSearch] = useState(searchQuery);
    const [url, setUrl] = useState("http://127.0.0.1:4000/api/blogs");
    const { data: blogs, loading, error } = UseFetch(url, search);

    // Update the search term and URL when the query changes
    useEffect(() => {
        setSearch(searchQuery);
        setUrl(
            searchQuery
                ? `http://127.0.0.1:4000/api/blogs?search=${encodeURIComponent(searchQuery)}`
                : "http://127.0.0.1:4000/api/blogs"
        );
    }, [searchQuery]);

    const handleSearch = (searchTerm) => {
        const params = searchTerm ? { search: searchTerm } : {};
        setSearchParams(params); // Update the URL query
    };

    return (
        <>
            {error && <p className="text-5xl text-center uppercase">{error}</p>}
            {loading && <div className="text-5xl text-center uppercase">Loading...</div>}
            <main className="sm:mt-28 mt-20 sm:w-[80%] w-[90%] m-auto pb-10">
                <SearchBar onSearch={handleSearch} />
                {blogs && blogs.length > 0 ? (
                    <BlogList blogs={blogs} />
                ) : (
                    !loading && <p className="text-center text-2xl mt-10">No Looks like we've hit a blank page in the storybook. No blogs match your search—try a different tale!</p>
                )}
                <SpeedDialBtn />
            </main>
        </>
    );
};

export default Home;
