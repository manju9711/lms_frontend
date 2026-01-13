// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const StudentTable = () => {
//   const [enrollments, setEnrollments] = useState([]);

//   useEffect(() => {
//     const fetchEnrollments = async () => {
//       try {
//         // const res = await axios.get('http://localhost:5000/api/course/enrollments');
//         const res = await axios.get('http://localhost:5000/api/course/enrollments');
//         setEnrollments(res.data);
//       } catch (err) {
//         console.error('Failed to fetch enrollments:', err);
//       }
//     };

//     fetchEnrollments();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold text-[#1C1A57] mb-4">Student Enrollments</h2>
//       <div className="overflow-x-auto shadow rounded-xl bg-white">
//         <table className="min-w-full text-sm">
//           <thead className="bg-[#F3EDF9] text-[#1C1A57]">
//             <tr className="text-left">
//               <th className="py-3 px-4">#</th>
//               <th className="py-3 px-4">User Name</th>
//               <th className="py-3 px-4">User ID</th>
//               <th className="py-3 px-4">Course Title</th>
//               <th className="py-3 px-4">Course ID</th>
//               <th className="py-3 px-4">Enrolled Date</th>
//             </tr>
//           </thead>
//           <tbody className="text-[#1C1A57]">
//             {enrollments.map((item, index) => (
//               <tr key={`${item.userId}-${item.courseId}`} className="border-b hover:bg-[#F9F9FB]">
//                 <td className="px-4 py-3">{index + 1}</td>
//                 <td className="px-4 py-3">{item.userName}</td>
//                 <td className="px-4 py-3">{item.userId}</td>
//                 <td className="px-4 py-3">{item.courseTitle}</td>
//                 <td className="px-4 py-3">{item.courseId}</td>
//                 <td className="px-4 py-3">{new Date(item.enrolledDate).toLocaleDateString()}</td>
//               </tr>
//             ))}
//             {enrollments.length === 0 && (
//               <tr>
//                 <td className="px-4 py-3 text-center" colSpan="6">No Enrollments Found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default StudentTable;

import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentTable = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getModeLabel = (mode) => {
  if (!mode) return "-";
  const m = String(mode).toLowerCase();
  if (m === "recording") return "Recording";
  if (m === "live") return "Live";
  if (m === "offline") return "Offline";
  return mode;
};


  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5000/api/course/enrollments"
      );
      setEnrollments(res.data || []);
    } catch (err) {
      console.error("Failed to fetch enrollments", err);
      window.alert("Failed to load enrollments list");
    } finally {
      setLoading(false);
    }
  };
  const handleAdminComplete = async (row) => {
  if (!window.confirm("Mark this enrollment as completed?")) return;

  try {
    await axios.post("http://localhost:5000/api/progress/complete", {
      userId: row.userId,
      courseId: row.courseId,
      totalLessons: row.totalLessons || 0,
    });

    fetchEnrollments(); // refresh table
  } catch (err) {
    console.error("Failed to mark completed", err);
    window.alert("Failed to mark as completed");
  }
};

const openCertificate = (row) => {
  const params = new URLSearchParams({
    name: row.userName || "",
    userId: row.userId,
    completedAt: row.completedAt || "",
  });
  window.open(`/DownloadCertificate/${row.courseId}?${params.toString()}`, "_blank");
};



  const totalPages = Math.ceil(enrollments.length / entriesPerPage) || 1;

  const currentData = enrollments.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString() + " " + d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-4">
      {/* Top controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm">
          Show
          <select
            className="ml-2 border rounded px-2 py-1"
            value={entriesPerPage}
            onChange={handleEntriesChange}
          >
            <option>10</option>
            <option>20</option>
            <option>30</option>
          </select>
          entries
        </div>

        {loading && (
          <div className="text-xs text-gray-500">Loading enrollments…</div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-sm rounded-xl">
        <table className="min-w-full text-sm bg-white">
          <thead className="bg-[#F3EDF9] text-[#1C1A57]">
            <tr className="text-left">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Course</th>
              <th className="py-3 px-4">Student Name</th>
              {/* <th className="py-3 px-4">Student ID</th>
              <th className="py-3 px-4">Course ID</th> */}
               <th className="py-3 px-4">Mode</th> 
               <th className="py-3 px-4">Progress</th>
              <th className="py-3 px-4">Certificate</th>
              <th className="py-3 px-4">Enrolled On</th>
            </tr>
          </thead>
          <tbody className="text-[#1C1A57]">
            {currentData.length === 0 && !loading && (
              <tr>
                <td
                  colSpan={7}
                  className="py-6 text-center text-gray-500 italic"
                >
                  No enrollments found.
                </td>
              </tr>
            )}

            {currentData.map((row, index) => (
              <tr key={`${row.courseId}-${row.userId}-${index}`} className="border-b hover:bg-[#F9F9FB]">
                <td className="px-4 py-3">
                  {(currentPage - 1) * entriesPerPage + index + 1}
                </td>
                <td className="px-4 py-3 font-medium">
                  {row.courseTitle || "-"}
                </td>
                <td className="px-4 py-3">{row.userName || "-"}</td>
                 <td className="px-4 py-3">{getModeLabel(row.mode)}</td>
                 <td className="px-4 py-3">
  {row.totalLessons > 0
    ? `${row.completedLessons || 0}/${row.totalLessons}`
    : '-'}
</td>

      {/* 👇 Certificate column */}
    <td className="px-4 py-3">
      {row.mode === "recording" ? (
        row.totalLessons > 0 && row.completedLessons >= row.totalLessons ? (
          <button
            onClick={() => openCertificate(row)}
            className="px-3 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700"
          >
            Certificate
          </button>    
        ) : (
          <span className="text-xs text-gray-400">In progress</span>
        )
      ) : (
        // LIVE / OFFLINE – manual flow
        row.isCompleted ? (
          <button
            onClick={() => openCertificate(row)}
            className="px-3 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700"
          >
            Certificate
          </button>
        ) : (
          <button
            onClick={() => handleAdminComplete(row)}
            className="px-3 py-1 text-xs rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Mark Completed
          </button>
        )
      )}
    </td>


                <td className="px-4 py-3 text-gray-600">
                  {formatDate(row.enrolledDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          className="w-8 h-8 rounded-full bg-white shadow text-[#1C1A57] disabled:opacity-40"
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
                ? "bg-[#1C1A57] text-white"
                : "bg-white border text-[#1C1A57]"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="w-8 h-8 rounded-full bg-white shadow text-[#1C1A57] disabled:opacity-40"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default StudentTable;
