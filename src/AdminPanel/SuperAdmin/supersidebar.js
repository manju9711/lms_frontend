import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaShoppingCart, FaFileInvoice, FaWallet, FaSignOutAlt,
  FaBoxes, FaBook, FaTable, FaThList
} from 'react-icons/fa';
import profile from '../images/a2.jpg';

import { PiStudentBold } from "react-icons/pi";
import { TbCategoryPlus } from "react-icons/tb";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineContactPhone } from "react-icons/md";



  const SuperSidebar = ({ selectedTab, setSelectedTab }) => {

     const token = localStorage.getItem('token');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
     const navigate = useNavigate();
  const handleSelect = (label) => {
    setSelectedTab(label);
  };
   const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/LoginForm');
  };

  return (
    <>
    <div className="w-64 min-h-full bg-[#1C1A57] text-white p-6 flex flex-col rounded-3xl">
      <h1 className="text-2xl font-bold mb-6">Edutec</h1>

      <div className="flex flex-col items-center justify-center mb-8">
        <img src={profile} className="rounded-full w-[130px] mb-4" alt="user" />
        <div className="text-center">
          <p className="font-semibold text-lg"> {user.username}</p>
          <p className="text-xs text-gray-300">{user.role}</p>
        </div>
      </div>

      <nav className="space-y-4 text-lg">
         <SidebarLink
          icon={<IoBookOutline />}
          label="All Users"
          active={selectedTab === 'All Users'}
          onClick={handleSelect}
        />
        <SidebarLink
          icon={<IoBookOutline />}
          label="Manage Courses"
          active={selectedTab === 'Manage Courses'}
          onClick={handleSelect}
        />
        {/* <SidebarLink
          icon={<TbCategoryPlus />}
          label="Courses Category"
          active={selectedTab === 'Courses Category'}
          onClick={handleSelect}
        /> */}
        <SidebarLink
          icon={<PiStudentBold />}
          label="Enrolled Users"
          active={selectedTab === 'Enrolled Users'}
          onClick={handleSelect}
        />
        {/* <SidebarLink
          icon={<MdOutlineContactPhone />}
          label="Contact"
          active={selectedTab === 'Contact'}
          onClick={handleSelect}
        /> */}
        <SidebarLink
          icon={<MdOutlineContactPhone />}
          label="Paid Students"
          active={selectedTab === 'Paid Students'}
          onClick={handleSelect}
        />
      </nav>

      <div className="mt-auto pt-10">
        <SidebarLink
          icon={<FaSignOutAlt />}
          label="Log Out"
          danger
          // onClick={() => console.log('Logout clicked')}
           onClick={() => handleLogout()}
        />
      </div>
    </div>
    </>
  );
};

const SidebarLink = ({ icon, label, active, danger, onClick }) => (
  <button
    onClick={() => onClick(label)}
    className={`flex items-center gap-3 px-2 py-1 rounded-md w-full text-left ${
      active ? 'text-blue-300 font-semibold' : ''
    } ${danger ? 'text-red-400 hover:text-red-200' : 'hover:text-blue-300'}`}
  >
    {icon} {label}
  </button>
);


export default SuperSidebar;
