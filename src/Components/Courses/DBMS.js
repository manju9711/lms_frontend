//old
// import React, { useEffect, useState } from 'react';
// import { FaStar } from 'react-icons/fa';
// import axios from 'axios';
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';

// const DBMS = () => {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     // Fetch courses from API
//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/course?category=DBMS');
//         setCourses(res.data);
//       } catch (error) {
//         console.error('Failed to fetch courses:', error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   return (
//     <>
//     <Header/>
    
//     <div className="py-16 px-4 bg-cover bg-no-repeat font-quicksand" style={{ backgroundImage: `url('./images/course-bg.jpg')` }}>
//       <div className="text-center mb-10">
//         <span className="text-sm bg-[#EF2E73] text-white px-4 py-2 rounded-full font-medium">Popular Courses</span>
//         <h2 className="sm:text-3xl text-2xl font-bold mt-4">Pick A Course To Get Started</h2>
//       </div>

//       <div className="grid md:grid-cols-4 lg:grid gap-6 max-w-7xl mx-auto">
//         {courses.map((course, idx) => (
//           <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden">
//             <div className="relative">
//               <img
//                 src={`http://localhost:5000/uploads/${course.image}`} // image from backend
//                 alt={course.courseTitle}
//                 className="w-full h-48 object-cover"
//               />
//               <span className="absolute top-40 right-0 bg-[#674CEF] text-white px-3 py-1 rounded-full text-sm font-semibold">
//                 ₹{course.price}
//               </span>
//             </div>
//             <div className="p-4">
//               <p className="text-xs bg-pink-100 text-pink-600 px-2 py-1 inline-block rounded-md mb-2 font-medium">
//                 {course.category}
//               </p>
//               <h3 className="font-semibold text-lg mb-2 leading-snug">{course.courseTitle}</h3>
//               {/* <p>{course.courseDescription}</p> */}
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="text-yellow-500 flex gap-1">
//                   {[...Array(5)].map((_, i) => (
//                     <FaStar key={i} />
//                   ))}
//                 </div>
//               </div>
//               <hr className="mb-3" />
//             </div>
//             <div className="flex justify-center mb-3">
//               <button className="relative overflow-hidden bg-[#7E5EFF] text-white px-6 py-2 rounded-full font-medium group">
//                 <span className="relative z-10 transition duration-300 group-hover:text-white">
//                   Enroll Now →
//                 </span>
//                 <span className="absolute inset-0 bg-[#EF2E73] transition-all duration-500 transform translate-x-full group-hover:translate-x-0 z-0"></span>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="text-center mt-12">
//         <p className="text-gray-700">
//           We have more Courses in different Categories.{' '}
//           <a href="#" className="text-purple-600 font-medium hover:underline">Browse All →</a>
//         </p>
//       </div>
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default DBMS;

