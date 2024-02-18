import { Outlet } from "react-router-dom";
import Navbar from "./navbar.jsx";


function Base() {
    return (
        <>
            <div id="main">
                <Navbar />
                <Outlet />
            </div>
        </>
    )
}

export default Base;