//old
// import React, { useEffect, useState } from 'react';
// import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// import bgImage from './images/bg-image.jpeg';
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';
// import ReviewModal from './ReviewModal';

// const CourseDetails = () => {
//   const [videoCompleted, setVideoCompleted] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [activeTab, setActiveTab] = useState('course');
//   const [course, setCourse] = useState(null);
  
//   const [enrollDate, setEnrollDate] = useState(null);
//   const [totalEnrolled, setTotalEnrolled] = useState(0);

//   const { id } = useParams();
//   // const isEnrolled = !!enrollDate;
//   const user = JSON.parse(localStorage.getItem('user'));


//   // useEffect(() => {
//   //   const fetchCourse = async () => {
//   //     try {
//   //       const res = await axios.get(`http://localhost:5000/api/course/${id}`);
//   //       setCourse(res.data);
//   //     } catch (err) {
//   //       console.error('Failed to load course:', err);
//   //     }
//   //   };

//   //   // const fetchEnrollmentDetails = async () => {
//   //   //   try {
//   //   //     const user = JSON.parse(localStorage.getItem('user'));
//   //   //     if (!user) return;

//   //   //     const res = await axios.post(`http://localhost:5000/api/enroll/details/${id}`, {
//   //   //       userId: user.id,
//   //   //     });

//   //   //     setEnrollDate(res.data.enrolledDate);
//   //   //     setTotalEnrolled(res.data.totalEnrolled);
//   //   //   } catch (err) {
//   //   //     console.error('❌ Failed to fetch enrollment details:', err);
//   //   //   }
//   //   // };

//   //   fetchCourse();
//   //   // fetchEnrollmentDetails();

//   //   const completed = localStorage.getItem('videoCompleted') === 'true';
//   //   setVideoCompleted(completed);
//   // }, [id, showModal]);

//     const navigate = useNavigate();

//   // const handleStartLearning = () => {
//   //   navigate(`/VideoLessonPage/${course.id}`);
//   // };
//   const handleStartLearning = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const isPaid = localStorage.getItem(`paid_${user?.id}_${id}`) === 'true';

//   if (isPaid) {
//     // navigate(`/VideoLessonPage/${course.id}`);
//     navigate(`/Courseplayer/${course.id}`);

//   } else {
//     navigate(`/Checkout/${id}`, { state: { courseId: id } });
//   }
// };


//   const fetchCourse = async () => {
//   try {
//     const res = await axios.get(`http://localhost:5000/api/course/${id}`);
//     setCourse(res.data);
//   } catch (err) {
//     console.error('Failed to load course:', err);
//   }
// };

// useEffect(() => {
//   fetchCourse();
  

//   // const completed = localStorage.getItem('videoCompleted') === 'true';
//   // setVideoCompleted(completed);
//   const fetchProgress = async () => {
//   try {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) return;

//     const res = await axios.get(`http://localhost:5000/api/${user.id}/${id}`); //courseprogress get api
//     setVideoCompleted(res.data.isCompleted);
//   } catch (err) {
//     console.error("Error fetching course progress:", err);
//   }
// };
// fetchProgress();
// }, [id, showModal]);

  
//   const formattedDate = enrollDate
//     ? new Date(enrollDate).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//       })
//     : null;

//   // const handleCompleteCourse = () => {
//   //   setShowModal(true);
//   // };
//   const handleCompleteCourse = () => {
//   localStorage.setItem("reviewCourseId", id); // store for modal use
//   setShowModal(true);
// };
       


//   return (
//     <>
//       <Header />

//       {/* Banner */}
//       <section
//         className="relative bg-cover bg-center py-24 text-center overflow-hidden font-quicksand"
//         style={{ backgroundImage: `url(${bgImage})` }}
//       >
//         <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-0"></div>
//         <div className="relative z-10">
//           <h1 className="text-4xl font-bold text-[#222] mb-4">Course Details</h1>
//           <div className="inline-block bg-[#FFA722] text-white px-6 py-2 rounded-full font-medium shadow-md">
//             Home <span className="mx-1">»</span> Course Details
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-3 gap-10">
//         {/* Left Column */}
//         <div className="lg:col-span-2">
//           <div className="mb-4">
//             <h2 className="text-xl font-semibold">{course?.courseTitle}</h2>
//             <p className="text-sm text-gray-600 mt-1">
//               By <span className="font-medium text-blue-600">Edutec Trainings</span>
//               <span className="mx-2">|</span>
//               <span>Categories: {course?.category}</span>
//             </p>
//           </div>

