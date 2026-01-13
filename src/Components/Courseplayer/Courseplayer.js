//with complete certificate
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FaChevronLeft, FaChevronRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import axios from 'axios';
// import logo from './images/favicon.ico'; // change if needed

// export default function CoursePlayer() {
//   const { id } = useParams();
//   const navigate = useNavigate();   
//   const [course, setCourse] = useState(null);
//   const [current, setCurrent] = useState(0);        // current video index
//   const [completed, setCompleted] = useState([]);   // which lessons user ticked
//   const [expandedSections, setExpandedSections] = useState([]);
//   const [courseCompleted, setCourseCompleted] = useState(false);
//   const [totalLessons, setTotalLessons] = useState(0);  

//   const user = JSON.parse(localStorage.getItem('user'));

//   // ---- Fetch course details ----
//  useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/course/${id}`);
//         if (res.data) {
//           const c = res.data;
//           setCourse(c);

//           const content = c.courseContent || [];
//           const total = content.reduce(
//             (sum, sec) => sum + (sec.lessons?.length || 0),
//             0
//           );
//           setTotalLessons(total);                            // 👈 add
//         }
//       } catch (err) {
//         console.error('Error fetching course:', err);
//       }
//     };
//     fetchCourse();
//   }, [id]);


//   //Helper to save lesson progress
//   const saveLessonProgress = async (completedArray, totalLessons) => {
//   try {
//     await axios.post('http://localhost:5000/api/progress/lessons', {
//       userId: user.id,
//       courseId: parseInt(id, 10),
//       completedLessons: completedArray,
//       totalLessons
//     });
//   } catch (err) {
//     console.error('Error saving lesson progress:', err);
//   }
// };


//   // ---- When course loaded, init expandedSections based on courseContent length ----
//   useEffect(() => {
//     if (course && Array.isArray(course.courseContent)) {
//       setExpandedSections(Array(course.courseContent.length).fill(true));
//     }
//   }, [course]);

//   // ---- Fetch overall course progress (completed or not) ----
//  useEffect(() => {
//   const fetchProgress = async () => {
//     try {
//       if (!user || !id) return;
//       const res = await axios.get(
//         `http://localhost:5000/api/progress/${user.id}/${id}`
//       );

//       setCourseCompleted(res.data.isCompleted);
//       setCompleted(res.data.completedLessons || []);
//     } catch (err) {
//       console.error('Error fetching course progress:', err);
//     }
//   };

//   fetchProgress();
// }, [id, user]);


  
// //MARK AS COMPLETE – send totalLessons
//  const handleMarkAsComplete = async () => {
//   try {
//     const totalLessons = course?.videoUrls?.length || 0;

//     await axios.post('http://localhost:5000/api/progress/complete', {
//       userId: user.id,
//       courseId: parseInt(id, 10),
//     totalLessons: totalLessons || 0,   totalLessons
//     });

//     setCourseCompleted(true);

//     if (totalLessons > 0) {
//       const allIdx = Array.from({ length: totalLessons }, (_, i) => i);
//       setCompleted(allIdx);
//     }
//   } catch (err) {
//     console.error('Error marking course as complete:', err);
//   }
// };


//   if (!course) return <div className="text-center mt-10">Loading course...</div>;

//   const flatVideoList = course.videoUrls || [];
//   const isYoutube = flatVideoList[current]?.includes('youtube.com');

//   const toggleExpand = (index) => {
//     setExpandedSections((prev) =>
//       prev.map((val, i) => (i === index ? !val : val))
//     );
//   };

//   const handleVideoClick = (index) => {
//   if (!flatVideoList.length) return;

//   const safeIndex = Math.min(index, flatVideoList.length - 1);
//   setCurrent(safeIndex);

//   const actualIndex = safeIndex;

//   const nextCompleted = completed.includes(actualIndex)
//     ? completed.filter((i) => i !== actualIndex)
//     : [...completed, actualIndex];

//   setCompleted(nextCompleted);

//   const totalLessons = flatVideoList.length;
//   saveLessonProgress(nextCompleted, totalLessons);
// };


