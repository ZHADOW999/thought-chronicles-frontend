import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import { initFlowbite } from "flowbite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { MdHistoryEdu } from "react-icons/md";

const SpeedDialBtn = () => {
    useEffect(() => {
        initFlowbite();
    },[])
    return ( 
        

<div data-dial-init className="fixed end-6 bottom-6 group">
    <div id="speed-dial-menu-default" className="flex flex-col items-center hidden mb-4 space-y-2">
        
        <Link to="/stories">
            <button type="button" data-tooltip-target="tooltip-download" data-tooltip-placement="left" className="flex justify-center items-center w-[64px] h-[64px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                {/* <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                    <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                </svg> */}
                <MdHistoryEdu className="w-6 h-6"/>
                <span className="sr-only">Add stories</span>
            </button>
        </Link>
        <div id="tooltip-download" role="tooltip" className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Add story
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Link to="/newblog">
            <button type="button" data-tooltip-target="tooltip-copy" data-tooltip-placement="left" className="flex justify-center items-center w-[64px] h-[64px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 dark:hover:text-white shadow-sm dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
            <svg className="w-5 h-5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
        </svg>
                <span className="sr-only">Add blog</span>
            </button>
        </Link>
        <div id="tooltip-copy" role="tooltip" className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Add Blog
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
    </div>
    <button type="button" data-dial-toggle="speed-dial-menu-default" aria-controls="speed-dial-menu-default" aria-expanded="false" className="flex items-center justify-center text-white bg-bg-color-dark rounded-full w-16 h-16 hover:bg-text-color dark:bg-white dark:hover:bg-text-color focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-gray-600">
        {/* <svg className="w-5 h-5 transition-transform group-hover:rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
        </svg> */}
        <FontAwesomeIcon icon={faPen} className="w-5 h-5 transition-transform group-hover:rotate-45"/>
        <span className="sr-only">Open actions menu</span>
    </button>
</div>

     );
}
 
export default SpeedDialBtn;