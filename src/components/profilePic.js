import React, { useState, useEffect } from "react";


const ProfilePicture = ({ userId,altText, size }) => {
  
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://tc.a.7o7.cx/api/users/${userId}/profile-picture`, {
          method: "GET",
          headers: {
            "Content-Type": "image/jpeg",
          },
        });

        if (!response.ok) {
          throw new Error("Image must be below 1 megabyte");
        }

        // Create an object URL from the image blob
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        setProfilePic(imageUrl);
      } catch (err) {
        setError("Unable to fetch profile picture.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfilePicture();
  }, [userId]);

  if (loading) return  <div className="profile-pic-responsive  relative w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600" style={{'--default-size': `${size}px`,
}}>
    <svg className="-z-0 absolute w-10 h-14 text-gray-400 -left-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
   </div>;

  return (
    <div className="profile-picture-container relative">
      {profilePic ? (
        <img
          src={profilePic}
          alt={altText}
          className=" object-cover  rounded-full    overflow-hidden bg-gray-100  profile-pic-responsive"
          style={{'--default-size': `${size}px`,
           }}
          
        />
      ) : (
        ""
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ProfilePicture;