//   const handlePrev = () => {
//     if (current > 0) handleVideoClick(current - 1);
//   };

//   const handleNext = () => {
//     if (current < flatVideoList.length - 1) handleVideoClick(current + 1);
//   };

//   const courseContent = course.courseContent || [];

//   return (
//     <div className="min-h-screen p-4 flex flex-col lg:flex-row gap-6 bg-gray-100">
//       {/* Video Player Area */}
//       <div className="w-full lg:w-2/3 p-4 bg-white rounded-xl shadow">
//        <div className="flex items-center justify-between mb-4 border-b pb-3">
//   <img src={logo} alt="Logo" className="h-10" />

//   <div className="flex gap-2">
//     {courseCompleted && (
//       <button
//         onClick={() => navigate(`/DownloadCertificate/${id}`)}
//         className="px-4 py-2 rounded border border-green-600 text-green-700 text-sm hover:bg-green-50"
//       >
//         Download Certificate
//       </button>
//     )}

//     <button
//       onClick={handleMarkAsComplete}
//       disabled={courseCompleted}
//       className={`px-4 py-2 rounded text-white text-sm ${
//         courseCompleted
//           ? 'bg-green-600 cursor-not-allowed'
//           : 'bg-blue-600 hover:bg-blue-700'
//       }`}
//     >
//       {courseCompleted ? '✅ COMPLETED' : 'MARK AS COMPLETE'}
//     </button>
//   </div>
// </div>


//         <div className="relative flex items-center justify-center">
//           {flatVideoList[current] ? (
//             isYoutube ? (
//               <iframe
//                 className="w-full h-[300px] lg:h-[500px] rounded-xl"
//                 src={flatVideoList[current]}
//                 title={`Video ${current + 1}`}
//                 frameBorder="0"
//                 allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//             ) : (
//               <video
//                 controls
//                 className="w-full h-[300px] lg:h-[500px] rounded-xl"
//                 src={flatVideoList[current]}
//               />
//             )
//           ) : (
//             <p className="text-center text-gray-500">No video available</p>
//           )}

//           {/* Prev / Next Buttons */}
//           <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
//             <button
//               onClick={handlePrev}
//               className="bg-white text-black p-2 rounded-full shadow-lg"
//               disabled={current === 0}
//             >
//               <FaChevronLeft />
//             </button>
//           </div>
//           <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
//             <button
//               onClick={handleNext}
//               className="bg-white text-black p-2 rounded-full shadow-lg"
//               disabled={current === flatVideoList.length - 1}
//             >
//               <FaChevronRight />
//             </button>
//           </div>
//         </div>

//         <h1 className="mt-4 text-xl font-semibold">
//           Course Title: {course.courseTitle}
//         </h1>
//       </div>

//       {/* Course Content List */}
//       <div className="w-full lg:w-1/3 bg-white text-black p-4 rounded-xl max-h-[90vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
//         {courseContent.map((section, secIdx) => {
//           const lessons = section.lessons || [];

//           return (
//             <div key={secIdx} className="mb-4">
//               <div
//                 onClick={() => toggleExpand(secIdx)}
//                 className="flex justify-between items-center cursor-pointer border-b pb-2"
//               >
//                 <h3 className="font-semibold">{section.sectionTitle}</h3>
//                 {expandedSections[secIdx] ? <FaChevronUp /> : <FaChevronDown />}
//               </div>

//               {expandedSections[secIdx] && (
//                 <ul className="space-y-2 mt-2">
//                   {lessons.map((lessonTitle, vidIdx) => {
//                     const actualIndex =
//                       courseContent
//                         .slice(0, secIdx)
//                         .reduce(
//                           (acc, sec) => acc + (sec.lessons?.length || 0),
//                           0
//                         ) + vidIdx;

