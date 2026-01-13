import React from 'react';
import { Link } from 'react-router-dom';

import { FaEnvelope, FaPhoneAlt, FaUser, FaSignInAlt, FaMapMarkerAlt, FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Topbar = () => {
  return (
    <div className="bg-[#18254F] text-white text-sm py-4 px-4 font-quicksand">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        {/* Left Side */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-[#EF2E73]" />
            <span>edutec@gmail.com</span>
          </div>
          <div className="border-l border-gray-400 h-4" />
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-[#EF2E73]" />
            <span>+91 8790657843</span>
          </div>
        </div>

        {/* Center */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaUser className="text-[#EF2E73]" />
           <Link to="/RegisterForm"> <span>Register</span></Link>
          </div>
          <div className="border-l border-gray-400 h-4" />
          <div className="flex items-center gap-2">
            <FaSignInAlt className="text-[#EF2E73]" />
            <Link to="/LoginForm"><span>Login</span></Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-[#EF2E73]" />
            <span>Edutec Software Solutions, Surandai</span>
          </div>
          <div className="border-l border-gray-400 h-4" />
          <div className="flex items-center gap-4 text-white text-lg">
            <FaFacebookF />
            <FaXTwitter />
            <FaLinkedinIn />
            <FaYoutube />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
