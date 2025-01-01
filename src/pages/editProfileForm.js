import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditProfile({closeModal}) {
const {userId}=useParams();

  const [profilePicture, setProfilePicture] = useState(null);
  const [author, setauthor] = useState("");
  const [bio, setBio] = useState("");


  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleSubmit = async (e) => {
    

    try {
      // Submit profile picture if provided
      if (profilePicture) {
        const formData = new FormData();
        formData.append("file", profilePicture);

        await axios.post(`https://tc.a.7o7.cx/api/users/${userId}/upload-profile-picture`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include the token
                'Content-Type': 'multipart/form-data', // Ensure the content type is set correctly
            },
            withCredentials: true,
        });
      }

      // Submit author and bio if provided
      if (author || bio) {
        await axios.put(`http://127.0.0.1:4000/api/users/profiles/${userId}`, { author, bio },{headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include the token
            'Content-Type': 'multipart/form-data', // Ensure the content type is set correctly
        },
        withCredentials: true
      });
      }

      // Close modal and clear form after submission
      closeModal();
      setProfilePicture(null);
      setauthor("");
      setBio("");

    //   alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
 
      


       
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-70 z-40"
            onClick={closeModal} // Close modal when clicking on overlay
          ></div>

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Profile Picture:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePictureChange}
                    className="block w-full text-sm border rounded-lg px-3 py-2 focus:ring focus:ring-green-500 focus:outline-none"
                  />
                  {profilePicture && (
                    <img
                      src={URL.createObjectURL(profilePicture)}
                      alt="Preview"
                      className="mx-auto mt-2 rounded-full w-32 h-32 object-cover"
                    />
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    author:
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setauthor(e.target.value)}
                    className="block w-full text-sm border rounded-lg px-3 py-2 focus:ring focus:ring-green-500 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Bio:</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="block w-full text-sm border rounded-lg px-3 py-2 focus:ring focus:ring-green-500 focus:outline-none"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      
    
  );
}

export default EditProfile;
