import React from 'react';
import {
  FaBriefcase, FaPaintBrush, FaUserGraduate,
  FaCode, FaDumbbell, FaHandHoldingUsd,
  FaVideo, FaPrint
} from 'react-icons/fa';

const categories = [
  { icon: <FaBriefcase />, title: 'Management', courses: 20, color: 'bg-[#7E5EFF]', text: 'text-[#7E5EFF]', bgLight: 'bg-[#f6f4fe]' },
  { icon: <FaPaintBrush />, title: 'Art & Design', courses: 20, color: 'bg-[#EF2E73]', text: 'text-[#EF2E73]', bgLight: 'bg-[#fef4f8]' },
  { icon: <FaUserGraduate />, title: 'Personal Development', courses: 15, color: 'bg-[#70C217]', text: 'text-[#70C217]', bgLight: 'bg-[#f6fdf2]' },
  { icon: <FaCode />, title: 'IT & Software', courses: 13, color: 'bg-[#FEA116]', text: 'text-[#FEA116]', bgLight: 'bg-[#fffaf1]' },
  { icon: <FaDumbbell />, title: 'Health & Fitness', courses: 16, color: 'bg-[#FF3D57]', text: 'text-[#FF3D57]', bgLight: 'bg-[#fff4f4]' },
  { icon: <FaHandHoldingUsd />, title: 'Business & Finance', courses: 12, color: 'bg-[#7E5EFF]', text: 'text-[#7E5EFF]', bgLight: 'bg-[#f6f4fe]' },
  { icon: <FaVideo />, title: 'Video & Photography', courses: 14, color: 'bg-[#FEA116]', text: 'text-[#FEA116]', bgLight: 'bg-[#fffaf1]' },
  { icon: <FaPrint />, title: 'Digital Printing', courses: 17, color: 'bg-[#EF2E73]', text: 'text-[#EF2E73]', bgLight: 'bg-[#fef4f8]' },
];

const TopCategories = () => {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto text-center font-quicksand">
      <span className="bg-[#EF2E73] text-white px-4 py-1 rounded-full text-sm inline-block mb-2">Top Category</span>
      <h2 className="sm:text-3xl text-2xl font-bold mb-10">Browse Our Top Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <div key={i} className={`p-6 rounded-xl ${cat.bgLight} hover:shadow-lg transition`}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center relative">
              <div className={`w-16 h-16 ${cat.color} rounded-full flex items-center justify-center text-white text-xl z-10 relative`}>
                {cat.icon}
              </div>
              <div className={`absolute top-0 left-0 w-16 h-16 rounded-full border-2 border-dashed ${cat.text} opacity-50`}></div>
            </div>
            <h3 className="text-lg font-semibold mb-2">{cat.title}</h3>
            <p className={`inline-block text-sm font-medium px-3 py-1 rounded-full bg-white ${cat.text} border`}>{cat.courses} Courses</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
