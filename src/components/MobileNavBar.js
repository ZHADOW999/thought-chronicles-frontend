import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NotificationsNone } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Roofing } from "@mui/icons-material";
import { MdHistoryEdu } from "react-icons/md";
import Bookmarks from "@mui/icons-material/Bookmarks";
// import { Roofing } from "@mui/icons-material";


const MobileNavBar = () => {
    return (
        <div className={` bg-bg-color-light1 dark:bg-gray-800 px-4 md:hidden fixed bottom-0 left-0 right-0 z-[1000] h-16 `}>
            <div className="bg-bg-color-light1 dark:bg-gray-800 px-4 md:hidden fixed bottom-0 left-0 right-0 z-[1000] h-16">
                <div className="flex items-center justify-between h-16">
                    <Link to="/">
                        <IconButton
                            className="flex-shrink-0 p-2 text-black flex flex-col"
                            sx={{
                                color: "black",
                                svg: {
                                    fontSize: {
                                        xs: "1rem", // Default size for screens smaller than 480px
                                        sm: "1.5rem", // Larger size for screens 480px and above
                                    },
                                },
                            }}
                        >
                            <Roofing />
                            <p className="text-1">Home</p>
                        </IconButton>
                    </Link>
                    <Link to="/library">
                        <IconButton
                            className="flex-shrink-0 p-2 text-white flex flex-col"
                            sx={{
                                color: "black",
                                svg: {
                                    fontSize: {
                                        xs: "1rem",
                                        sm: "1.5rem",
                                    },
                                },
                            }}
                        >
                            <Bookmarks />
                            <p className="text-1">Bookmarks</p>
                        </IconButton>
                    </Link>
                    <Link to="/stories" >
                        <IconButton className="items-center p-2 flex-shrink-0 flex flex-col" sx={{color:"black"}}>
                            <MdHistoryEdu
                                className="w-5 h-5 sm:w-7 sm:h-7"
                            />
                            <p className="text-1">Stories</p>
                        </IconButton>
                    </Link>
                    <Link to="">
                        <IconButton
                            className="flex-shrink-0 p-2 text-white flex flex-col"
                            sx={{
                                color: "black",
                                svg: {
                                    fontSize: {
                                        xs: "1rem",
                                        sm: "1.5rem",
                                    },
                                },
                            }}
                        >
                            <NotificationsNone />
                            <p className="text-1">Updates</p>
                        </IconButton>
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default MobileNavBar;