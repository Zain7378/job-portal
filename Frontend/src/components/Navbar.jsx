import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {toast} from 'react-hot-toast';
import "../App.css";
function Navbar() {
  const handleLogout=()=>{
    localStorage.removeItem('user')
    toast.success('Logout successfully');
    setTimeout(()=>{
      window.location.reload();
    },500)
  }
  const [isMenuOpen, SetIsMenuOpen] = useState(false);
  const handleMenuToggler = () => {
    SetIsMenuOpen(!isMenuOpen);
  };
  const navitems = [
    {
      path: "/",
      title: "Start a search",
    },
    {
      path: "/my-job",
      title: "My Jobs",
    },
    {
      path: "/salary",
      title: "Salary Estimate",
    },
    {
      path: "/post-job",
      title: "Post a Job",
    },
  ];
  return (
    <>
      <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mb-10">
        <nav className="flex items-center justify-between mt-5">
          <div className="flex gap-1 items-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40"
                height="40"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#40c4ff"
                  d="M28.004,1c-5.382,0-9.949,5.206-13.14,11.472c1.615-4.713,3.152-7.482,3.152-7.482 c-8.107,10.848-8.013,24.027-8.013,24.027l0.011-0.037c-0.015,0.299-0.022,0.587-0.022,0.864c0,7.891,2.364,17.154,10.929,17.154 c9.451,0,18.062-12.875,18.062-27.018C38.982,3.064,31.162,1,28.004,1z M14.02,30.004c0-11.091,6.302-25.01,13.366-25.01 c4.302,0,7.348,5.451,6.569,18c0,0,1.224-5.03,0.664-11.641c0.832,2.301,1.385,5.418,1.385,9.645c0,2.188-0.333,4.451-0.908,6.667 c-1.637,5.555-5.387,13.336-10.391,13.336c-6.258,0-7.725-8.053-7.725-8.053c0,8.993,5.608,10.088,8.482,10.06 c-1.053,0.637-2.1,0.997-3.095,0.997C17.05,44.006,14.02,39.229,14.02,30.004z"
                ></path>
              </svg>
            </div>
            <div>
              <NavLink to="/" className="text-2xl ">
                Job Portal
              </NavLink>
            </div>
          </div>
          <ul className="hidden md:flex gap-12 ">
            {navitems.map(({ path, title }) => (
              <li key={path} className="text-base text-black">
                <NavLink
                  to={path}
                  className={
                    ({ isActive }) =>
                      isActive ? "text-blue-600" : "text-gray-600" // Ensure there's a fallback class
                  }
                >
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
      {
        localStorage.getItem('user')?  
        <button onClick={handleLogout} className="py-2 px-5 text-white hover:bg-red-600 duration-200  border rounded bg-red-400">
        Logout
      </button>  
        :
        <div className="text-base text-black font-medium space-x-5 hidden lg:block">
        <Link to="/Login" className="py-2 px-5  border rounded">
          Login
        </Link>
        <Link
          to="/signup"
          className="py-2 px-5  border rounded bg-blue-400 text-white"
        >
          Sign Up
        </Link>
      </div>
     
      }
          <div className="md:hidden block">
            <button onClick={handleMenuToggler}>
            {isMenuOpen?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mt-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mt-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>}

            </button>
          </div>
        </nav>
        <div className="md:hidden block">
        <ul className={`px-4 bg-black py-5 space-y-2 rounded-md  mt-3 ${isMenuOpen?"":"hidden"}`}>
            {navitems.map(({ path, title }) => (
              <li key={path} className="text-base text-white ">
                <NavLink
                  to={path}
                  className={
                    ({ isActive }) =>
                      isActive ? "text-blue-600" : "text-gray-600" // Ensure there's a fallback class
                  }
                >
                  {title}
                </NavLink>
              </li>
            ))}
           {/* <li className="text-gray-500 "> <Link to="/Login" >
              Login
            </Link></li> */}
          </ul>
          
        </div>
      </header>
    </>
  );
}

export default Navbar;
