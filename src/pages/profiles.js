import React, { useState,useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import UseFetch from '../components/useFetch';
// import axios from 'axios';
import api from '../api/axiosConfig';
import ProfilePicture from '../components/profilePic';
import BlogList from '../components/blogList';
import SpeedDialBtn from "../components/speedDialBtn";




const Profile = () => {
    const { userId } = useParams();
    const [image, setImage] = useState(null);
    // const [ownerId,setOwnerId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [blogData, setBlogData] = useState([]);
    // const [message, setMessage] = useState('');
    // const { data: blogs = [], loading, error } = UseFetch("http://127.0.0.1:4000/api/blogs/me");



    useEffect(() => {
        const fetchOwnerId = async () => {
            try {
                const response = await api.get('/api/users/me'); // Use Axios to fetch user data
                setData(response.data); // Assuming the user ID is in the response
                console.log(response.data);
            } catch (err) {
                // setError(err.message); // Set error message
            } finally {
                // setLoading(false); // Set loading to false
            }
        };

        fetchOwnerId();
    }, []);
    
    useEffect(() => {
        const fetchUserBlog = async () => {
            try {
                const response = await api.get('/api/blogs/me'); // Use Axios to fetch user data
                setBlogData(response.data); // Assuming the user ID is in the response
                console.log(response.data);
            } catch (err) {
                setError(err.message); // Set error message
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchUserBlog();
    }, []);
    const blogCount = blogData.length;

    // const handleImageChange = (event) => {
    //     setImage(event.target.files[0]);
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     // Append your file or data to formData
    //     formData.append('file', image); // Assuming selectedFile is your file input
 
    //     try {
    //         const response = await api.post(`/api/users/${userId}/upload-profile-picture`, formData, {
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Include the token
    //                 'Content-Type': 'multipart/form-data', // Ensure the content type is set correctly
    //             },
    //         });
    //         console.log('Upload successful:', response.data);
    //     } catch (error) {
    //         console.error('Error uploading file:', error);
    //     }
    // };
    return (
        <main className='flex flex-col sm:mt-28 mt-20 sm:w-[80%] w-[90%] m-auto pb-10'>
            {loading && <div className="text-5xl text-center uppercase">Loading...</div>}
            {error && <div className=" text-4xl uppercase mt-40 w-[80%] m-auto flex flex-col gap-5 justify-center items-center">{error}</div>}


            {/* <h1>Upload Profile Image</h1> */}
           <div className='flex items-center gap-10'>
                {userId && <ProfilePicture size={250} userId={userId} fallbackImage="https://via.placeholder.com/150" />}
                
                {data && <div>
                    <h1 className='text-7 font-black'>{data.author}</h1>
                    {/* <p>{data.email}</p> */}
                    {/* <img src={data.profile_picture} alt={data.name} /> */}
                    <div>0 following</div>
                    <div>0 follower</div>
                    <div>{blogCount} blogs</div>
                </div>}
           </div>
            {/* <form onSubmit={handleSubmit}>
                <label htmlFor='pfp'>Profile Picture</label>
                <input className="hidden" type="file" id="pfp" accept="image/*" onChange={handleImageChange} />
                <button type="submit">Upload</button>
            </form> */}
            {/* {message && <p>{message}</p>} */}
            <div className='flex flex-col mt-16'>
                <h2 className='text-7 font-bold'>History</h2>
                {blogData && <BlogList blogs={blogData}/>}
            </div>
            <SpeedDialBtn/>
                    </main>
    );
};

export default Profile;
