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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [blogData, setBlogData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {  userData } = UseFetchLoggedUser("/api/users/me");
    const {  data } = UseFetch(`https://tc.a.7o7.cx/api/users/profiles/${userId}`);
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
            console.error(err);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    fetchUserBlog();
            
    }, [userId]);
    const blogCount = blogData.length;

    
    return (
        <>
            {/* {loading && <div className="text-5xl text-center uppercase">Loading...</div>} */}
            {error && <div className=" text-4xl uppercase mt-40 w-[80%] m-auto flex flex-col gap-5 justify-center items-center">{error}</div>}


            {/* <h1>Upload Profile Image</h1> */}
           <div className=' flex flex-col lg:flex-row  sm:pt-28 pt-20 sm:w-[95%] w-[100%] m-auto pb-20 justify-between'>
               {loading ?(
                <div className="w-full flex flex-col items-center space-y-4 md:space-x-4 p-4 bg-gray-50 rounded-md shadow h-auto md:h-96 animate-pulse md:w-[35%] mr-10">
                {/* Profile Picture Skeleton */}
                <div className="size-60 bg-gray-200 rounded-full animate-pulse"></div>
          
                {/* Text Skeleton */}
                <div className="flex-1 space-y-3 mt-2 w-full flex flex-col justify-center items-center ">
                  {/* Name Skeleton */}
                  <div className="h-6 bg-gray-200 rounded-md animate-pulse w-[100%]   mt-2"></div>
          
                  {/* Bio and Stats Skeleton */}
                  <div className="space-y-2  mt-2 w-full md:block flex justify-center items-center flex-col">
                    <div className="h-4 bg-gray-200 rounded-md animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded-md animate-pulse w-2/4"></div>
                    <div className="h-4 bg-gray-200 rounded-md animate-pulse w-1/4"></div>
                  </div>
                </div>
              </div>
               ) :(<div className=' flex  flex-col items-center text-center md:text-left  gap-5 md:items-start  md:justify-start justify-center'>
                   <div className="relative">{
                       userId &&  <ProfilePicture size={250} userId={userId}/>}
                       {userData && data && userData.id ===data.id &&<Tooltip title='edit profile' position='right' interactive trigger='mouseenter' className="absolute md:top-5 md:right-5 top-3 right-0">
                           <FontAwesomeIcon icon={faPencilSquare} onClick={openModal} className='size-10 realative'/>
                       </Tooltip>}
                       {isModalOpen && <EditProfileForm closeModal={closeModal}/>}
                   </div>
                    
                    {data && <div className='font-roboto-regular w-[50%] '>
                        <h1 className=' mx-auto text-5 font-roboto-bold leading-tight text-wrap whitespace-normal w-auto break-words'>{data.author}</h1>
                        {data.bio !== null && <p className='mb-2 font-roboto-regular'>
                            <span className='font-roboto-bold mr-[1px]'>bio: </span>
                            {data.bio}
                        </p>}
                        <div className='font-roboto-regular'>0 following</div>
                        <div className='font-roboto-regular'>0 followers</div>
                        {/* {userData.id === data.id && <p >hey</p>} */}
                        <div>{blogCount} blogs</div>
                    </div>}
               </div>
            )}
                <div className='flex flex-col w-full mt-10 lg:mt-0 lg:w-[60%]'>
                    <h2 className='text-7 font-roboto-bold'>History</h2>
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