//                     return (
//                       <li
//                         key={vidIdx}
//                         onClick={() => handleVideoClick(actualIndex)}
//                         className={`cursor-pointer flex items-center justify-between p-2 border rounded-xl transition ${
//                           actualIndex === current
//                             ? 'bg-blue-100 border-blue-400'
//                             : 'hover:bg-gray-100'
//                         }`}
//                       >
//                         <label className="flex items-center gap-2">
//                           <input
//                             type="checkbox"
//                             checked={completed.includes(actualIndex)}
//                             readOnly
//                           />
//                           {lessonTitle}
//                         </label>
//                         <span className="text-sm text-gray-500">Watch</span>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import axios from 'axios';
import logo from './images/favicon.ico'; // change if needed

export default function CoursePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();   
  const [course, setCourse] = useState(null);
  const [current, setCurrent] = useState(0);        // current video index
  const [completed, setCompleted] = useState([]);   // which lessons user ticked
  const [expandedSections, setExpandedSections] = useState([]);
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [totalLessons, setTotalLessons] = useState(0);  

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
  if (completed.length === totalLessons && totalLessons > 0) {
    setCourseCompleted(true);   // auto complete UI update

    // also send progress to backend (optional)
    axios.post('http://localhost:5000/api/progress/complete', {
      userId: user.id,
      courseId: parseInt(id, 10),
      totalLessons
    }).catch(err => console.error("Auto complete error:", err));
  }
}, [completed, totalLessons]);


  // ---- Fetch course details ----
 useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/course/${id}`);
        if (res.data) {
          const c = res.data;
          setCourse(c);

          const content = c.courseContent || [];
          const total = content.reduce(
            (sum, sec) => sum + (sec.lessons?.length || 0),
            0
          );
          setTotalLessons(total);                            // 👈 add
        }
      } catch (err) {
        console.error('Error fetching course:', err);
      }
    };
    fetchCourse();
  }, [id]);


  //Helper to save lesson progress
  const saveLessonProgress = async (completedArray, totalLessons) => {
  try {
    await axios.post('http://localhost:5000/api/progress/lessons', {
      userId: user.id,
      courseId: parseInt(id, 10),
      completedLessons: completedArray,
      totalLessons
    });
  } catch (err) {
    console.error('Error saving lesson progress:', err);
  }
};


  // ---- When course loaded, init expandedSections based on courseContent length ----
  useEffect(() => {
    if (course && Array.isArray(course.courseContent)) {
      setExpandedSections(Array(course.courseContent.length).fill(true));
    }
  }, [course]);

  // ---- Fetch overall course progress (completed or not) ----
 useEffect(() => {
  const fetchProgress = async () => {
    try {
      if (!user || !id) return;
      const res = await axios.get(
        `http://localhost:5000/api/progress/${user.id}/${id}`
      );

      setCourseCompleted(res.data.isCompleted);
      setCompleted(res.data.completedLessons || []);
    } catch (err) {
      console.error('Error fetching course progress:', err);
    }
  };

  fetchProgress();
}, [id, user]);


  
//MARK AS COMPLETE – send totalLessons
 const handleMarkAsComplete = async () => {
  try {
    const totalLessons = course?.videoUrls?.length || 0;

    await axios.post('http://localhost:5000/api/progress/complete', {
      userId: user.id,
      courseId: parseInt(id, 10),
    totalLessons: totalLessons || 0,   totalLessons
    });

    setCourseCompleted(true);

    if (totalLessons > 0) {
      const allIdx = Array.from({ length: totalLessons }, (_, i) => i);
      setCompleted(allIdx);
    }
  } catch (err) {
    console.error('Error marking course as complete:', err);
  }
};


  if (!course) return <div className="text-center mt-10">Loading course...</div>;

  const flatVideoList = course.videoUrls || [];
  const isYoutube = flatVideoList[current]?.includes('youtube.com');

  const toggleExpand = (index) => {
    setExpandedSections((prev) =>
      prev.map((val, i) => (i === index ? !val : val))
    );
  };

  const handleVideoClick = (index) => {
  if (!flatVideoList.length) return;

  const safeIndex = Math.min(index, flatVideoList.length - 1);
  setCurrent(safeIndex);

  const actualIndex = safeIndex;

  const nextCompleted = completed.includes(actualIndex)
    ? completed.filter((i) => i !== actualIndex)
    : [...completed, actualIndex];

  setCompleted(nextCompleted);

  const totalLessons = flatVideoList.length;
  saveLessonProgress(nextCompleted, totalLessons);
};


  const handlePrev = () => {
    if (current > 0) handleVideoClick(current - 1);
  };

  const handleNext = () => {
    if (current < flatVideoList.length - 1) handleVideoClick(current + 1);
  };

  const courseContent = course.courseContent || [];

  return (
    <div className="min-h-screen p-4 flex flex-col lg:flex-row gap-6 bg-gray-100">
      {/* Video Player Area */}
      <div className="w-full lg:w-2/3 p-4 bg-white rounded-xl shadow">
       <div className="flex items-center justify-between mb-4 border-b pb-3">
  <img src={logo} alt="Logo" className="h-10" />

  <div className="flex gap-2">

  {courseCompleted && (
    <button
      onClick={() => navigate(`/DownloadCertificate/${id}`)}
      className="px-4 py-2 rounded border border-green-600 text-green-700 text-sm hover:bg-green-50"
    >
      Download Certificate
    </button>
  )}

  {!courseCompleted && (
    <button
      onClick={handleMarkAsComplete}
      className="px-4 py-2 rounded text-white text-sm bg-blue-600 hover:bg-blue-700"
    >
      MARK AS COMPLETE
    </button>
  )}

  {courseCompleted && (
    <button
      disabled
      className="px-4 py-2 rounded text-white text-sm bg-green-600 cursor-not-allowed"
    >
      ✅ COMPLETED
    </button>
  )}
</div>

</div>


        <div className="relative flex items-center justify-center">
          {flatVideoList[current] ? (
            isYoutube ? (
              <iframe
                className="w-full h-[300px] lg:h-[500px] rounded-xl"
                src={flatVideoList[current]}
                title={`Video ${current + 1}`}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video
                controls
                className="w-full h-[300px] lg:h-[500px] rounded-xl"
                src={flatVideoList[current]}
              />
            )
          ) : (
            <p className="text-center text-gray-500">No video available</p>
          )}

          {/* Prev / Next Buttons */}
          <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
            <button
              onClick={handlePrev}
              className="bg-white text-black p-2 rounded-full shadow-lg"
              disabled={current === 0}
            >
              <FaChevronLeft />
            </button>
          </div>
          <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
            <button
              onClick={handleNext}
              className="bg-white text-black p-2 rounded-full shadow-lg"
              disabled={current === flatVideoList.length - 1}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <h1 className="mt-4 text-xl font-semibold">
          Course Title: {course.courseTitle}
        </h1>
      </div>

      {/* Course Content List */}
      <div className="w-full lg:w-1/3 bg-white text-black p-4 rounded-xl max-h-[90vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {courseContent.map((section, secIdx) => {
          const lessons = section.lessons || [];

          return (
            <div key={secIdx} className="mb-4">
              <div
                onClick={() => toggleExpand(secIdx)}
                className="flex justify-between items-center cursor-pointer border-b pb-2"
              >
                <h3 className="font-semibold">{section.sectionTitle}</h3>
                {expandedSections[secIdx] ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {expandedSections[secIdx] && (
                <ul className="space-y-2 mt-2">
                  {lessons.map((lessonTitle, vidIdx) => {
                    const actualIndex =
                      courseContent
                        .slice(0, secIdx)
                        .reduce(
                          (acc, sec) => acc + (sec.lessons?.length || 0),
                          0
                        ) + vidIdx;

                    return (
                      <li
                        key={vidIdx}
                        onClick={() => handleVideoClick(actualIndex)}
                        className={`cursor-pointer flex items-center justify-between p-2 border rounded-xl transition ${
                          actualIndex === current
                            ? 'bg-blue-100 border-blue-400'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={completed.includes(actualIndex)}
                            readOnly
                          />
                          {lessonTitle}
                        </label>
                        <span className="text-sm text-gray-500">Watch</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

















