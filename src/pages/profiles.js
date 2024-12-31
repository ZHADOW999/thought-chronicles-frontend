import React, { useState,useEffect } from 'react';
import { useParams, } from 'react-router-dom';
// import UseFetch from '../components/useFetch';
// import axios from 'axios';
import api from '../api/axiosConfig';
import ProfilePicture from '../components/profilePic';
import BlogList from '../components/blogList';
import SpeedDialBtn from "../components/speedDialBtn";
import UseFetchLoggedUser from '../components/useFetchLoggedUser';
import MobileNavBar from '../components/MobileNavBar';
import UseFetch from '../components/useFetch';
import {faPencilSquare} from "@fortawesome/free-solid-svg-icons/faPencilSquare";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import EditProfileForm from './editProfileForm';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';



const Profile = () => {
    const { userId } = useParams();
    
    // const [image, setImage] = useState(null);
    // const [ownerId,setOwnerId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [data, setData] = useState(null);
    const [blogData, setBlogData] = useState([]);
    // const [hoverData, setHoverData] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // const [message, setMessage] = useState('');
    const {  userData } = UseFetchLoggedUser("/api/users/me");
    const {  data } = UseFetch(`http://127.0.0.1:4000/api/users/profiles/${userId}`);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    
    useEffect(() => {
        const fetchUserBlog = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/api/blogs/users/${userId}`); // Use Axios to fetch user data
                setBlogData(response.data); // Assuming the user ID is in the response
                // console.log(response.data);
            } catch (err) {
                setError(err.message); // Set error message
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchUserBlog();
    }, [userId]);
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
            
    //         // Update the image state with the new image URL
    //         setImage(URL.createObjectURL(image)); // Create a local URL for the uploaded image
    //     } catch (error) {
    //         console.error('Error uploading file:', error);
    //     }
    // };
    
    return (
        <>
            {loading && <div className="text-5xl text-center uppercase">Loading...</div>}
            {error && <div className=" text-4xl uppercase mt-40 w-[80%] m-auto flex flex-col gap-5 justify-center items-center">{error}</div>}


            {/* <h1>Upload Profile Image</h1> */}
           <div className=' flex flex-col lg:flex-row  sm:pt-28 pt-20 sm:w-[95%] w-[90%] m-auto pb-20 justify-between'>
               {userData && data && <div className='flex md:flex-row flex-col items-center text-center md:text-left  gap-10 md:items-start  justify-center'>
                   <div className="relative">{
                       userId &&  <ProfilePicture size={250} userId={userId}/>}
                       { userData.id ===data.id &&<Tooltip title='edit profile' position='right' interactive trigger='mouseenter' className="absolute md:top-5 md:right-5 top-3 right-0">
                           <FontAwesomeIcon icon={faPencilSquare} onClick={openModal} className='size-10 realative'/>
                       </Tooltip>}
                       {isModalOpen && <EditProfileForm closeModal={closeModal}/>}
                   </div>
                    
                    { <div>
                        <h1 className='text-7 font-black leading-tight'>{data.author}</h1>
                        <p className='mb-2'>
                            <div className='font-bold'>bio:</div>
                            {data.bio}
                        </p>
                        <div>0 following</div>
                        <div>0 followers</div>
                        {/* {userData.id === data.id && <p >hey</p>} */}
                        <div>{blogCount} blogs</div>
                    </div>}
               </div>}
                {/* <form onSubmit={handleSubmit}>
                    <label htmlFor='pfp'>change Profile Picture</label>
                    <input className="hidden" type="file" id="pfp" accept="image/*" onChange={handleImageChange} />
                    <button type="submit">Upload</button> 
                </form>  */}
                {/* {message && <p>{message}</p>} */}
                <div className='flex flex-col w-full mt-10 lg:mt-0 lg:w-[60%]'>
                    <h2 className='text-7 font-bold'>History</h2>
                    {blogData && <BlogList blogs={blogData} userId={userId} isLoading={loading}/>}
                    {loading === false && blogCount ===0 &&<p >Let’s turn this empty space into a place buzzing with your ideas! </p>}
                </div>
                <SpeedDialBtn/>
                
           </div>         
           <MobileNavBar/>
        </>
    );
};

export default Profile;


// import React, { useState,useEffect } from 'react';
// import { useParams, } from 'react-router-dom';
// // import UseFetch from '../components/useFetch';
// // import axios from 'axios';
// import api from '../api/axiosConfig';
// import ProfilePicture from '../components/profilePic';
// import BlogList from '../components/blogList';
// import SpeedDialBtn from "../components/speedDialBtn";
// import UseFetchLoggedUser from '../components/useFetchLoggedUser';
// import MobileNavBar from '../components/MobileNavBar';
// import UseFetch from '../components/useFetch';
// import CardSkeleton from '../components/cardSkeleton';


// const Profile = () => {
//     const { userId } = useParams();
    
//     // const [image, setImage] = useState(null);
//     // const [ownerId,setOwnerId] = useState(null);
//     // const [loading, setLoading] = useState(true);
//     // const [error, setError] = useState(null);
//     // const [data, setData] = useState(null);
//     // const [blogData, setBlogData] = useState([]);
    
//     // const [message, setMessage] = useState('');
//     const {  userData } = UseFetchLoggedUser("/api/users/me");
//     const {data:blogData, loading, error} = UseFetch(`http://127.0.0.1:4000/api/users/${userId}`)


    
//     // const handleDelete = async (blogId) => {
//     //     try {
//     //         await api.delete(`/api/blogs/${blogId}`, {
//     //             headers: {
//     //                 'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Include the token
//     //             },
//     //         });
//     //         // Remove the deleted blog from the state
//     //         setBlogData(blogData.filter(blog => blog.Blog.id !== blogId));
//     //         console.log('Blog deleted successfully');
//     //     } catch (error) {
//     //         console.error('Error deleting blog:', error);
//     //     }
//     // };

    
    
//     // useEffect(() => {
//     //     setTimeout(() =>{

//     //         const fetchUserBlog = async () => {
//     //             setLoading(true);
//     //             try {
//     //                 const response = await api.get(`/api/users/${userId}`); // Use Axios to fetch user data
//     //                 setBlogData(response.data); // Assuming the user ID is in the response
//     //                 // console.log(response.data);
//     //             } catch (err) {
//     //                 setError(err.message); // Set error message
//     //             } finally {
//     //                 setLoading(false); // Set loading to false
//     //             }
//     //         };
    
//     //         fetchUserBlog();
//     //     },1000)
//     // }, [userId]);
//     const blogCount = blogData ? blogData.length : 0;

//     // const handleImageChange = (event) => {
//     //     setImage(event.target.files[0]);
//     // };

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     const formData = new FormData();
//     //     // Append your file or data to formData
//     //     formData.append('file', image); // Assuming selectedFile is your file input
 
//     //     try {
//     //         const response = await api.post(`/api/users/${userId}/upload-profile-picture`, formData, {
//     //             headers: {
//     //                 'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Include the token
//     //                 'Content-Type': 'multipart/form-data', // Ensure the content type is set correctly
//     //             },
//     //         });
//     //         console.log('Upload successful:', response.data);
            
//     //         // Update the image state with the new image URL
//     //         setImage(URL.createObjectURL(image)); // Create a local URL for the uploaded image
//     //     } catch (error) {
//     //         console.error('Error uploading file:', error);
//     //     }
//     // };
//     return (
//         <>


//             {/* <h1>Upload Profile Image</h1> */}
//            <div className=' flex flex-col lg:flex-row  sm:pt-28 pt-20 sm:w-[95%] w-[90%] m-auto pb-20 justify-between'>
//                <div className='flex flex-row   gap-10 items-start justify-center'>
//                     {userId && <ProfilePicture size={250} userId={userId} />}
                    
//                     {userData && <div>
//                         {blogData && blogCount > 0 && blogData[0].Blog ? ( // Check if blogData has items and the first item has Blog
//                         <h1 className='text-7 font-black'>{blogData[0].Blog.owner.author}</h1>
//     ) : null}
                        
//                         <div>0 following</div>
//                         <div>0 followers</div>
//                         {/* {userData.id !== userId && <p >hey</p>} */}
//                         <div>{blogCount} blogs</div>
//                     </div>}
//                </div>
//                 {/* <form onSubmit={handleSubmit}>
//                     <label htmlFor='pfp'>change Profile Picture</label>
//                     <input className="hidden" type="file" id="pfp" accept="image/*" onChange={handleImageChange} />
//                     <button type="submit">Upload</button> 
//                 </form>  */}
//                 {/* {message && <p>{message}</p>} */}
//                 <div className='flex flex-col w-full mt-10 lg:mt-0 lg:w-[60%]'>
//                     <h2 className='text-7 font-bold'>History</h2>
                    
//             {loading && <div className="">{[...Array(5)].map((_, index) => (
//                     <CardSkeleton key={index} />
//                 ))}</div>}
//             {error && <div className=" text-4xl uppercase mt-40 w-[80%] m-auto flex flex-col gap-5 justify-center items-center">{error}</div>}
//                     {blogData && <BlogList blogs={blogData} userId={userId} isLoading={loading}/>}
//                     {loading === false && blogCount ===0 &&<p >Let’s turn this empty space into a place buzzing with your ideas! </p>}
//                 </div>
//                 <SpeedDialBtn/>
                
//            </div>         
//            <MobileNavBar/>
//         </>
//     );
// };

// export default Profile;