//           <div className="border rounded-md p-6 flex flex-col items-center">
//             {course?.image && (
//               <img
//                 src={`http://localhost:5000/uploads/${course.image}`}
//                 alt={course.courseTitle}
//                 className="w-52 object-contain"
//               />
//             )}
//             <h1 className="text-3xl font-bold mt-6">{course?.courseTitle}</h1>
//             <hr className="mt-2 border-t w-1/2 border-gray-300" />
//           </div>

//           {/* Tabs */}
//           <div className="mt-6 border-b border-gray-200 flex gap-6 text-sm">
//             {['course', 'reviews', 'qa'].map((tab) => (
//               <button
//                 key={tab}
//                 className={`pb-2 font-semibold ${
//                   activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'hover:text-blue-600'
//                 }`}
//                 onClick={() => setActiveTab(tab)}
//               >
//                 {tab === 'course' ? 'Course Info' : tab.toUpperCase()}
//               </button>
//             ))}
//           </div>

//           {/* Tab Content */}
//           <div className="mt-6 text-sm text-gray-800 leading-relaxed">
//             {activeTab === 'course' && (
//               <>
//                 <h3 className="text-md font-semibold mb-2">About Course</h3>
//                 <p>{course?.courseDescription}</p>
//               </>
//             )}

//             {/* {activeTab === 'reviews' && (
//               <>
//                 <h3 className="text-md font-semibold mb-2">Student Reviews</h3>
//                 <p className="text-gray-600">⭐ 4.5/5 average rating from 134 reviews.</p>
//                 <ul className="list-disc pl-6 mt-2 space-y-1">
//                   <li>Very clear and concise explanations – Ramya.</li>
//                   <li>Would love more real-world examples – Karthik.</li>
//                   <li>Excellent for beginners – Priya.</li>
//                 </ul>
//               </>
//             )} */}
//        {activeTab === 'reviews' && (
//   <>
//     <h3 className="text-md font-semibold mb-2">Your Review</h3>
//     {(() => {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const userReview = course?.reviews?.find(r => String(r.userId) === String(user?.id));

//       if (!user) {
//         return (
//           <p className="text-sm text-red-500">
//             Please <Link to="/LoginForm" className="underline">login</Link> to view your review.
//           </p>
//         );
//       }

//       if (userReview) {
//         return (
//           <ul className="mt-2 space-y-4">
//             <li className="border rounded p-4">
//               <div className="flex items-center gap-2 mb-1 text-yellow-500">
//                 {[...Array(userReview.rating)].map((_, i) => (
//                   <span key={i}>★</span>
//                 ))}
//                 {[...Array(5 - userReview.rating)].map((_, i) => (
//                   <span key={i}>☆</span>
//                 ))}
//               </div>
//               <p className="text-sm text-gray-800 italic">“{userReview.comment}”</p>
//               {/* <p className="text-xs text-gray-500 mt-1">– {userReview.userName }</p> */}
//             </li>
//           </ul>
//         );
//       } else {
//         return <p className="text-sm text-gray-500">You haven’t submitted a review yet.</p>;
//       }
//     })()}
//   </>
// )}



//             {activeTab === 'qa' && (
//               <>
//                 <h3 className="text-md font-semibold mb-2">Questions & Answers</h3>
//                 <ul className="list-disc pl-6 space-y-2">
//                   <li>
//                     <strong>Q:</strong> Is this course suitable for beginners?
//                     <br />
//                     <strong>A:</strong> Yes! This course starts from the basics and gradually moves to advanced topics.
//                   </li>
//                   <li>
//                     <strong>Q:</strong> Will I get a certificate?
//                     <br />
//                     <strong>A:</strong> Yes, upon completion of the course.
//                   </li>
//                 </ul>
//               </>
//             )}
//           </div>

//           {/* Syllabus Button */}
//           {/* <div className="mt-10">
//             {course?.pdf && isEnrolled ? (
//               <a
//                 href={`http://localhost:5000/uploads/${course.pdf}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold px-6 py-2 rounded shadow hover:scale-105 transition"
//               >
//                 📄 View / Download Syllabus
//               </a>
//             ) : (
//               <Link
//                 to={`/Checkout/${id}`}
//                 state={{ courseId: id }}
//                 className="inline-block bg-gray-500 text-white font-semibold px-6 py-2 rounded shadow hover:scale-105 transition"
//               >
//                 🔒 View / Download Syllabus
//               </Link>
//             )}
//           </div> */}
//           {/* Syllabus Button */}
// <div className="mt-10">
//   {course?.pdf && localStorage.getItem((`paid_${user.id}_${id}`)) === 'true' ? (
//     <a
//       href={`http://localhost:5000/uploads/${course.pdf}`}
//       download
//       target="_blank"
//       rel="noopener noreferrer"
//       className="inline-block bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold px-6 py-2 rounded shadow hover:scale-105 transition"
//     >
//       📄 View / Download Syllabus
//     </a>
//   ) : (
//     <Link
//       to={`/Checkout/${id}`}
//       state={{ courseId: id }}
//       className="inline-block bg-green-600 text-white font-semibold px-6 py-2 rounded shadow hover:scale-105 transition"
//     >
//       🔒 View / Download Syllabus
//     </Link>
//   )}
// </div>

