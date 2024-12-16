import React, { useState, useEffect } from "react";

const ProfilePicture = ({ userId, fallbackImage, altText = "Profile Picture",size }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // If no userId is provided, reset state
    if (!userId) {
      setProfilePic(null);
      setError(false);
      return;
    }

    const fetchProfilePic = async () => {
      try {
        // Reset previous state on new userId
        setError(false);
        setProfilePic(null);

        const response = await fetch(`http://127.0.0.1:4000/api/users/${userId}/profile-picture`);
        if (!response.ok) {
          throw new Error(`Failed to fetch profile picture: ${response.status}`);
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setProfilePic(imageUrl);
      } catch (err) {
        // Log only actual errors (not 404s)
        if (err.message && !err.message.includes("404")) {
          console.error(err.message);
        }
        setError(true);
      }
    };

    fetchProfilePic();
  }, [userId]);

  if (error && fallbackImage) {
    return <div class=" relative w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <svg class="-z-0 absolute w-20 h-24 text-gray-400 -left-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
</div>
  }

  return profilePic ? (
    <img
    style={{ width: `${size}px`, height: `${size}px` }}
      className={`object-cover rounded-full cursor-pointer`}
      src={profilePic}
      alt={altText}
    />
  ) : (
    <div class=" relative w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <svg class="-z-0 absolute w-20 h-24 text-gray-400 -left-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
</div>
  );
};

export default ProfilePicture;
