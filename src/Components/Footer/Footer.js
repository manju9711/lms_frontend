import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="bg-[#0F0C29] text-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-12">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center mb-4">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="logo" className="w-8 h-8 mr-2" />
            <h2 className="text-2xl font-semibold">EduTec</h2>
          </div>
          <p className="text-gray-300 text-sm">
           Join thousands of learners worldwide and build your future with expert-led online courses.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="bg-[#5C27FE] p-3 rounded-full hover:bg-white hover:text-[#5C27FE] transition">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-[#5C27FE] p-3 rounded-full hover:bg-white hover:text-[#5C27FE] transition">
              <FaXTwitter />
            </a>
            <a href="#" className="bg-[#5C27FE] p-3 rounded-full hover:bg-white hover:text-[#5C27FE] transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="bg-[#5C27FE] p-3 rounded-full hover:bg-white hover:text-[#5C27FE] transition">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li><a href="#">About</a></li>
            <li><a href="#">Course</a></li>
            <li><a href="#">Instructor</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#">Instructor Details</a></li>
            <li><a href="#">Purchase Guide</a></li>
          </ul>
        </div>

        {/* Our Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Company</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Technology</a></li>
            <li><a href="#">Instructors</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-start space-x-3">
              <FaPhoneAlt className="mt-1" /> <span>8790657843</span>
            </li>
            <li className="flex items-start space-x-3">
              <FaEnvelope className="mt-1" /> <span>edutec@gmail.com</span>
            </li>
            <li className="flex items-start space-x-3">
              <FaMapMarkerAlt className="mt-1" />
              <span>Sankaran Kovil Road,<br />Surandai</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      {/* <div className="text-center text-sm text-gray-400 mt-6">
        Copyright © 2025 <span className="text-white">PCS</span> | Developed By <span className="text-white">PCS</span>. All Rights Reserved
      </div> */}
      <div className="text-center text-sm text-gray-400 mt-6">
  Copyright © {new Date().getFullYear()} <span className="text-white">EduTec</span> | Developed By <span className="text-white">MP</span>. All Rights Reserved
</div>

    </footer>
  );
};

export default Footer;
