import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaGraduationCap,
  FaStar,
  FaCog,
  FaSignOutAlt,
  FaBookmark,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
  const menuItems = [
    { to: "/MyAccount", icon: <MdDashboard />, label: "Dashboard" },
    { to: "/MyProfile", icon: <FaUser />, label: "My Profile" },
    { to: "/account/enrolled", icon: <FaGraduationCap />, label: "Enrolled Courses" },
    { to: "/account/wishlist", icon: <FaBookmark />, label: "Wishlist" },
    { to: "/account/reviews", icon: <FaStar />, label: "Reviews" },
  ];

  return (
    <aside className="w-64 bg-white border-r shadow-sm p-6">
      <div className="flex flex-col items-center mb-10">
        <div className="bg-blue-600 text-white w-24 h-24 flex items-center justify-center rounded-full text-3xl font-semibold">MJ</div>
        <p className="mt-2 text-gray-700">Hello,</p>
        <p className="font-semibold">Magi J</p>
      </div>

      <nav className="space-y-3 text-blue-600 font-medium">
        {menuItems.map((item) => (
          <NavLink
            to={item.to}
            key={item.label}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t mt-8 pt-4 space-y-4 text-blue-600 font-medium">
        <NavLink to="/account/settings" className="flex items-center gap-3 px-4 py-2 hover:bg-blue-100 rounded">
          <FaCog className="text-lg" />
          <span>Settings</span>
        </NavLink>
        <NavLink to="/logout" className="flex items-center gap-3 px-4 py-2 hover:bg-blue-100 rounded">
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
