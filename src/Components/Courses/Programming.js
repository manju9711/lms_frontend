import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Programming = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from API
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/course?category=Programming');
        setCourses(res.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
    <Header/>
    
    <div className="py-16 px-4 bg-cover bg-no-repeat font-quicksand" style={{ backgroundImage: `url('./images/course-bg.jpg')` }}>
      <div className="text-center mb-10">
        <span className="text-sm bg-[#EF2E73] text-white px-4 py-2 rounded-full font-medium">Popular Courses</span>
        <h2 className="sm:text-3xl text-2xl font-bold mt-4">Pick A Course To Get Started</h2>
      </div>

      <div className="grid md:grid-cols-4 lg:grid gap-6 max-w-7xl mx-auto">
        {courses.map((course, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={`http://localhost:5000/uploads/${course.image}`} // image from backend
                alt={course.courseTitle}
                className="w-full h-48 object-cover"
              />
              <span className="absolute top-40 right-0 bg-[#674CEF] text-white px-3 py-1 rounded-full text-sm font-semibold">
                ₹{course.price}
              </span>
            </div>
            <div className="p-4">
              <p className="text-xs bg-pink-100 text-pink-600 px-2 py-1 inline-block rounded-md mb-2 font-medium">
                {course.category}
              </p>
              <h3 className="font-semibold text-lg mb-2 leading-snug">{course.courseTitle}</h3>
              {/* <p>{course.courseDescription}</p> */}
              <div className="flex items-center gap-2 mb-4">
                <div className="text-yellow-500 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
              <hr className="mb-3" />
            </div>
            <div className="flex justify-center mb-3">
              <button className="relative overflow-hidden bg-[#7E5EFF] text-white px-6 py-2 rounded-full font-medium group">
                <span className="relative z-10 transition duration-300 group-hover:text-white">
                  Enroll Now →
                </span>
                <span className="absolute inset-0 bg-[#EF2E73] transition-all duration-500 transform translate-x-full group-hover:translate-x-0 z-0"></span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-700">
          We have more Courses in different Categories.{' '}
          <a href="#" className="text-purple-600 font-medium hover:underline">Browse All →</a>
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Programming;
