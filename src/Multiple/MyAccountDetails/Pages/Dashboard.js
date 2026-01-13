// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DashboardCards from '../DashboardCards';

// const Dashboard = () => {
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [completedIds, setCompletedIds] = useState([]);
//   const user = JSON.parse(localStorage.getItem('user'));

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const enrolledRes = await axios.get(`http://localhost:5000/api/enrolled-courses/${user.id}`);
//         setEnrolledCourses(enrolledRes.data);

//         const completedRes = await axios.get(`http://localhost:5000/api/progress/completed-ids/${user.id}`);
//         setCompletedIds(completedRes.data.completedCourseIds);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };

//     fetchCourses();
//   }, [user.id]);

//   // Filter in-progress courses
//   const inProgressCourses = enrolledCourses.filter(course => !completedIds.includes(course.id));

//   return (
//     <div className="p-10 min-h-screen bg-gray-50">
//       <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
//       <DashboardCards />

//       <div className="mt-6">
//         <h3 className="text-lg font-semibold mb-4">In Progress Courses</h3>

//         {inProgressCourses.length === 0 ? (
//           <p>No in-progress courses found.</p>
//         ) : (
//           inProgressCourses.map(course => (
//             <div key={course.id} className="max-w-4xl mx-auto flex border rounded-lg shadow-md overflow-hidden bg-white mb-4">
//               {/* Left Image */}
//               <div className="w-1/3">
//                 <img
//                   src={`http://localhost:5000/uploads/${course.image}`} // use dynamic image path
//                   alt={course.courseTitle}
//                   className="object-cover w-full h-full"
//                 />
//               </div>

//               {/* Right Content */}
//               <div className="w-2/3 p-5 flex flex-col justify-center">
//                 <h4 className="text-lg font-bold mb-1">{course.courseTitle}</h4>
//                 <p className="text-sm text-gray-600">{course.courseDescription}</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import DashboardCards from '../DashboardCards';
// import Header from '../../../Components/Header/Header';
// import Footer from '../../../Components/Footer/Footer';

// const Dashboard = () => {
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [completedIds, setCompletedIds] = useState([]);
//   const user = JSON.parse(localStorage.getItem('user'));
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const enrolledRes = await axios.get(`http://localhost:5000/api/enrolled-courses/${user.id}`);
//         setEnrolledCourses(enrolledRes.data);

//         const completedRes = await axios.get(`http://localhost:5000/api/progress/completed-ids/${user.id}`);
//         setCompletedIds(completedRes.data.completedCourseIds);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };

//     fetchCourses();
//   }, [user.id]);

//   // Filter in-progress courses
//   const inProgressCourses = enrolledCourses.filter(course => !completedIds.includes(course.id));

//   return (
//     <>
  
//     <div className="p-10 min-h-screen bg-gray-50">
//       <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
//       <DashboardCards />

//       <div className="mt-6">
//         <h3 className="text-lg font-semibold mb-4">In Progress Courses</h3>

//         {inProgressCourses.length === 0 ? (
//           <p>No in-progress courses found.</p>
//         ) : (
//           inProgressCourses.map(course => (
//             <div
//               key={course.id}
//               className="max-w-4xl mx-auto flex border rounded-lg shadow-md overflow-hidden bg-white mb-4"
//             >
//               {/* Left Image */}
//               <div className="w-1/3">
//                 <img
//                   src={`http://localhost:5000/uploads/${course.image}`}
//                   alt={course.courseTitle}
//                   className="object-cover w-full h-full"
//                 />
//               </div>

//               {/* Right Content */}
//               <div className="w-2/3 p-5 mt-2 flex flex-col justify-between">
//                 <div>
//                   <h4 className="text-lg font-bold mb-1">{course.courseTitle}</h4>
//                   <p className="text-sm text-gray-600 line-clamp-2">
//                     {course.courseDescription}
//                   </p>
//                 </div>
//                <div className="mt-4 flex justify-center">
//   <button
//     onClick={() => navigate(`/coursedetails/${course.id}`)}
//     className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 w-fit"
//   >
//     Start Learning
//   </button>
// </div>

//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
  
//     </>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardCards from '../DashboardCards';

const Dashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedIds, setCompletedIds] = useState([]);
  const [showAll, setShowAll] = useState(false); // ⬅️ toggle state

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const enrolledRes = await axios.get(`http://localhost:5000/api/enrolled-courses/${user.id}`);
        setEnrolledCourses(enrolledRes.data);

        const completedRes = await axios.get(`http://localhost:5000/api/progress/completed-ids/${user.id}`);
        setCompletedIds(completedRes.data.completedCourseIds);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchCourses();
  }, [user.id]);

  const inProgressCourses = enrolledCourses.filter(course => !completedIds.includes(course.id));

  // Decide which courses to show
  const displayedCourses = showAll ? inProgressCourses : inProgressCourses.slice(0, 3);

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <DashboardCards />

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">In Progress Courses</h3>

        {inProgressCourses.length === 0 ? (
          <p>No in-progress courses found.</p>
        ) : (
          <>
            {displayedCourses.map(course => (
              <div
                key={course.id}
                className="max-w-4xl mx-auto flex border rounded-lg shadow-md overflow-hidden bg-white mb-4"
              >
                {/* Left Image */}
                <div className="w-1/3">
                  <img
                    src={`http://localhost:5000/uploads/${course.image}`}
                    alt={course.courseTitle}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Right Content */}
                <div className="w-2/3 p-5 mt-2 flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-bold mb-1">{course.courseTitle}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {course.courseDescription}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => navigate(`/coursedetails/${course.id}`)}
                      className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 w-fit"
                    >
                      Start Learning
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Toggle Button */}
            {inProgressCourses.length > 3 && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
                >
                  {showAll ? 'View Less' : 'View More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

