import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BlogList from "../components/blogList";
import UseFetch from "../components/useFetch";
import SearchBar from "../components/Search";
import SpeedDialBtn from "../components/speedDialBtn";
import MobileNavBar from "../components/MobileNavBar";
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
        <main className="">
            {error && <p className="text-5xl text-center uppercase">{error}</p>}
            {loading && <div className="text-5xl text-center uppercase">Loading...</div>}
            <section className="mt-20 md:mt-28 md:w-[80%] w-[95%] m-auto pb-10">
                <div className="hidden md:block">
                    <SearchBar onSearch={handleSearch} width={560} height={56} showwProfilePic={false}
                    />
                </div>
                {blogs && blogs.length > 0 ? (
                    <BlogList blogs={blogs} />
                ) : (
                    !loading && <p className="text-center text-2xl mt-10">No Looks like we've hit a blank page in the storybook. No blogs match your search—try a different tale!</p>
                )}
                <SpeedDialBtn />
                
            </section>
            < MobileNavBar/>
        </main>
    );
};

export default Home;
