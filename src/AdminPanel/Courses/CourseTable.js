// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import AddCourseModal from './AddCourseModal';
// import EditCourseModal from './EditCourseModal'; 
// import { FaEdit } from "react-icons/fa";
// import { MdDeleteOutline } from "react-icons/md";


// const CourseTable = () => {
//   const [courses, setCourses] = useState([]);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null); // ✅
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
// const [courseToDelete, setCourseToDelete] = useState(null);


//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/course');
//       setCourses(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // const handleDelete = async (id) => {
//   //   if (!window.confirm("Are you sure you want to delete this course?")) return;
//   //   try {
//   //     await axios.delete(`http://localhost:5000/api/course/${id}`);
//   //     fetchCourses();
//   //   } catch (err) {
//   //     console.error("Delete failed", err);
//   //   }
//   // };
//   const handleDelete = async () => {
//   if (!courseToDelete) return;
//   try {
//     await axios.delete(`http://localhost:5000/api/course/${courseToDelete.id}`);
    
//     fetchCourses();
//   } catch (err) {
//     console.error("Delete failed", err);
    
//   } finally {
//     setShowDeleteModal(false);
//     setCourseToDelete(null);
//   }
// };


//   const handleEdit = (course) => {
//     setSelectedCourse(course);      // ✅ Set selected course
//     setIsEditModalOpen(true);       // ✅ Open edit modal
//   };

//   const totalPages = Math.ceil(courses.length / entriesPerPage);
//   const currentData = courses.slice(
//     (currentPage - 1) * entriesPerPage,
//     currentPage * entriesPerPage
//   );

//   return (
//     <>
//       {/* Add Modal */}
//       <AddCourseModal
//         isOpen={isAddModalOpen}
//         onClose={() => setIsAddModalOpen(false)}
//         onCourseAdded={fetchCourses}
//       />

//       {/* Edit Modal */}
//       {selectedCourse && (
//         <EditCourseModal
//           isOpen={isEditModalOpen}
//           onClose={() => setIsEditModalOpen(false)}
//           course={selectedCourse}
//           onCourseUpdated={fetchCourses}
//         />
//       )}

//       <div className="p-4">
//         <div className="flex justify-between items-center mb-4">
//           <div className="text-sm">
//             Show
//             <select
//               className="ml-2 border rounded px-2 py-1"
//               value={entriesPerPage}
//               onChange={(e) => {
//                 setEntriesPerPage(Number(e.target.value));
//                 setCurrentPage(1);
//               }}
//             >
//               <option>10</option>
//               <option>20</option>
//               <option>30</option>
//             </select>
//             entries
//           </div>
//           <button
//             onClick={() => setIsAddModalOpen(true)}
//             className="bg-[#1C1A57] text-white px-4 py-2 rounded-md shadow hover:bg-[#2f2c75] transition-all"
//           >
//             + Add
//           </button>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto shadow-sm rounded-xl">
//           <table className="min-w-full text-sm bg-white">
//             <thead className="bg-[#F3EDF9] text-[#1C1A57]">
//               <tr className="text-left">
//                 <th className="py-3 px-4">ID</th>
//                 <th className="py-3 px-4">Category</th>
//                 <th className="py-3 px-4">Image</th>
//                 <th className="py-3 px-4">Title</th>
//                 <th className="py-3 px-4">Description</th>
//                 <th className="py-3 px-4">Price</th>
//                 <th className="py-3 px-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="text-[#1C1A57]">
//               {currentData.map((course, index) => (
//                 <tr key={course.id} className="border-b hover:bg-[#F9F9FB]">
//                   <td className="px-4 py-3">{(currentPage - 1) * entriesPerPage + index + 1}</td>
//                   <td className="px-4 py-3">{course.category}</td>
//                   <td className="px-4 py-3">
//                     <img
//                       src={`http://localhost:5000/uploads/${course.image}`}
//                       alt="course"
//                       className="w-12 h-12 object-cover rounded"
//                     />
//                   </td>
//                   <td className="px-4 py-3">{course.courseTitle}</td>
//                   <td className="px-4 py-3">
//                     <p className="line-clamp-2 text-sm text-gray-600">
//                       {course.courseDescription}
//                     </p>
//                   </td>
//                   <td className="px-4 py-3">₹{course.price}</td>
//                   <td className="px-4 py-3">
//                     <button
//                       onClick={() => handleEdit(course)} // ✅ Pass entire course
//                       className="text-blue-600 mr-3 text-lg"
//                     >
//                       <FaEdit />
//                     </button>
//                     {/* <button
//                       onClick={() => handleDelete(course.id)}
//                       className="text-red-600 text-lg"
//                     >
//                       <MdDeleteOutline />
//                     </button> */}
//                     <button
//   onClick={() => {
//     setCourseToDelete(course);
//     setShowDeleteModal(true);
//   }}
//   className="text-red-600 text-lg"
// >
//   <MdDeleteOutline />
// </button>