//new
//new
import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const DBMS = () => {
  const [courses, setCourses] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // 👇 Read logged-in user once
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/course?category=DBMS&userId=${user?.id || ''}`
        );
        setCourses(res.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, [user?.id]);

  return (
    <>
      <Header />
      <ToastContainer position="top-right" />

      <div
        className="py-16 px-4 bg-cover bg-no-repeat font-quicksand"
        style={{ backgroundImage: `url('./images/course-bg.jpg')` }}
      >
        <div className="text-center mb-10">
          <span className="text-sm bg-[#EF2E73] text-white px-4 py-2 rounded-full font-medium">
            Popular Courses
          </span>
          <h2 className="sm:text-3xl text-2xl font-bold mt-4">
            Pick A Course To Get Started
          </h2>
        </div>

        <div className="grid md:grid-cols-4 lg:grid gap-6 max-w-7xl mx-auto">
          {(showAll ? courses : courses.slice(0, 4)).map((course, idx) => {
            // ✅ Check if this user is already enrolled
            const isEnrolled =
              // if backend sends a boolean flag, use that
              course.isEnrolled ??
              (
                Array.isArray(course.enrollments) &&
                course.enrollments.some(
                  (en) => String(en.userId) === String(user?.id)
                )
              );

            // ⭐ user’s own rating (unchanged)
            const userReview = course.reviews?.find(
              (r) => String(r.userId) === String(user?.id)
            );
            const rating = userReview?.rating || 0;

            return (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col min-h-[400px]"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={`http://localhost:5000/uploads/${course.image}`}
                    alt={course.courseTitle}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-40 right-0 bg-[#674CEF] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ₹{course.price}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-xs bg-pink-100 text-pink-600 px-2 py-1 inline-block rounded-md mb-2 font-medium">
                    {course.category}
                  </p>

                  <h3 className="font-semibold text-lg min-h-[48px]">
                    {course.courseTitle}
                  </h3>

                  {/* Description */}
                  <p className="line-clamp-2 text-gray-700">
                    {course.courseDescription}
                  </p>

                  {/* Read More */}
                  {course.courseDescription.length > 80 && (
                    <button
                      onClick={() => {
                        const token = localStorage.getItem("token");
                        const hasUser = !!user;

                        if (token && hasUser) {
                          window.location.href = `/CourseDetails/${course.id}`;
                        } else {
                          localStorage.setItem("redirectCourseId", course.id);
                          localStorage.setItem("redirectAction", "view");
                          localStorage.setItem(
                            "redirectMessage",
                            "Please login to view course details."
                          );
                          window.location.href = "/LoginForm";
                        }
                      }}
                      className="text-[#EF2E73] hover:underline text-xs font-medium"
                    >
                      Read More →
                    </button>
                  )}

                  {/* Star Rating */}
                  <div className="text-yellow-500 flex gap-1 mb-4 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < rating ? (
                          <FaStar />
                        ) : (
                          <FaStar className="text-gray-300" />
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Enroll / Go to Course Button */}
                  <div className="mt-auto">
                    <hr className="mb-3" />
                    <div className="flex justify-center">
                      <button
                        onClick={async () => {
                          const token = localStorage.getItem("token");

                          // Not logged in → redirect to login
                          if (!token || !user) {
                            localStorage.setItem("redirectCourseId", course.id);
                            localStorage.setItem("redirectAction", "enroll");
                            localStorage.setItem(
                              "redirectMessage",
                              "Please login to enroll in a course."
                            );
                            window.location.href = "/LoginForm";
                            return;
                          }

                          // Already enrolled → just go to course
                          if (isEnrolled) {
                            window.location.href = `/CourseDetails/${course.id}`;
                            return;
                          }

                          // First time enroll
                          try {
                            await axios.post(
                              `http://localhost:5000/api/course/enroll/${course.id}`,
                              {
                                userId: user.id,
                                userName:
                                  user.username ||
                                  `${user.firstName} ${user.lastName}`,
                              }
                            );

                            toast.success("Enrolled successfully!");

                            // Update local state so button immediately changes
                            setCourses((prev) =>
                              prev.map((c) =>
                                c.id === course.id
                                  ? {
                                      ...c,
                                      isEnrolled: true,
                                      enrollments: [
                                        ...(c.enrollments || []),
                                        {
                                          userId: user.id,
                                          userName:
                                            user.username ||
                                            `${user.firstName} ${user.lastName}`,
                                          enrolledDate: new Date().toISOString(),
                                        },
                                      ],
                                    }
                                  : c
                              )
                            );

                            window.location.href = `/CourseDetails/${course.id}`;
                          } catch (err) {
                            console.error("Enroll failed:", err);
                            const msg =
                              err.response?.data?.message ||
                              "Enrollment failed!";
                            toast.error(msg);
                          }
                        }}
                        className="relative overflow-hidden bg-[#7E5EFF] text-white px-6 py-2 rounded-full font-medium group"
                      >
                        <span className="relative z-10 transition duration-300 group-hover:text-white">
                          {isEnrolled ? "Go to Course →" : "Enroll Now →"}
                        </span>
                        <span className="absolute inset-0 bg-[#EF2E73] transition-all duration-500 transform translate-x-full group-hover:translate-x-0 z-0"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More / View Less Button */}
        {courses.length > 4 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="relative overflow-hidden bg-[#7E5EFF] text-white px-6 py-2 rounded-lg font-medium group"
            >
              <span className="relative z-10 transition duration-300 group-hover:text-white">
                {showAll ? "View Less" : "View More"}
              </span>
              <span className="absolute inset-0 bg-[#EF2E73] transition-all duration-500 transform translate-x-full group-hover:translate-x-0 z-0"></span>
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default DBMS;


