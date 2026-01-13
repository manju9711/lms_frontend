// import React from 'react';
// import { FaClock, FaBookOpen, FaStar } from 'react-icons/fa';

// import course1 from './images/course1.jpg';
// import course2 from './images/course2.jpg';
// import course3 from './images/course3.jpg';
// import course4 from './images/course4.jpg';

// const popularcourses = [
//   {
//     category: 'Frontend',
//     title: 'Mastering React for Modern Web Development',
//     price: '$160',
//     lessons: 30,
//     hours: 10,
//     image: course1
//   },
//   {
//     category: 'Backend',
//     title: 'PHP Fundamentals: Beginner to Advanced',
//     price: '$110',
//     lessons: 28,
//     hours: 9,
//     image: course2
//   },
//   {
//     category: 'Programming',
//     title: 'Java Essentials for Software Developers',
//     price: '$130',
//     lessons: 32,
//     hours: 12,
//     image: course3
//   },
//   {
//     category: 'Backend',
//     title: 'Node.js Crash Course – Build Server-side Apps',
//     price: '$150',
//     lessons: 26,
//     hours: 10,
//     image: course4
//   }
// ];


// const Courses = () => {
//   return (
//     <div className="py-16 px-4 bg-cover bg-no-repeat font-quicksand" style={{ backgroundImage: `url('./images/course-bg.jpg')` }}>
//       <div className="text-center mb-10">
//         <span className="text-sm bg-[#EF2E73] text-white px-4 py-2 rounded-full font-medium">Popular Courses</span>
//         <h2 className="sm:text-3xl text-2xl font-bold mt-4">Pick A Course To Get Started</h2>
//       </div>

//       <div className="grid md:grid-cols-4 lg:grid gap-6 max-w-7xl mx-auto">
//         {popularcourses.map((course, idx) => (
//           <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden">
//             <div className="relative">
//               <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
//               <span className="absolute top-40 right-0 bg-[#674CEF] text-white px-3 py-1 rounded-full text-sm font-semibold">
//                 {course.price}
//               </span>
//             </div>
//             <div className="p-4">
//               <p className="text-xs bg-pink-100 text-pink-600 px-2 py-1 inline-block rounded-md mb-2 font-medium">
//                 {course.category}
//               </p>
//               <h3 className="font-semibold text-lg mb-2 leading-snug">{course.title}</h3>
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="text-yellow-500 flex gap-1">
//                   {[...Array(5)].map((_, i) => (
//                     <FaStar key={i} />
//                   ))}
//                 </div>
//                 {/* <span className="text-sm text-gray-500">{course.rating}</span> */}
//               </div>
//               <hr className="mb-3" />
//               <div className="flex justify-between text-sm text-gray-600">
//                 <span className="flex items-center gap-2"><FaBookOpen /> {course.lessons} Lessons</span>
//                 <span className="flex items-center gap-2"><FaClock /> {course.hours} Hours</span>
//               </div>
//             </div>
//             <div className="flex justify-center mb-3">
//   <button className="relative overflow-hidden bg-[#7E5EFF] text-white px-6 py-2 rounded-full font-medium group">
//     <span className="relative z-10 transition duration-300 group-hover:text-white">
//       Enroll Now →
//     </span>
//     <span className="absolute inset-0 bg-[#EF2E73] transition-all duration-500 transform translate-x-full group-hover:translate-x-0 z-0"></span>
//   </button>
// </div>

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
//   );
// };

// export default Courses;