//         </div>

//         {/* Right Column */}
//         <div className="bg-white shadow rounded-md p-6">
//           <p className="text-sm font-semibold mb-2">Course Progress</p>
//           <div className="w-full h-2 bg-gray-200 rounded mb-3">
//             <div
//               className="h-full bg-blue-500 rounded transition-all duration-500"
//               style={{ width: videoCompleted ? '100%' : '0%' }}
//             ></div>
//           </div>
//           <p className="text-xs text-gray-600 mb-4">
//             {videoCompleted ? '100% Complete (1/1)' : '0% Complete (0/1)'}
//           </p>

         
//             {/* <button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold mb-2 hover:bg-blue-700"
//              onClick={handleStartLearning}>
//              🔒 Start Learning
//             </button> */}
//             {localStorage.getItem(`paid_${user.id}_${id}`) === 'true' ? (
//   <button
//     className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold mb-2 hover:bg-blue-700"
//     onClick={() => navigate(`/Courseplayer/${id}`)}
//   >
//     ▶️ Start Learning
//   </button>
// ) : (
//   // <Link
//   //   to={`/Checkout/${id}`}
//   //   state={{ courseId: id }}
//   //   className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold mb-4 hover:bg-blue-700"
//   // >
//   //   🔒 Unlock to Start Learning
//   // </Link>
//   <button
//     onClick={() => navigate(`/Checkout/${id}`, { state: { courseId: id } })}
//     className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold mb-4 hover:bg-blue-700 flex items-center justify-center gap-2"
//   >
//     🔒 Unlock to Start Learning
//   </button>
// )}

         

//           <button
//             className="w-full bg-blue-900 text-white py-2 rounded-md font-semibold hover:bg-blue-950"
//             onClick={handleCompleteCourse}
//           >
//             COMPLETE COURSE
//           </button>

//           {/* <ReviewModal show={showModal} onClose={() => setShowModal(false)} /> */}
//           <ReviewModal
//   show={showModal}
//   onClose={() => setShowModal(false)}
//   courseId={course?.id}
//   onReviewSubmitted={fetchCourse}
// />


//           {formattedDate && (
//             <p className="text-xs mt-3 text-green-600">
//               ✅ You enrolled in this course on <span className="font-medium">{formattedDate}</span>
//             </p>
//           )}

//           <div className="mt-6 text-sm text-gray-700 space-y-2 border-t pt-4">
//             <p>📊 Intermediate</p>
//             {/* <p>👥 {totalEnrolled} Total Enrolled</p> */}
//             {course?.price && <p>💰 Price: ₹{course.price}</p>}
//           </div>

//           <div className="mt-6 p-4 border rounded-md">
//             <p className="text-xs text-gray-500 mb-1">A course by</p>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
//                 ET
//               </div>
//               <p className="font-semibold text-sm">Edutec Trainings</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default CourseDetails;

//new
// import React, { useEffect, useState } from 'react';
// import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// import bgImage from './images/bg-image.jpeg';
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';
// import ReviewModal from './ReviewModal';

// const CourseDetails = () => {
//   const [videoCompleted, setVideoCompleted] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [activeTab, setActiveTab] = useState('course');
//   const [course, setCourse] = useState(null);
  
//   const [enrollDate, setEnrollDate] = useState(null);
//   const [totalEnrolled, setTotalEnrolled] = useState(0);
//   const [isPaid, setIsPaid] = useState(false);


//   const { id } = useParams();
//   // const isEnrolled = !!enrollDate;
//   const user = JSON.parse(localStorage.getItem('user'));


//   // useEffect(() => {
//   //   const fetchCourse = async () => {
//   //     try {
//   //       const res = await axios.get(`http://localhost:5000/api/course/${id}`);
//   //       setCourse(res.data);
//   //     } catch (err) {
//   //       console.error('Failed to load course:', err);
//   //     }
//   //   };

