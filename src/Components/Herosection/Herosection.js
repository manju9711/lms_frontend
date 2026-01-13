// import React from 'react';
// import Header from '../Header/Header';
// import './Herosection.css'; 


// const HeroSection = () => {
//   return (
//     <div className="min-h-screen bannerImage">
//       <Header/>
//       <div className="container mx-auto px-6 py-12 flex flex-col-reverse md:flex-row items-center gap-12">
        
//         {/* Left content */}
//         <div className="md:w-1/2 text-center md:text-left">
//           <span className="inline-block bg-pink-100 text-pink-600 px-4 py-1 rounded-full font-semibold mb-4">
//             LEARN WITH MANY COURSES
//           </span>

//           <h1 className="text-4xl md:text-5xl font-bold leading-snug mb-4">
//             Learn New Skills Online <br />
//             From <span className="text-pink-500">Edutec</span>
//           </h1>

//           <p className="text-gray-600 mb-6">
//             There are many variations Courses available in our website,
//             But the majority Have Alteration.
//           </p>

//           <div className="flex rounded-full shadow-md overflow-hidden w-full max-w-lg mx-auto md:mx-0 mb-4">
//             <input
//               type="text"
//               className="w-full px-4 py-2 focus:outline-none"
//               placeholder="write topic and search"
//             />
//             <button className="bg-violet-600 text-white px-6">
//               Search
//             </button>
//           </div>

//           <p className="text-sm text-gray-600">
//             <strong>Search:</strong>{' '}
//             <a href="#" className="underline text-gray-800">Photoshop</a>,{' '}
//             <a href="#" className="underline text-gray-800">UI UX Design</a>,{' '}
//             <a href="#" className="underline text-gray-800">Programming</a>
//           </p>
//         </div>

//         {/* Right content */}
//         <div className="md:w-1/2 relative flex flex-col items-center gap-4">
//           <div className="relative z-10">
//             <img
//               src="https://i.ibb.co/4TmS3qs/students.png"
//               alt="students"
//               className="rounded-xl shadow-lg"
//             />
//             <div className="absolute bottom-4 left-4 bg-white shadow px-4 py-2 rounded-lg text-sm flex items-center gap-2">
//               <span className="text-violet-600 font-bold">15k+</span>
//               <span>Total students per month</span>
//             </div>
//           </div>
//           <div className="flex gap-4">
//             <img
//               src="https://i.ibb.co/Qcghq5D/student-girl.png"
//               alt="student 1"
//               className="w-32 rounded-lg shadow-md"
//             />
//             <img
//               src="https://i.ibb.co/3ShFZz8/student-headphones.png"
//               alt="student 2"
//               className="w-32 rounded-lg shadow-md"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;


import React from 'react';
import Header from '../Header/Header';
import './Herosection.css'; 
import { FaSearch } from "react-icons/fa";

import underline from './images/underline.svg';
import sideimg1 from './images/banner-sideimg1.png';
import sideimg2 from './images/banner-sideimag2.png';
import sideimg3 from './images/banner-sideimg3.png';


const HeroSection = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bannerImage font-quicksand">
      {/* <Header /> */}

      <div className="container mx-auto lg:px-20 px-10 sm:py-12 py-8 flex flex-col-reverse md:flex-row items-center gap-12 relative z-10">
        {/* Left Content */}
       <div className="md:w-1/2  text-center md:text-left font-[Quicksand]">
         
          <span className="inline-block lg:text-[15px] text-[13px] font-medium uppercase bg-[rgba(237,47,115,0.07)] text-[#EF2E73] px-5 py-1 rounded-full mb-3 tracking-[0.5px]">
  LEARN WITH MANY COURSES
</span>

         
          {/* <h1 className="text-[50px] font-bold mb-[2.6rem]  leading-snug"> 
  Learn New Skills Online <br />
  From <span className="text-[#EF2E73] relative highlight-text">Edutec</span>
</h1> */}
<h1 className="lg:text-5xl text-3xl font-bold capitalize mb-[2.6rem] text-gray-900 leading-snug">
  Learn New Skills Online <br />
  From{" "}
  <span className="relative inline-block text-[#EF2E73] font-bold">
    Edutec
    <img
      src={underline}
      alt="underline"
      className="absolute left-0  w-[100%] pointer-events-none"
    />
  </span>
</h1>



          <p className="text-gray-600 mb-6 text-base">
            There are many variations Courses available in our website , But the majority Have Alteration .
          </p>

          <div className="flex rounded-full overflow-hidden w-full max-w-lg mx-auto md:mx-0 mb-4 bg-white shadow-lg">
            <input
              type="text"
              className="w-full px-4 py-3 focus:outline-none text-sm"
              placeholder="write topic and search"
            />
           <button className="bg-[#674CEF] text-white px-6 text-sm flex items-center gap-2">
  <FaSearch /> Search
</button>

          </div>

          <p className="text-sm text-gray-600">
            <strong>Search :</strong>{' '}
            <a href="#" className="underline text-gray-800">Photoshop</a> ,{' '}
            <a href="#" className="underline text-gray-800">UI UX Design</a> ,{' '}
            <a href="#" className="underline text-gray-800">Programming</a>
          </p>
        </div> 

       
       {/* Right Content */}
<div className="md:w-1/2 relative flex">
  {/* Main student group image with abstract blob background */}
  <div className="relative z-10 md:flex hidden">
    <img
      src={sideimg1}
      alt="students group"
      className="max-w-96"
    />

    {/* Student count card */}
    <div className="absolute -bottom-5 left-5 bg-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 text-sm">
      <div className="flex -space-x-2">
        <img src="https://i.pravatar.cc/24?img=1" className="w-6 h-6 rounded-full border-2 border-white" />
        <img src="https://i.pravatar.cc/24?img=2" className="w-6 h-6 rounded-full border-2 border-white" />
        <img src="https://i.pravatar.cc/24?img=3" className="w-6 h-6 rounded-full border-2 border-white" />
        <img src="https://i.pravatar.cc/24?img=4" className="w-6 h-6 rounded-full border-2 border-white" />
      </div>
      <div>
        <p className="font-bold text-[#EF2E73]">15k+</p>
        <p className="text-gray-600">Total students per month</p>
      </div>
    </div>
  </div>

  {/* Decorative side images */}
  <div className="absolute top-0 right-0 flex flex-col items-center gap-4 2xl:flex hidden">
    <img
      src={sideimg2}
      alt="student waving"
      className="max-w-48 h-auto rounded-[2rem] shadow-lg"
    />
    <img
      src={sideimg3}
      alt="student headphones"
      className="max-w-48 h-auto rounded-[2rem] shadow-lg"
    />
  </div>
</div>

      </div>
    </div>
  );
};

export default HeroSection;




