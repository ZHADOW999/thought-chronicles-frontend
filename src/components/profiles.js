import React, { useState,useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';

// import axios from 'axios';
import api from '../api/axiosConfig';
import ProfilePicture from './profilePic';

const Profile = () => {
    const { userId } = useParams();
    const [image, setImage] = useState(null);
    const [ownerId,setOwnerId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [blogData, setBlogData] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchOwnerId = async () => {
            try {
                const response = await api.get('/api/users/me'); // Use Axios to fetch user data
                setData(response.data); // Assuming the user ID is in the response
                console.log(response.data);
            } catch (err) {
                setError(err.message); // Set error message
            } finally {
                setLoading(false); // Set loading to false
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
                {userId && <ProfilePicture size={56} userId={userId} fallbackImage="https://via.placeholder.com/150" />}
                
                {data && <div>
                    <h1 className='text-7 font-black'>{data.author}</h1>
                    {/* <p>{data.email}</p> */}
                    {/* <img src={data.profile_picture} alt={data.name} /> */}
                    <div>0 following</div>
                    <div>0 follower</div>
                    <div>o blogs</div>
                </div>}
           </div>
            {/* <form onSubmit={handleSubmit}>
                <label htmlFor='pfp'>Profile Picture</label>
                <input className="hidden" type="file" id="pfp" accept="image/*" onChange={handleImageChange} />
                <button type="submit">Upload</button>
            </form> */}
            {message && <p>{message}</p>}
            <div className='flex-col'>
                <h1 className='text-7 mt-10'>History</h1>
                { blogData.map((blog)=>(
                    <div  key={blog.Blog.id} className="flex flex-col rounded-xl mt-10 bg-white shadow p-5 space-y-5">
                             <Link to={`/blogs/${blog.Blog.id}` } key={blog.Blog.id}>
                            
                            <div className="items-center  flex flex-row  justify-between">
                                <div className="flex flex-col ">
                                <ProfilePicture
                                size={20}
                                userId={blog.Blog.owner_id}
                                fallbackImage="https://via.placeholder.com/150"
                                altText={`User ${blog.Blog.owner_id}'s Profile Picture`}
                                    />
                                <div className=" justify-center flex flex-col gap-10 mt-5">
                                    <p >{blog.Blog.owner.author}</p>
                                    <p className="text-1 flex justify-self-end">{blog.Blog.created_at} </p>
                                </div>
                                </div>
    
                                <div className="w-[40%] ">
                                    <h2 className=" mb-5 sm:text-4xl text-2xl text-text-color font-sans font-black">{blog.Blog.title.substring(0, 30)}...</h2>
                                    <p className="text-gray-600 ">{blog.Blog.body.substring(0, 200)}...</p>
                                    
                                </div>
                                <div >
                                <img src="https://via.placeholder.com/150" alt="" className=" bg-gray-400 w-full h-56 rounded-lg"/>
                                </div>
                            </div>
                            </Link>
                        </div>
    
                ))}
            </div>
        </main>
    );
};

export default Profile;