//   //   // const fetchEnrollmentDetails = async () => {
//   //   //   try {
//   //   //     const user = JSON.parse(localStorage.getItem('user'));
//   //   //     if (!user) return;

//   //   //     const res = await axios.post(`http://localhost:5000/api/enroll/details/${id}`, {
//   //   //       userId: user.id,
//   //   //     });

//   //   //     setEnrollDate(res.data.enrolledDate);
//   //   //     setTotalEnrolled(res.data.totalEnrolled);
//   //   //   } catch (err) {
//   //   //     console.error('❌ Failed to fetch enrollment details:', err);
//   //   //   }
//   //   // };

//   //   fetchCourse();
//   //   // fetchEnrollmentDetails();

//   //   const completed = localStorage.getItem('videoCompleted') === 'true';
//   //   setVideoCompleted(completed);
//   // }, [id, showModal]);

//     const navigate = useNavigate();

//   // const handleStartLearning = () => {
//   //   navigate(`/VideoLessonPage/${course.id}`);
//   // };
//   const handleStartLearning = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const isPaid = localStorage.getItem(`paid_${user?.id}_${id}`) === 'true';

//   if (isPaid) {
//     // navigate(`/VideoLessonPage/${course.id}`);
//     navigate(`/Courseplayer/${course.id}`);

//   } else {
//     navigate(`/Checkout/${id}`, { state: { courseId: id } });
//   }
// };


//   const fetchCourse = async () => {
//   try {
//     const res = await axios.get(`http://localhost:5000/api/course/${id}`);
//     setCourse(res.data);
//   } catch (err) {
//     console.error('Failed to load course:', err);
//   }
// };

// useEffect(() => {
//   fetchCourse();

//   const fetchProgress = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (!user) return;

//       const res = await axios.get(`http://localhost:5000/api/${user.id}/${id}`); // course progress
//       setVideoCompleted(res.data.isCompleted);
//     } catch (err) {
//       console.error("Error fetching course progress:", err);
//     }
//   };

//   fetchProgress();

//   // 🔐 check paid flag once and store in state
//   const u = JSON.parse(localStorage.getItem("user"));
//   if (u) {
//     const paid = localStorage.getItem(`paid_${u.id}_${id}`) === "true";
//     setIsPaid(paid);
//   }
// }, [id, showModal]);


  
//   const formattedDate = enrollDate
//     ? new Date(enrollDate).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//       })
//     : null;

//   // const handleCompleteCourse = () => {
//   //   setShowModal(true);
//   // };
//   const handleCompleteCourse = () => {
//   localStorage.setItem("reviewCourseId", id); // store for modal use
//   setShowModal(true);
// };
       


//   return (
//     <>
//       <Header />

//       {/* Banner */}
//       <section
//         className="relative bg-cover bg-center py-24 text-center overflow-hidden font-quicksand"
//         style={{ backgroundImage: `url(${bgImage})` }}
//       >
//         <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-0"></div>
//         <div className="relative z-10">
//           <h1 className="text-4xl font-bold text-[#222] mb-4">Course Details</h1>
//           <div className="inline-block bg-[#FFA722] text-white px-6 py-2 rounded-full font-medium shadow-md">
//             Home <span className="mx-1">»</span> Course Details
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-3 gap-10">
//         {/* Left Column */}
//         <div className="lg:col-span-2">
//           <div className="mb-4">
//             <h2 className="text-xl font-semibold">{course?.courseTitle}</h2>
//             <p className="text-sm text-gray-600 mt-1">
//               By <span className="font-medium text-blue-600">Edutec Trainings</span>
//               <span className="mx-2">|</span>
//               <span>Categories: {course?.category}</span>
//             </p>
//           </div>

//           <div className="border rounded-md p-6 flex flex-col items-center">
//             {course?.image && (
//               <img
//                 src={`http://localhost:5000/uploads/${course.image}`}
//                 alt={course.courseTitle}
//                 className="w-52 object-contain"
//               />
//             )}
//             <h1 className="text-3xl font-bold mt-6">{course?.courseTitle}</h1>
//             <hr className="mt-2 border-t w-1/2 border-gray-300" />
//           </div>

//           {/* Tabs */}
//           <div className="mt-6 border-b border-gray-200 flex gap-6 text-sm">
//             {['course', 'reviews', 'qa'].map((tab) => (
//               <button
//                 key={tab}
//                 className={`pb-2 font-semibold ${
//                   activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'hover:text-blue-600'
//                 }`}
//                 onClick={() => setActiveTab(tab)}
//               >
//                 {tab === 'course' ? 'Course Info' : tab.toUpperCase()}
//               </button>
//             ))}
//           </div>

