import React from "react";
import bgImage from './images/bg-image.jpeg';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";


import { FaChalkboardTeacher } from "react-icons/fa";
import { GiGlobe } from "react-icons/gi";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

const About = () => {
    return(
        <>
        <Header/>
         {/* Banner Section */}
      <section
        className="relative bg-cover bg-center py-24 text-center overflow-hidden font-quicksand"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-0"></div>
        <div className="absolute top-10 right-10 text-purple-700 text-4xl z-10">*</div>

        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#222] mb-4">About</h1>
          <div className="inline-block bg-[#FFA722] text-white px-6 py-2 rounded-full font-medium shadow-md">
            Home <span className="mx-1">»</span> About
          </div>
        </div>
      </section>
      <div className="bg-white text-base text-red-600 py-2  shadow-md">
  <marquee behavior="scroll" direction="left">
    We deliver training for today’s professionals on tomorrow’s technology
  </marquee>
</div>

<div className=" px-6 sm:px-10 lg:px-24">
  {/* rest of your About section content goes here */}
</div>

      <div className=" py-20 px-6 sm:px-10 lg:px-24">
      <div className="text-center mb-16">
        <h2 className="lg:text-4xl text-3xl font-bold text-blue-800 mb-2">Empowering Learners, Everywhere</h2>
        <p className="text-lg text-gray-600">Transforming education with flexibility, quality, and innovation</p>
        <div className="w-16 h-1 bg-blue-600 mx-auto mt-4"></div>
      </div>

      <p className="max-w-4xl mx-auto text-center text-gray-700 text-lg leading-relaxed mb-16">
        Our Learning Management System offers a modern and engaging platform where students can explore, enroll, and learn courses online at their convenience. With experienced instructors, hands-on project experience, and global accessibility, we’re dedicated to building the future of online education.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        <div className="shadow-lg p-6 rounded-xl bg-white hover:shadow-blue-200 transition-all">
          <div className="bg-blue-100 text-blue-600 w-14 h-14 mx-auto rounded-full flex items-center justify-center text-2xl">
            {/* <i className="fas fa-chalkboard-teacher"></i> */}
            <LiaChalkboardTeacherSolid />
          </div>
          <h3 className="text-xl font-semibold text-blue-700 mt-4">Expert Trainers</h3>
          <p className="text-gray-600 mt-2 text-sm">Learn from certified industry professionals with real-world experience.</p>
        </div>
    
        <div className="shadow-lg p-6 rounded-xl bg-white hover:shadow-green-200 transition-all">
          <div className="bg-green-100 text-green-600 w-14 h-14 mx-auto rounded-full flex items-center justify-center text-2xl">
            {/* <i className="fas fa-laptop-code"></i> */}
            <FaChalkboardTeacher />
          </div>
          <h3 className="text-xl font-semibold text-green-600 mt-4">100% Online Platform</h3>
          <p className="text-gray-600 mt-2 text-sm">Access all learning resources and attend classes from anywhere, anytime.</p>
        </div>
        

        <div className="shadow-lg p-6 rounded-xl bg-white hover:shadow-pink-200 transition-all">
          <div className="bg-pink-100 text-pink-500 w-14 h-14 mx-auto rounded-full flex items-center justify-center text-2xl">
            {/* <i className="fas fa-rocket"></i> */}
            <HiOutlineRocketLaunch />
          </div>
          <h3 className="text-xl font-semibold text-pink-500 mt-4">Our Mission</h3>
          <p className="text-gray-600 mt-2 text-sm">To provide accessible, quality education that empowers 10M+ learners.</p>
        </div>

        
        <div className="shadow-lg p-6 rounded-xl bg-white hover:shadow-indigo-200 transition-all">
          <div className="bg-indigo-100 text-indigo-600 w-14 h-14 mx-auto rounded-full flex items-center justify-center text-2xl">
            {/* <i className="fas fa-globe"></i> */}
            <GiGlobe />
          </div>
          <h3 className="text-xl font-semibold text-indigo-700 mt-4">Global Reach</h3>
          <p className="text-gray-600 mt-2 text-sm">Trusted by students worldwide across USA, Europe, Asia, and beyond.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto text-center text-gray-700 mt-20 text-base leading-relaxed">
        <strong>We are more than a training platform</strong> – we are a movement to redefine how education is delivered. With deep roots in the tech industry, our mission is to make high-quality education accessible, affordable, and practical. Join us to future-proof your skills.
      </div>
    </div>
      <Footer/>
        </>
    )
}
export default About;