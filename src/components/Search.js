import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css"
import ProfilePicture from "./profilePic";

const SearchBar = ({onSearch, width, height,showProfilePic,handleLogout,userId,data}) => {
    const [inputValue, setInputValue] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior (page reload)
        onSearch(inputValue); // Trigger the search action with the current search term
        
    };
    
    const [hover,setHover] = useState(false)
    const [hoverProfile,setHoverProfile] = useState(false)
  return (
    <Paper
    onSubmit={handleSubmit}
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        width: {width},
        height: {height},
        maxWidth: 720,
        backgroundColor: "#ffffff",
        borderRadius: 28,
        borderColor: "#000000",
        // overflow: "hidden",
      }}
    >
      <IconButton className="relative" onClick={()=> setHover((prev => !prev))}  sx={{ p: 3 }}>
        
        <MenuIcon  />
        {hover &&<div id="dropdown" className="z-10 absolute -bottom-40 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
            <li>
                <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
            </li>
            <li>
                <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
            </li>
            <li>
                <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
            </li>
            <li>
                <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
            </li>
            </ul>
        </div>
}
      </IconButton>
      <InputBase
  className=""
  sx={{
    ml: 1,
    flex: 1,
    border: 'none', // Start with no visible border
    outline: 'none',                // Remove the default outline
    boxShadow: 'none',              // Remove any shadow
    '&:focus': {
      border: 'none',  // Custom green border on focus
      outline: 'none',              // Remove browser focus outline
      boxShadow: 'none',            // Ensure no shadow appears
    },
    '&.Mui-focused': {
      border: 'none',  // MUI's focused border
      outline: 'none',              // No outline
      boxShadow: 'none',            // No shadow
    },
    '&:focus-visible': {
      outline: 'none',              // Remove focus-visible outline
      boxShadow: 'none',            // Remove focus-visible shadow
    },
  }}
  placeholder="Search"
  inputProps={{
    'aria-label': 'search',
    className: 'focus:ring-0 focus:border-0', // Tailwind override
  }}
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
/>



      <IconButton sx={{ p: {
        xs:1,
        sm:3
      } 

      }} type="submit">
        <SearchIcon 
        />
      </IconButton>
      
      {showProfilePic && data && <div className="relative mr-2" onClick={() => setHoverProfile((prev) => !prev)}
                 to={`/profile/${userId}`}><ProfilePicture   size={60} userId={data.id} />


                 {hoverProfile &&<div id="dropdown" className="z-10 absolute -right-10 -bottom-30 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
            <Link to={`/profile/${userId}`}>
                <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">View Profile</button>
            </Link>
            <li>
                <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit Profile</button>
            </li>
            
            <Link to="/logout" onClick={handleLogout}>
                <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout</button>
            </Link>
            </ul>
        </div>
}

                </div>}
    </Paper>
  );
};

export default SearchBar;