//           {/* Tab Content */}
//           <div className="mt-6 text-sm text-gray-800 leading-relaxed">
//             {activeTab === 'course' && (
//               <>
//                 <h3 className="text-md font-semibold mb-2">About Course</h3>
//                 <p>{course?.courseDescription}</p>
//               </>
//             )}

//             {/* {activeTab === 'reviews' && (
//               <>
//                 <h3 className="text-md font-semibold mb-2">Student Reviews</h3>
//                 <p className="text-gray-600">⭐ 4.5/5 average rating from 134 reviews.</p>
//                 <ul className="list-disc pl-6 mt-2 space-y-1">
//                   <li>Very clear and concise explanations – Ramya.</li>
//                   <li>Would love more real-world examples – Karthik.</li>
//                   <li>Excellent for beginners – Priya.</li>
//                 </ul>
//               </>
//             )} */}
//        {activeTab === 'reviews' && (
//   <>
//     <h3 className="text-md font-semibold mb-2">Your Review</h3>
//     {(() => {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const userReview = course?.reviews?.find(r => String(r.userId) === String(user?.id));

//       if (!user) {
//         return (
//           <p className="text-sm text-red-500">
//             Please <Link to="/LoginForm" className="underline">login</Link> to view your review.
//           </p>
//         );
//       }

//       if (userReview) {
//         return (
//           <ul className="mt-2 space-y-4">
//             <li className="border rounded p-4">
//               <div className="flex items-center gap-2 mb-1 text-yellow-500">
//                 {[...Array(userReview.rating)].map((_, i) => (
//                   <span key={i}>★</span>
//                 ))}
//                 {[...Array(5 - userReview.rating)].map((_, i) => (
//                   <span key={i}>☆</span>
//                 ))}
//               </div>
//               <p className="text-sm text-gray-800 italic">“{userReview.comment}”</p>
//               {/* <p className="text-xs text-gray-500 mt-1">– {userReview.userName }</p> */}
//             </li>
//           </ul>
//         );
//       } else {
//         return <p className="text-sm text-gray-500">You haven’t submitted a review yet.</p>;
//       }
//     })()}
//   </>
// )}



//             {activeTab === 'qa' && (
//               <>
//                 <h3 className="text-md font-semibold mb-2">Questions & Answers</h3>
//                 <ul className="list-disc pl-6 space-y-2">
//                   <li>
//                     <strong>Q:</strong> Is this course suitable for beginners?
//                     <br />
//                     <strong>A:</strong> Yes! This course starts from the basics and gradually moves to advanced topics.
//                   </li>
//                   <li>
//                     <strong>Q:</strong> Will I get a certificate?
//                     <br />
//                     <strong>A:</strong> Yes, upon completion of the course.
//                   </li>
//                 </ul>
//               </>
//             )}
//           </div>

//           {/* Syllabus Button */}
//           {/* <div className="mt-10">
//             {course?.pdf && isEnrolled ? (
//               <a
//                 href={`http://localhost:5000/uploads/${course.pdf}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold px-6 py-2 rounded shadow hover:scale-105 transition"
//               >
//                 📄 View / Download Syllabus
//               </a>
//             ) : (
//               <Link
//                 to={`/Checkout/${id}`}
//                 state={{ courseId: id }}
//                 className="inline-block bg-gray-500 text-white font-semibold px-6 py-2 rounded shadow hover:scale-105 transition"
//               >
//                 🔒 View / Download Syllabus
//               </Link>
//             )}
//           </div> */}
//           {/* Syllabus Button */}
// <div className="mt-10">
//   {course?.pdf ? (
//     isPaid ? (
//       <a
//         href={`http://localhost:5000/uploads/${course.pdf}`}
//         download
//         target="_blank"
//         rel="noopener noreferrer"
//         className="inline-block bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold px-6 py-2 rounded shadow hover:scale-105 transition"
//       >
//         📄 View / Download Syllabus
//       </a>
//     ) : (
//       <Link
//         to={`/Checkout/${id}`}
//         state={{ courseId: id }}
//         className="inline-block bg-green-600 text-white font-semibold px-6 py-2 rounded shadow hover:scale-105 transition"
//       >
//         🔒 View / Download Syllabus
//       </Link>
//     )
//   ) : (
//     // optional: show nothing or a small text
//     <p className="text-xs text-gray-400">No syllabus uploaded for this course.</p>
//   )}
// </div>