//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center mt-6 gap-2">
//           <button
//             className="w-8 h-8 rounded-full bg-white shadow text-[#1C1A57]"
//             onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//             disabled={currentPage === 1}
//           >
//             &larr;
//           </button>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`w-8 h-8 rounded-full ${
//                 currentPage === i + 1
//                   ? 'bg-[#1C1A57] text-white'
//                   : 'bg-white border text-[#1C1A57]'
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//           <button
//             className="w-8 h-8 rounded-full bg-white shadow text-[#1C1A57]"
//             onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//             disabled={currentPage === totalPages}
//           >
//             &rarr;
//           </button>
//         </div>
//       </div>
//       {showDeleteModal && (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//     <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-md">
//       <h2 className="text-lg font-semibold text-[#1C1A57] mb-4">Are you sure you want to delete this course?</h2>
//       <p className="text-sm text-gray-600 mb-6">
//         This action cannot be undone.
//       </p>
//       <div className="flex justify-end gap-3">
//         <button
//           className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
//           onClick={() => {
//             setShowDeleteModal(false);
//             setCourseToDelete(null);
//           }}
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleDelete}
//           className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 text-sm"
//         >
//           Yes, Delete
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//     </>
//   );
// };

// export default CourseTable;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCourseModal from './AddCourseModal';
import EditCourseModal from './EditCourseModal';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/course');
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!courseToDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/course/${courseToDelete.id}`);
      fetchCourses();
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setShowDeleteModal(false);
      setCourseToDelete(null);
    }
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  const totalPages = Math.ceil(courses.length / entriesPerPage);
  const currentData = courses.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // small helper to show fee
  const displayFee = (fee) => (fee || fee === 0 ? `₹${fee}` : '—');

  return (
    <>
      {/* Add Modal */}
      <AddCourseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCourseAdded={fetchCourses}
      />

      {/* Edit Modal */}
      {selectedCourse && (
        <EditCourseModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          course={selectedCourse}
          onCourseUpdated={fetchCourses}
        />
      )}

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm">
            Show
            <select
              className="ml-2 border rounded px-2 py-1"
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option>10</option>
              <option>20</option>
              <option>30</option>
            </select>
            entries
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#1C1A57] text-white px-4 py-2 rounded-md shadow hover:bg-[#2f2c75] transition-all"
          >
            + Add
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto shadow-sm rounded-xl">
          <table className="min-w-full text-sm bg-white">
            <thead className="bg-[#F3EDF9] text-[#1C1A57]">
              <tr className="text-left">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Description</th>
                {/* 🔹 New fee columns */}
                <th className="py-3 px-4">Recording Fee (₹)</th>
                <th className="py-3 px-4">Live Session Fee (₹)</th>
                <th className="py-3 px-4">Offline Session Fee (₹)</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[#1C1A57]">
              {currentData.map((course, index) => (
                <tr key={course.id} className="border-b hover:bg-[#F9F9FB]">
                  <td className="px-4 py-3">
                    {(currentPage - 1) * entriesPerPage + index + 1}
                  </td>
                  <td className="px-4 py-3">{course.category}</td>
                  <td className="px-4 py-3">
                    <img
                      src={`http://localhost:5000/uploads/${course.image}`}
                      alt="course"
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3">{course.courseTitle}</td>
                  <td className="px-4 py-3">
                    <p className="line-clamp-2 text-sm text-gray-600">
                      {course.courseDescription}
                    </p>
                  </td>

                  {/* 🔹 Recording fee */}
                  <td className="px-4 py-3">
                    {displayFee(course.price)}
                  </td>

                  {/* 🔹 Live fee (fallback → recording fee if not set) */}
                  <td className="px-4 py-3">
                    {course.livePrice || course.livePrice === 0
                      ? displayFee(course.livePrice)
                      : course.price || course.price === 0
                      ? displayFee(course.price)
                      : '—'}
                  </td>

                  {/* 🔹 Offline fee (fallback → recording fee if not set) */}
                  <td className="px-4 py-3">
                    {course.offlinePrice || course.offlinePrice === 0
                      ? displayFee(course.offlinePrice)
                      : course.price || course.price === 0
                      ? displayFee(course.price)
                      : '—'}
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEdit(course)}
                      className="text-blue-600 mr-3 text-lg"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => {
                        setCourseToDelete(course);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-600 text-lg"
                    >
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-2">
          <button
            className="w-8 h-8 rounded-full bg-white shadow text-[#1C1A57]"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            &larr;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-full ${
                currentPage === i + 1
                  ? 'bg-[#1C1A57] text-white'
                  : 'bg-white border text-[#1C1A57]'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="w-8 h-8 rounded-full bg-white shadow text-[#1C1A57]"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            &rarr;
          </button>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-md">
            <h2 className="text-lg font-semibold text-[#1C1A57] mb-4">
              Are you sure you want to delete this course?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
                onClick={() => {
                  setShowDeleteModal(false);
                  setCourseToDelete(null);
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 text-sm"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseTable;