//api
// src/components/Courses.js
import React, { useEffect, useState } from "react";
import {
  FaClock,
  FaBookOpen,
  FaStar,
  FaVideo,
  FaChalkboardTeacher,
  FaMapMarkerAlt,
} from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const DEFAULT_LESSONS = 30;
const DEFAULT_HOURS = 10;

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [showModeModal, setShowModeModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modeLoading, setModeLoading] = useState(false);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // ========== helpers for per-course mode ==========
  const makeModeKey = (courseId) =>
    user ? `courseMode_${user.id}_${courseId}` : null;

  const getStoredModeForCourse = (courseId) => {
    const key = makeModeKey(courseId);
    if (!key) return null;
    return localStorage.getItem(key);
  };

  const storeModeForCourse = (courseId, mode) => {
    const key = makeModeKey(courseId);
    if (!key) return;
    localStorage.setItem(key, mode);
  };

  const redirectToModePage = (courseId, mode) => {
    if (mode === "live") {
      window.location.href = `/LiveSession`;
    } else if (mode === "offline") {
      window.location.href = `/OfflineSession`;
    } else {
      // default: recording
      window.location.href = `/CourseDetails/${courseId}`;
    }
  };

  const getModeFee = (course, mode) => {
    if (!course) return 0;

    const recording = Number(course.price) || 0;
    const live =
      course.livePrice !== undefined && course.livePrice !== null
        ? Number(course.livePrice)
        : recording;
    const offline =
      course.offlinePrice !== undefined && course.offlinePrice !== null
        ? Number(course.offlinePrice)
        : recording;

    if (mode === "recording") return recording;
    if (mode === "live") return live;
    if (mode === "offline") return offline;
    return recording;
  };

  // ========== fetch courses from backend ==========
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const query = user?.id ? `?userId=${user.id}` : "";
        const res = await axios.get(
          `http://localhost:5000/api/course${query}`
        );
        setCourses(res.data || []);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchCourses();
  }, [user?.id]);

  // ========== mode select ==========
  const handleModeSelect = async (mode) => {
    if (!selectedCourse || !user) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.warn("Please login to enroll.");
      return;
    }

    const selectedFee = getModeFee(selectedCourse, mode);

    localStorage.setItem("selectedMode", mode);
    localStorage.setItem("selectedModeFee", String(selectedFee));
    storeModeForCourse(selectedCourse.id, mode);

    try {
      setModeLoading(true);

      await axios.post(
        `http://localhost:5000/api/course/enroll/${selectedCourse.id}`,
        {
          userId: user.id,
          userName:
            user.username ||
            `${user.firstName || ""} ${user.lastName || ""}`,
          mode,
        }
      );

      toast.success("Enrolled successfully!");

      setCourses((prev) =>
        prev.map((c) =>
          c.id === selectedCourse.id
            ? {
                ...c,
                isEnrolled: true,
                enrollments: [
                  ...(c.enrollments || []),
                  {
                    userId: user.id,
                    userName:
                      user.username ||
                      `${user.firstName || ""} ${user.lastName || ""}`,
                    enrolledDate: new Date().toISOString(),
                    mode,
                  },
                ],
              }
            : c
        )
      );

      const cid = selectedCourse.id;
      setShowModeModal(false);
      setSelectedCourse(null);
      redirectToModePage(cid, mode);
    } catch (err) {
      console.error("Enroll failed:", err);
      const msg = err.response?.data?.message || "Enrollment failed!";
      toast.error(msg);
    } finally {
      setModeLoading(false);
    }
  };

  const modeLabelMap = {
    recording: "Recording Session",
    live: "Live Session",
    offline: "Offline Session",
  };

  const handleModeClick = (mode) => {
    if (!selectedCourse) return;

    const label = modeLabelMap[mode] || "this mode";
    const ok = window.confirm(
      `You selected "${label}" for "${selectedCourse.courseTitle}".\n\nProceed?`
    );
    if (ok) handleModeSelect(mode);
  };

  // only 4 popular cards
  const visibleCourses = courses.slice(0, 4);

  return (
    <>
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
          {visibleCourses.map((course) => {
            const isEnrolled =
              course.isEnrolled ??
              (Array.isArray(course.enrollments) &&
                course.enrollments.some(
                  (en) => String(en.userId) === String(user?.id)
                ));

            // ⭐ rating like AllCourses – user’s own rating
            const userReview = course.reviews?.find(
              (r) => String(r.userId) === String(user?.id)
            );
            const rating = userReview?.rating || 0;

            return (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
              >
                <div className="relative">
                  <img
                    src={`http://localhost:5000/uploads/${course.image}`}
                    alt={course.courseTitle}
                    className="w-full h-48 object-cover"
                  />
                  {/* <span className="absolute top-40 right-0 bg-[#674CEF] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ₹{course.price}
                  </span> */}
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <p className="text-xs text-center bg-pink-100 text-pink-600 px-2 py-1 inline-block rounded-md mb-2 font-medium">
                    {course.category}
                  </p>

                  <h3 className="font-semibold text-lg mb-1 leading-snug">
                    {course.courseTitle}
                  </h3>

                  {/* description like AllCourses */}
                  <p className="line-clamp-2 text-gray-700 text-sm">
                    {course.courseDescription}
                  </p>

                  {course.courseDescription &&
                    course.courseDescription.length > 80 && (
                      <button
                        onClick={() => {
                          const token = localStorage.getItem("token");
                          const hasUser = !!user;

                          if (token && hasUser) {
                            window.location.href = `/CourseDetails/${course.id}`;
                          } else {
                            localStorage.setItem(
                              "redirectCourseId",
                              course.id
                            );
                            localStorage.setItem("redirectAction", "view");
                            localStorage.setItem(
                              "redirectMessage",
                              "Please login to view course details."
                            );
                            localStorage.setItem(
                              "redirectBackTo",
                              "/Courses"
                            );
                            window.location.href = "/LoginForm";
                          }
                        }}
                        className="text-[#EF2E73] hover:underline text-xs font-medium mt-1"
                      >
                        Read More →
                      </button>
                    )}

                  {/* rating stars – functional */}
                  <div className="flex items-center gap-2 mb-4 mt-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < rating ? "text-yellow-500" : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <hr className="mb-3" />
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-2">
                      <FaBookOpen /> {DEFAULT_LESSONS} Lessons
                    </span>
                    <span className="flex items-center gap-2">
                      <FaClock /> {DEFAULT_HOURS} Hours
                    </span>
                  </div>

                  <div className="mt-auto flex justify-center mb-1">
                    <button
                      onClick={() => {
                        const token = localStorage.getItem("token");

                        if (!token || !user) {
                          localStorage.setItem(
                            "redirectCourseId",
                            course.id
                          );
                          localStorage.setItem("redirectAction", "enroll");
                          localStorage.setItem(
                            "redirectMessage",
                            "Please login to enroll in a course."
                          );
                          localStorage.setItem(
                            "redirectBackTo",
                            "/Courses"
                          );
                          window.location.href = "/LoginForm";
                          return;
                        }

                        if (isEnrolled) {
                          const storedMode =
                            getStoredModeForCourse(course.id) ||
                            "recording";
                          redirectToModePage(course.id, storedMode);
                          return;
                        }

                        setSelectedCourse(course);
                        setShowModeModal(true);
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
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-700">
            We have more Courses in different Categories.{" "}
            <Link
              to="/AllCourses"
              className="text-purple-600 font-medium hover:underline"
            >
              Browse All →
            </Link>
          </p>
        </div>
      </div>

      {/* ====== mode selection modal ====== */}
      {showModeModal && selectedCourse && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 backdrop-blur-sm">
          <div className="w-full max-w-2xl mx-4">
            <div className="relative rounded-3xl bg-gradient-to-br from-[#fff5fb] via-white to-[#e9f3ff] shadow-[0_20px_60px_rgba(15,23,42,0.55)] p-[1px]">
              <div className="rounded-3xl bg-white/90 p-6 sm:p-8 relative">
                <button
                  onClick={() => {
                    setShowModeModal(false);
                    setSelectedCourse(null);
                  }}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#7E5EFF]/10 flex items-center justify-center text-[#7E5EFF]">
                    <FaChalkboardTeacher />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Choose Learning Mode
                    </h3>
                    <p className="text-xs text-gray-500">
                      Pick how you want to study this course
                    </p>
                  </div>
                </div>

                <div className="mb-5 rounded-2xl bg-slate-50 px-4 py-3 border border-slate-100">
                  <p className="text-[13px] text-gray-500 tracking-wide uppercase">
                    Course Selected
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 mt-1">
                    {selectedCourse.courseTitle}
                  </p>
                </div>

                <div className="space-y-4">
                  <button
                    disabled={modeLoading}
                    onClick={() => handleModeClick("recording")}
                    className="w-full rounded-2xl border border-indigo-400/70 bg-indigo-50/40 hover:bg-indigo-100 transition-all duration-200 px-4 py-3 sm:py-4 text-sm sm:text-[15px] font-medium flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-white shadow-sm flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
                        <FaVideo />
                      </div>
                      <div className="text-left">
                        <p className="text-indigo-700 font-semibold">
                          Recording Session
                        </p>
                        <p className="text-xs text-gray-500">
                          Watch pre-recorded videos anytime
                        </p>
                      </div>
                    </div>
                    <span className="flex flex-col items-end text-xs sm:text-[13px] text-indigo-600 font-semibold">
                      <span>₹{getModeFee(selectedCourse, "recording")}</span>
                      <span className="mt-0.5 text-[11px] font-normal text-indigo-400">
                        Self-paced access →
                      </span>
                    </span>
                  </button>

                  <button
                    disabled={modeLoading}
                    onClick={() => handleModeClick("live")}
                    className="w-full rounded-2xl border border-emerald-400/70 bg-emerald-50/40 hover:bg-emerald-100 transition-all duration-200 px-4 py-3 sm:py-4 text-sm sm:text-[15px] font-medium flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-white shadow-sm flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                        <FaChalkboardTeacher />
                      </div>
                      <div className="text-left">
                        <p className="text-emerald-700 font-semibold">
                          Live Session
                        </p>
                        <p className="text-xs text-gray-500">
                          Join live interactive classes
                        </p>
                      </div>
                    </div>
                    <span className="flex flex-col items-end text-xs sm:text-[13px] text-emerald-600 font-semibold">
                      <span>₹{getModeFee(selectedCourse, "live")}</span>
                      <span className="mt-0.5 text-[11px] font-normal text-emerald-500">
                        Join live →
                      </span>
                    </span>
                  </button>

                  <button
                    disabled={modeLoading}
                    onClick={() => handleModeClick("offline")}
                    className="w-full rounded-2xl border border-amber-400/70 bg-amber-50/40 hover:bg-amber-100 transition-all duration-200 px-4 py-3 sm:py-4 text-sm sm:text-[15px] font-medium flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-white shadow-sm flex items-center justify-center text-amber-500 group-hover:scale-105 transition-transform">
                        <FaMapMarkerAlt />
                      </div>
                      <div className="text-left">
                        <p className="text-amber-700 font-semibold">
                          Offline Session
                        </p>
                        <p className="text-xs text-gray-500">
                          Learn at our classroom / center
                        </p>
                      </div>
                    </div>
                    <span className="flex flex-col items-end text-xs sm:text-[13px] text-amber-600 font-semibold">
                      <span>₹{getModeFee(selectedCourse, "offline")}</span>
                      <span className="mt-0.5 text-[11px] font-normal text-amber-500">
                        In-person training →
                      </span>
                    </span>
                  </button>
                </div>

                {modeLoading && (
                  <p className="mt-4 text-xs text-gray-500 text-center">
                    Processing enrollment...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;

