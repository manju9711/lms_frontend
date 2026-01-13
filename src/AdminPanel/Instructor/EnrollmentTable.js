// src/AdminPanel/Courses/EnrollmentTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const EnrollmentTable = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

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
              <th className="py-3 px-4">Enrolled On</th>
            </tr>
          </thead>
          <tbody className="text-[#1C1A57]">
            {currentData.length === 0 && !loading && (
              <tr>
                <td
                  colSpan={6}
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
                {/* <td className="px-4 py-3">{row.userId ?? "-"}</td>
                <td className="px-4 py-3">{row.courseId ?? "-"}</td> */}
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

export default EnrollmentTable;