//         </div>

//         {/* Right Column */}
//         <div className="bg-white shadow rounded-md p-6">
//           <p className="text-sm font-semibold mb-2">Course Progress</p>
//           <div className="w-full h-2 bg-gray-200 rounded mb-3">
//             <div
//               className="h-full bg-blue-500 rounded transition-all duration-500"
//               style={{ width: videoCompleted ? '100%' : '0%' }}
//             ></div>
//           </div>
//           <p className="text-xs text-gray-600 mb-4">
//             {videoCompleted ? '100% Complete (1/1)' : '0% Complete (0/1)'}
//           </p>

         
//        {isPaid ? (
//   <button
//     className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold mb-2 hover:bg-blue-700"
//     onClick={() => navigate(`/Courseplayer/${id}`)}
//   >
//     ▶️ Start Learning
//   </button>
// ) : (
//   <button
//     onClick={() => navigate(`/Checkout/${id}`, { state: { courseId: id } })}
//     className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold mb-4 hover:bg-blue-700 flex items-center justify-center gap-2"
//   >
//     🔒 Unlock to Start Learning
//   </button>
// )}


         

//           <button
//             className="w-full bg-blue-900 text-white py-2 rounded-md font-semibold hover:bg-blue-950"
//             onClick={handleCompleteCourse}
//           >
//             COMPLETE COURSE
//           </button>

//           {/* <ReviewModal show={showModal} onClose={() => setShowModal(false)} /> */}
//           <ReviewModal
//   show={showModal}
//   onClose={() => setShowModal(false)}
//   courseId={course?.id}
//   onReviewSubmitted={fetchCourse}
// />


//           {formattedDate && (
//             <p className="text-xs mt-3 text-green-600">
//               ✅ You enrolled in this course on <span className="font-medium">{formattedDate}</span>
//             </p>
//           )}

//           <div className="mt-6 text-sm text-gray-700 space-y-2 border-t pt-4">
//             <p>📊 Intermediate</p>
//             {/* <p>👥 {totalEnrolled} Total Enrolled</p> */}
//             {course?.price && <p>💰 Price: ₹{course.price}</p>}
//           </div>

//           <div className="mt-6 p-4 border rounded-md">
//             <p className="text-xs text-gray-500 mb-1">A course by</p>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
//                 ET
//               </div>
//               <p className="font-semibold text-sm">Edutec Trainings</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default CourseDetails;

//new1
import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import bgImage from './images/bg-image.jpeg';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ReviewModal from './ReviewModal';

const CourseDetails = () => {
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('course');
  const [course, setCourse] = useState(null);
  
  const [enrollDate, setEnrollDate] = useState(null);
  const [totalEnrolled, setTotalEnrolled] = useState(0);
  const [isPaid, setIsPaid] = useState(false);

  const [completedLessons, setCompletedLessons] = useState(0);
const [totalLessons, setTotalLessons] = useState(0);
const [showProgressModal, setShowProgressModal] = useState(false);



  const { id } = useParams();
  // const isEnrolled = !!enrollDate;
  const user = JSON.parse(localStorage.getItem('user'));


  

    const navigate = useNavigate();

 
  const handleStartLearning = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isPaid = localStorage.getItem(`paid_${user?.id}_${id}`) === 'true';

  if (isPaid) {
    // navigate(`/VideoLessonPage/${course.id}`);
    navigate(`/Courseplayer/${course.id}`);

  } else {
    navigate(`/Checkout/${id}`, { state: { courseId: id } });
  }
};


