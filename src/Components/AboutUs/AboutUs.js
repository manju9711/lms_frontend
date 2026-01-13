import React from 'react';
import { FaAward, FaFileAlt, FaUserTie, FaHandsHelping, FaInfinity } from 'react-icons/fa';

import aboutImg from './images/about-img.png';

const AboutUs = () => {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center font-quicksand">
      {/* Left: Image Layout */}
      <div className="relative flex gap-4 justify-center">
        {/* <img
          src="https://images.pexels.com/photos/4145191/pexels-photo-4145191.jpeg"
          alt="student1"
          className="w-28 h-80 object-cover rounded-[60px]"
        />
        <img
          src="https://images.pexels.com/photos/4145192/pexels-photo-4145192.jpeg"
          alt="student2"
          className="w-28 h-80 object-cover rounded-[60px]"
        />
        <img
          src="https://images.pexels.com/photos/4145193/pexels-photo-4145193.jpeg"
          alt="student3"
          className="w-28 h-80 object-cover rounded-[60px]"
        /> */}
        <img src={aboutImg} alt='image' />
        {/* Award Badge */}
        {/* <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-[#FEA116] text-white px-10 py-3 rounded-lg flex items-center gap-2 shadow-lg">
          <FaAward className="text-2xl" />
          <div>
            <p className="text-lg font-bold leading-tight">5+</p>
            <p className="text-sm">Years Experience</p>
          </div>
        </div> */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-[#FFA722] text-white px-10 py-3 rounded-lg flex items-center gap-2 shadow-lg animate-floatX">
  <FaAward className="text-2xl" />
  <div>
    <p className="text-lg font-bold leading-tight">5+</p>
    <p className="text-sm">Years Experience</p>
  </div>
</div>

      </div>

      {/* Right: Content */}
      <div>
        <span className="bg-[#EF2E73] text-white px-4 py-1 rounded-full text-sm inline-block mb-4">About Us</span>
        <h2 className="lg:text-3xl text-2xl font-bold mb-4">Learn and Grow your Skills From Edutec</h2>
        <p className="text-gray-500 mb-8">
          Join thousands of learners worldwide and build your future with expert-led online courses. Whether you’re looking to upskill, reskill, or explore a new domain, Edutec gives you flexible and affordable learning solutions to achieve your goals.
        </p>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 grid gap-4 mb-8">
          <div className="flex items-center gap-3 p-4 border rounded-lg">
            <FaFileAlt className="text-[#7E5EFF] text-xl" />
            <span>Flexible Course Plan</span>
          </div>
          <div className="flex items-center gap-3 p-4 border rounded-lg">
            <FaUserTie className="text-[#7E5EFF] text-xl" />
            <span>Expert Mentors</span>
          </div>
          <div className="flex items-center gap-3 p-4 border rounded-lg">
            <FaHandsHelping className="text-[#7E5EFF] text-xl" />
            <span>Support Expert</span>
          </div>
          <div className="flex items-center gap-3 p-4 border rounded-lg">
            <FaInfinity className="text-[#7E5EFF] text-xl" />
            <span>Lifetime Access</span>
          </div>
        </div>

        {/* <button className="bg-[#7E5EFF] text-white px-6 py-2 rounded-full font-medium hover:bg-[#5a42d1] transition">
          Explore More →
        </button> */}
        <button className="relative overflow-hidden bg-[#7E5EFF] text-white px-6 py-2 rounded-full font-medium group">
  <span className="relative z-10 transition duration-300 group-hover:text-white">
    Explore More →
  </span>
  <span className="absolute inset-0 bg-[#EF2E73] transition-all duration-500 transform translate-x-full group-hover:translate-x-0 z-0"></span>
</button>

      </div>
    </div>
  );
};

export default AboutUs;
