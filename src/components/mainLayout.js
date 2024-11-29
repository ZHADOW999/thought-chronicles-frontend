//import { useState } from "react";
import Navbar from "./navBar";


const MainLayout = ({children}) => {
    return (
        <>
            <Navbar/>
            {children}
        </>
    )
}

export default MainLayout;