import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './images/logo.svg';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCourseOpen, setIsCourseOpen] = useState(false);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/LoginForm");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
    <ToastContainer />
    <header className="flex items-center justify-between py-4 px-8 bg-white shadow-sm font-quicksand relative z-50">
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="max-w-40" />
      </div>

      <nav className="hidden md:flex items-center gap-8 text-gray-800 font-medium relative">
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>

       
{/* Courses Dropdown - Click Based */}
{/* <div className="relative">
  <button
    onClick={() => setIsCourseOpen(!isCourseOpen)}
    className="flex items-center gap-1 hover:text-[#674CEF] transition duration-300"
  >
    Courses
    <svg
      className={`w-4 h-4 transform transition-transform duration-300 ${isCourseOpen ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {isCourseOpen && (
  <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-3 bg-white/60 backdrop-blur-md border rounded-xl shadow-lg w-64 z-50">
    <ul className="py-2">
      <li>
        <Link
          to="/Frontend"
          className="block px-4 py-2 text-gray-800 hover:bg-[#EF2E73] hover:text-white hover:scale-[1.02] transform transition-all duration-300 ease-in-out rounded-md"
          onClick={() => setIsCourseOpen(false)}
        >
          Frontend Development
        </Link>
      </li>
      <li>
        <Link
          to="/Backend"
          className="block px-4 py-2 text-gray-800 hover:bg-[#EF2E73] hover:text-white hover:scale-[1.02] transform transition-all duration-300 ease-in-out rounded-md"
          onClick={() => setIsCourseOpen(false)}
        >
          Backend Development
        </Link>
      </li>
      <li>
       
      </li>
      <li>
        <Link
          to="/DBMS"
          className="block px-4 py-2 text-gray-800 hover:bg-[#EF2E73] hover:text-white hover:scale-[1.02] transform transition-all duration-300 ease-in-out rounded-md"
          onClick={() => setIsCourseOpen(false)}
        >
          DBMS
        </Link>
      </li>
      <li>
        <Link
          to="/Fullstack"
          className="block px-4 py-2 text-gray-800 hover:bg-[#EF2E73] hover:text-white hover:scale-[1.02] transform transition-all duration-300 ease-in-out rounded-md"
          onClick={() => setIsCourseOpen(false)}
        >
          Full Stack Development
        </Link>
      </li>
      <li>
        <Link
          to="/Mobileapp"
          className="block px-4 py-2 text-gray-800 hover:bg-[#EF2E73] hover:text-white hover:scale-[1.02] transform transition-all duration-300 ease-in-out rounded-md"
          onClick={() => setIsCourseOpen(false)}
        >
          Mobile App Development
        </Link>
      </li>
    </ul>
  </div>
)}

</div> */}
<Link to="/AllCourses">Courses</Link>



        {/* <Link to="/Dashboard">My Account</Link> */}
       
<span
  onClick={() => {
  if (!token || !user) {
    localStorage.setItem("redirectMessage", "Please login to access your account");
    navigate("/LoginForm");
  } else if (user && user.role === "admin") {
    toast.warn("Only users can access My Account!", {
      position: "top-right",
      autoClose: 3000,
    });
  } else {
    navigate("/Dashboard");
  }
}}

  className="cursor-pointer hover:text-[#674CEF] transition duration-300"
>
  My Account
</span> 

        <Link to="/ContactUs">Contact</Link>
      </nav>

      {/* Right Side */}
      {!token || !user ? (
        <Link to="/LoginForm">
          <button className="relative overflow-hidden bg-[#674CEF] text-white px-5 py-2 rounded-full group">
            <span className="relative z-10 group-hover:text-white transition duration-300">
              Login / Signup
            </span>
            <span className="absolute inset-0 bg-[#EF2E73] transition-all duration-500 transform translate-x-full group-hover:translate-x-0 rounded-full"></span>
          </button>
        </Link>
      ) : (
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 bg-[#674CEF] text-white px-5 py-2 rounded-full hover:bg-[#5b3fe0] transition"
          >
            {user.username}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-50">
              <button
                onClick={handleLogout}
                className="block w-full text-center px-4 py-2 hover:bg-gray-100 text-base text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
    </>
  );
};

export default Header;
