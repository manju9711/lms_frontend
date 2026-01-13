// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const EnrolledCourses = () => {
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const user = JSON.parse(localStorage.getItem('user')); // ✅ Define user here

//   useEffect(() => {
//     const fetchEnrolledCourses = async () => {
//       if (!user || !user.id) return;

//       try {
//         const res = await axios.get(`http://localhost:5000/api/enrolled-courses/${user.id}`);
//         setEnrolledCourses(res.data);
//       } catch (error) {
//         console.error('Failed to fetch enrolled courses:', error);
//       }
//     };

//     fetchEnrolledCourses();
//   }, [user]);

//   return (
//     <div className="p-10 min-h-screen bg-gray-50">
//       <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {enrolledCourses.length === 0 ? (
//           <p>No courses enrolled yet.</p>
//         ) : (
//           enrolledCourses.map((course) => {
//             const userReview = course.reviews?.find(r => String(r.userId) === String(user.id));
//             const rating = userReview?.rating || 0;

//             return (
//               <div key={course.id} className="border rounded shadow-sm p-4">
//                 <img
//                   src={`http://localhost:5000/uploads/${course.image}`}
//                   alt={course.courseTitle}
//                   className="w-full h-48 object-cover mb-2"
//                 />
//                 <p className="font-semibold text-lg">{course.courseTitle}</p>

//                 {/* ⭐ Star Rating */}
//                 <div className="flex items-center text-yellow-500 text-sm mt-1 mb-2">
//                   {[...Array(rating)].map((_, i) => <span key={i}>★</span>)}
//                   {[...Array(5 - rating)].map((_, i) => <span key={i}>☆</span>)}
//                   {rating > 0 && (
//                     <span className="text-gray-600 text-xs ml-2">(You rated: {rating}/5)</span>
//                   )}
//                 </div>

//                 <Link to={`/CourseDetails/${course.id}`}>
//                   <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">Start Learning</button>
//                 </Link>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default EnrolledCourses;

//old
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const EnrolledCourses = () => {
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [completedCourseIds, setCompletedCourseIds] = useState([]);
//   const [activeTab, setActiveTab] = useState('enrolled'); // 'enrolled' or 'completed'

//   const user = JSON.parse(localStorage.getItem('user'));

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!user?.id) return;

//       try {
//         const enrolledRes = await axios.get(`http://localhost:5000/api/enrolled-courses/${user.id}`);
//         setEnrolledCourses(enrolledRes.data);

//         const completedRes = await axios.get(`http://localhost:5000/api/progress/completed-ids/${user.id}`);
//         setCompletedCourseIds(completedRes.data.completedCourseIds);
//       } catch (error) {
//         console.error('Failed to fetch data:', error);
//       }
//     };

//     fetchData();
//   }, [user]);

//   const filteredCourses = activeTab === 'enrolled'
//     ? enrolledCourses.filter(course => !completedCourseIds.includes(course.id))
//     : enrolledCourses.filter(course => completedCourseIds.includes(course.id));

//   return (
//     <div className="p-10 min-h-screen bg-gray-50">
//       <h2 className="text-xl font-semibold mb-6">My Courses</h2>

//       {/* Tabs */}
//       <div className="flex gap-4 mb-6">
//         <button
//           onClick={() => setActiveTab('enrolled')}
//           className={`px-4 py-2 rounded ${activeTab === 'enrolled' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//         >
//           Enrolled Courses
//         </button>
//         <button
//           onClick={() => setActiveTab('completed')}
//           className={`px-4 py-2 rounded ${activeTab === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//         >
//           Completed Courses
//         </button>
//       </div>

//       {/* Course Cards */}
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filteredCourses.length === 0 ? (
//           <p className="text-gray-600">
//             {activeTab === 'enrolled' ? 'No in-progress courses found.' : 'No completed courses yet.'}
//           </p>
//         ) : (
//           filteredCourses.map((course) => {
//             const userReview = course.reviews?.find(r => String(r.userId) === String(user.id));
//             const rating = userReview?.rating || 0;

//             return (
//               <div key={course.id} className="border rounded shadow-sm p-4">
//                 <img
//                   src={`http://localhost:5000/uploads/${course.image}`}
//                   alt={course.courseTitle}
//                   className="w-full h-48 object-cover mb-2"
//                 />
//                 <p className="font-semibold text-lg">{course.courseTitle}</p>

//                 {/* ⭐ Star Rating */}
//                 <div className="flex items-center text-yellow-500 text-sm mt-1 mb-2">
//                   {[...Array(rating)].map((_, i) => <span key={i}>★</span>)}
//                   {[...Array(5 - rating)].map((_, i) => <span key={i}>☆</span>)}
//                   {rating > 0 && (
//                     <span className="text-gray-600 text-xs ml-2">(You rated: {rating}/5)</span>
//                   )}
//                 </div>

//                 <Link to={`/CourseDetails/${course.id}`}>
//                   <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">Start Learning</button>
//                 </Link>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default EnrolledCourses;

//new
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedCourseIds, setCompletedCourseIds] = useState([]);
  const [activeTab, setActiveTab] = useState('enrolled'); // 'enrolled' or 'completed'

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      try {
        const enrolledRes = await axios.get(
          `http://localhost:5000/api/enrolled-courses/${user.id}`
        );
        setEnrolledCourses(enrolledRes.data);

        const completedRes = await axios.get(
          `http://localhost:5000/api/progress/completed-ids/${user.id}`
        );
        setCompletedCourseIds(completedRes.data.completedCourseIds);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [user]);

  // ✅ Enrolled = all enrolled, Completed = only completed
  const filteredCourses =
    activeTab === 'enrolled'
      ? enrolledCourses
      : enrolledCourses.filter(course => completedCourseIds.includes(course.id));

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <h2 className="text-xl font-semibold mb-6">My Courses</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('enrolled')}
          className={`px-4 py-2 rounded ${
            activeTab === 'enrolled' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Enrolled Courses
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded ${
            activeTab === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Completed Courses
        </button>
      </div>

      {/* Course Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.length === 0 ? (
          <p className="text-gray-600">
            {activeTab === 'enrolled'
              ? 'No enrolled courses found.'
              : 'No completed courses yet.'}
          </p>
        ) : (
          filteredCourses.map(course => {
            const userReview = course.reviews?.find(
              r => String(r.userId) === String(user.id)
            );
            const rating = userReview?.rating || 0;

            return (
              <div key={course.id} className="border rounded shadow-sm p-4">
                <img
                  src={`http://localhost:5000/uploads/${course.image}`}
                  alt={course.courseTitle}
                  className="w-full h-48 object-cover mb-2"
                />
                <p className="font-semibold text-lg">{course.courseTitle}</p>

                {/* ⭐ Star Rating */}
                <div className="flex items-center text-yellow-500 text-sm mt-1 mb-2">
                  {[...Array(rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                  {[...Array(5 - rating)].map((_, i) => (
                    <span key={i}>☆</span>
                  ))}
                  {rating > 0 && (
                    <span className="text-gray-600 text-xs ml-2">
                      (You rated: {rating}/5)
                    </span>
                  )}
                </div>

                <Link to={`/CourseDetails/${course.id}`}>
                  <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">
                    Start Learning
                  </button>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;



