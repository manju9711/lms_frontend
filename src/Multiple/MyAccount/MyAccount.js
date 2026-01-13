import React from "react";
import {
  FaUser,
  FaGraduationCap,
  FaStar,
  FaCog,
  FaSignOutAlt,
  FaBookmark,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Sidebar from "./Sidebar";

const MyAccount = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen flex font-sans bg-gray-100">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-white border-r shadow-sm p-6">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-blue-600 text-white w-24 h-24 flex items-center justify-center rounded-full text-3xl font-semibold">
            MJ
          </div>
          <p className="mt-2 text-gray-700">Hello,</p>
          <p className="font-semibold">Magi J</p>
        </div>

        <nav className="space-y-4 text-blue-600 font-medium">
          <MenuItem icon={<MdDashboard />} label="Dashboard" active />
          <MenuItem icon={<FaUser />} label="My Profile" />
          <MenuItem icon={<FaGraduationCap />} label="Enrolled Courses" />
          <MenuItem icon={<FaBookmark />} label="Wishlist" />
          <MenuItem icon={<FaStar />} label="Reviews" />
         
        </nav>

        <div className="border-t mt-8 pt-4 space-y-4 text-blue-600 font-medium">
          <MenuItem icon={<FaCog />} label="Settings" />
          <MenuItem icon={<FaSignOutAlt />} label="Logout" />
        </div>
      </aside> */}
      <Sidebar/>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-xl font-semibold mb-6">Dashboard</h1>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <StatCard icon="📘" label="Enrolled Courses" value="11" />
          <StatCard icon="🎓" label="Active Courses" value="7" />
          <StatCard icon="🏆" label="Completed Courses" value="4" />
        </div>

        {/* In Progress Courses */}
        <div>
          <h2 className="text-lg font-semibold mb-4">In Progress Courses</h2>
          <div className="bg-white shadow rounded-lg p-4 flex items-center gap-6">
            <img
              src="https://i.ibb.co/yfrwgrN/fullstacklogo.png"
              alt="Full Stack Dev"
              className="w-32 h-auto"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Full Stack Developer</h3>
              <div className="text-yellow-400 text-sm mb-1">
                ★★★★★ <span className="text-gray-600 text-xs">0.00</span>
              </div>
              <p className="text-gray-600 text-sm">
                Completed Lessons: <span className="font-bold">0 of 1 lesson</span>
              </p>
              <div className="h-1 mt-2 bg-gray-300 rounded-full">
                <div className="h-1 bg-blue-500 w-1/12 rounded-full"></div>
              </div>
            </div>
           
          </div>
        </div>
      </main>
    </div>
    <Footer/>
    </>
  );
};

const MenuItem = ({ icon, label, active }) => (
  <div
    className={`flex items-center gap-3 px-4 py-2 rounded ${
      active ? "bg-blue-600 text-white" : "hover:bg-blue-100"
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </div>
);

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white border rounded-lg shadow p-6 flex flex-col items-center justify-center text-center">
    <div className="text-4xl">{icon}</div>
    <div className="text-2xl font-bold mt-2">{value}</div>
    <div className="text-sm text-gray-600 mt-1">{label}</div>
  </div>
);

export default MyAccount;