const fetchCourse = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/course/${id}`);
    const c = res.data;
    setCourse(c);

    const content = c.courseContent || [];
    const total = content.reduce(
      (sum, sec) => sum + (sec.lessons?.length || 0),
      0
    );
    setTotalLessons(total);
  } catch (err) {
    console.error('Failed to load course:', err);
  }
};


useEffect(() => {
  fetchCourse();

 const fetchProgress = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const res = await axios.get(
      `http://localhost:5000/api/progress/${user.id}/${id}`
    );

    setVideoCompleted(res.data.isCompleted);
    const doneCount = (res.data.completedLessons || []).length;
    setCompletedLessons(doneCount);
  } catch (err) {
    console.error("Error fetching course progress:", err);
  }
};


  fetchProgress();

  // 🔐 check paid flag once and store in state
  const u = JSON.parse(localStorage.getItem("user"));
  if (u) {
    const paid = localStorage.getItem(`paid_${u.id}_${id}`) === "true";
    setIsPaid(paid);
  }
}, [id, showModal]);


  
  const formattedDate = enrollDate
    ? new Date(enrollDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  // const handleCompleteCourse = () => {
  //   setShowModal(true);
  // };
  const handleCompleteCourse = () => {
  localStorage.setItem("reviewCourseId", id); // store for modal use
  setShowModal(true);
};
       
const progressPercent =
  totalLessons > 0
    ? Math.round((completedLessons / totalLessons) * 100)
    : videoCompleted
    ? 100
    : 0;


  return (
    <>
      <Header />

      {/* Banner */}
      <section
        className="relative bg-cover bg-center py-24 text-center overflow-hidden font-quicksand"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-0"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-[#222] mb-4">Course Details</h1>
          <div className="inline-block bg-[#FFA722] text-white px-6 py-2 rounded-full font-medium shadow-md">
            Home <span className="mx-1">»</span> Course Details
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-3 gap-10">
        {/* Left Column */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{course?.courseTitle}</h2>
            <p className="text-sm text-gray-600 mt-1">
              By <span className="font-medium text-blue-600">Edutec Trainings</span>
              <span className="mx-2">|</span>
              <span>Categories: {course?.category}</span>
            </p>
          </div>

          <div className="border rounded-md p-6 flex flex-col items-center">
            {course?.image && (
              <img
                src={`http://localhost:5000/uploads/${course.image}`}
                alt={course.courseTitle}
                className="w-52 object-contain"
              />
            )}
            <h1 className="text-3xl font-bold mt-6">{course?.courseTitle}</h1>
            <hr className="mt-2 border-t w-1/2 border-gray-300" />
          </div>

          {/* Tabs */}
          <div className="mt-6 border-b border-gray-200 flex gap-6 text-sm">
            {['course', 'reviews', 'qa'].map((tab) => (
              <button
                key={tab}
                className={`pb-2 font-semibold ${
                  activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'hover:text-blue-600'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'course' ? 'Course Info' : tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6 text-sm text-gray-800 leading-relaxed">
            {activeTab === 'course' && (
              <>
                <h3 className="text-md font-semibold mb-2">About Course</h3>
                <p>{course?.courseDescription}</p>
              </>
            )}

            {/* {activeTab === 'reviews' && (
              <>
                <h3 className="text-md font-semibold mb-2">Student Reviews</h3>
                <p className="text-gray-600">⭐ 4.5/5 average rating from 134 reviews.</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Very clear and concise explanations – Ramya.</li>
                  <li>Would love more real-world examples – Karthik.</li>
                  <li>Excellent for beginners – Priya.</li>
                </ul>
              </>
            )} */}
       {activeTab === 'reviews' && (
  <>
    <h3 className="text-md font-semibold mb-2">Your Review</h3>
    {(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userReview = course?.reviews?.find(r => String(r.userId) === String(user?.id));

      if (!user) {
        return (
          <p className="text-sm text-red-500">
            Please <Link to="/LoginForm" className="underline">login</Link> to view your review.
          </p>
        );
      }

      if (userReview) {
        return (
          <ul className="mt-2 space-y-4">
            <li className="border rounded p-4">
              <div className="flex items-center gap-2 mb-1 text-yellow-500">
                {[...Array(userReview.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
                {[...Array(5 - userReview.rating)].map((_, i) => (
                  <span key={i}>☆</span>
                ))}
              </div>
              <p className="text-sm text-gray-800 italic">“{userReview.comment}”</p>
              {/* <p className="text-xs text-gray-500 mt-1">– {userReview.userName }</p> */}
            </li>
          </ul>
        );
      } else {
        return <p className="text-sm text-gray-500">You haven’t submitted a review yet.</p>;
      }
    })()}
  </>
)}



            {activeTab === 'qa' && (
              <>
                <h3 className="text-md font-semibold mb-2">Questions & Answers</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Q:</strong> Is this course suitable for beginners?
                    <br />
                    <strong>A:</strong> Yes! This course starts from the basics and gradually moves to advanced topics.
                  </li>
                  <li>
                    <strong>Q:</strong> Will I get a certificate?
                    <br />
                    <strong>A:</strong> Yes, upon completion of the course.
                  </li>
                </ul>
              </>
            )}
          </div>

          {/* Syllabus Button */}
          {/* <div className="mt-10">
            {course?.pdf && isEnrolled ? (
              <a
                href={`http://localhost:5000/uploads/${course.pdf}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold px-6 py-2 rounded shadow hover:scale-105 transition"
              >
                📄 View / Download Syllabus
              </a>
            ) : (
              <Link
                to={`/Checkout/${id}`}
                state={{ courseId: id }}
                className="inline-block bg-gray-500 text-white font-semibold px-6 py-2 rounded shadow hover:scale-105 transition"
              >
                🔒 View / Download Syllabus
              </Link>
            )}
          </div> */}
          {/* Syllabus Button */}
<div className="mt-10">
  {course?.pdf ? (
    isPaid ? (
      <a
        href={`http://localhost:5000/uploads/${course.pdf}`}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold px-6 py-2 rounded shadow hover:scale-105 transition"
      >
        📄 View / Download Syllabus
      </a>
    ) : (
      <Link
        to={`/Checkout/${id}`}
        state={{ courseId: id }}
        className="inline-block bg-green-600 text-white font-semibold px-6 py-2 rounded shadow hover:scale-105 transition"
      >
        🔒 View / Download Syllabus
      </Link>
    )
  ) : (
    // optional: show nothing or a small text
    <p className="text-xs text-gray-400">No syllabus uploaded for this course.</p>
  )}
</div>


        </div>

        {/* Right Column */}
        <div className="bg-white shadow rounded-md p-6">
 <p className="text-sm font-semibold mb-2">Course Progress</p>

  {/* NEW progress UI */}
  <div className="w-full h-2 bg-gray-200 rounded mb-3">
    <div
      className="h-full bg-blue-500 rounded transition-all duration-500"
      style={{ width: `${progressPercent}%` }}
    ></div>
  </div>
  <p className="text-xs text-gray-600 mb-4">
    {totalLessons > 0
      ? `${progressPercent}% Complete (${completedLessons}/${totalLessons})`
      : videoCompleted
      ? '100% Complete (1/1)'
      : '0% Complete'}
  </p>
         
       {isPaid ? (
  <button
    className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold mb-2 hover:bg-blue-700"
    onClick={() => navigate(`/Courseplayer/${id}`)}
  >
    ▶️ Start Learning
  </button>
) : (
  <button
    onClick={() => navigate(`/Checkout/${id}`, { state: { courseId: id } })}
    className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold mb-4 hover:bg-blue-700 flex items-center justify-center gap-2"
  >
    🔒 Unlock to Start Learning
  </button>
)}

{isPaid && (
  <button
    className="w-full bg-white border border-blue-600 text-blue-600 py-2 rounded-md font-semibold mb-2 hover:bg-blue-50"
    onClick={() => setShowProgressModal(true)}
  >
    📊 View Session Progress
  </button>
)}


         

          <button
            className="w-full bg-blue-900 text-white py-2 rounded-md font-semibold hover:bg-blue-950"
            onClick={handleCompleteCourse}
          >
            COMPLETE COURSE
          </button>

          {/* <ReviewModal show={showModal} onClose={() => setShowModal(false)} /> */}
          <ReviewModal
  show={showModal}
  onClose={() => setShowModal(false)}
  courseId={course?.id}
  onReviewSubmitted={fetchCourse}
/>


          {formattedDate && (
            <p className="text-xs mt-3 text-green-600">
              ✅ You enrolled in this course on <span className="font-medium">{formattedDate}</span>
            </p>
          )}

          <div className="mt-6 text-sm text-gray-700 space-y-2 border-t pt-4">
            <p>📊 Intermediate</p>
            {/* <p>👥 {totalEnrolled} Total Enrolled</p> */}
            {course?.price && <p>💰 Price: ₹{course.price}</p>}
          </div>

          <div className="mt-6 p-4 border rounded-md">
            <p className="text-xs text-gray-500 mb-1">A course by</p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                ET
              </div>
              <p className="font-semibold text-sm">Edutec Trainings</p>
            </div>
          </div>
        </div>
      </div>

      {showProgressModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h3 className="text-lg font-semibold mb-3">Your Session Progress</h3>
      {totalLessons > 0 ? (
        <>
          <p className="text-sm text-gray-700 mb-3">
            You have completed{" "}
            <span className="font-semibold">{completedLessons}</span> out of{" "}
            <span className="font-semibold">{totalLessons}</span> Lessions.
          </p>
          <div className="w-full h-2 bg-gray-200 rounded mb-3">
            <div
              className="h-full bg-blue-500 rounded"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </>
      ) : (
        <p className="text-sm text-gray-600">
          No sessions available for this course.
        </p>
      )}

      <button
        onClick={() => setShowProgressModal(false)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
      >
        Close
      </button>
    </div>
  </div>
)}


      <Footer />
    </>
  );
};

export default CourseDetails;




















































































































