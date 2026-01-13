// src/AdminPanel/Users/UsersTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // ===== Fetch all users once =====
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/auth/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error("Failed to fetch users", err);
      window.alert("Failed to load users list.");
    } finally {
      setLoading(false);
    }
  };

  // ===== Make as Admin / Instructor =====
  const handleMakeRole = async (userId, targetRole) => {
    const confirmMsg =
      targetRole === "admin"
        ? "Are you sure you want to make this user an ADMIN?"
        : "Are you sure you want to make this user an INSTRUCTOR?";

    if (!window.confirm(confirmMsg)) return;

    try {
      await axios.patch(
        `http://localhost:5000/api/auth/user/${userId}/role`,
        { role: targetRole }
      );

      // Update UI without refetching all
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, role: targetRole, isApproved: true } : u
        )
      );

      window.alert(`User updated as ${targetRole.toUpperCase()} successfully.`);
    } catch (err) {
      console.error("Failed to update role", err);
      window.alert("Failed to update user role.");
    }
  };

  // ===== Pagination =====
  const totalPages = Math.ceil(users.length / entriesPerPage) || 1;

  const currentData = users.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Small helper: disable buttons for superadmin or same role
  const canChangeRole = (user) => user.role !== "superadmin";

  return (
    <div className="p-4">
      {/* Top bar */}
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
          <div className="text-xs text-gray-500">Loading users...</div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-sm rounded-xl">
        <table className="min-w-full text-sm bg-white">
          <thead className="bg-[#F3EDF9] text-[#1C1A57]">
            <tr className="text-left">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Username</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[#1C1A57]">
            {currentData.length === 0 && !loading && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No users found.
                </td>
              </tr>
            )}

            {currentData.map((user, index) => {
              const rowNumber =
                (currentPage - 1) * entriesPerPage + index + 1;

              const disableAll = !canChangeRole(user); // superadmin row

              return (
                <tr key={user.id} className="border-b hover:bg-[#F9F9FB]">
                  <td className="px-4 py-3">{rowNumber}</td>
                  <td className="px-4 py-3 font-medium">{user.username}</td>
                  <td className="px-4 py-3">{user.email}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold
                        ${
                          user.role === "superadmin"
                            ? "bg-purple-100 text-purple-700"
                            : user.role === "admin"
                            ? "bg-blue-100 text-blue-700"
                            : user.role === "instructor"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {user.isApproved ? (
                      <span className="text-xs font-semibold text-green-600">
                        Approved
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-orange-500">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-center">
                      {/* Make Admin */}
                      <button
                        className={`px-3 py-1 rounded-full text-xs font-semibold border
                          ${
                            user.role === "admin" || disableAll
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
                          }`}
                        disabled={user.role === "admin" || disableAll}
                        onClick={() => handleMakeRole(user.id, "admin")}
                      >
                        Make as Admin
                      </button>

                      {/* Make Instructor */}
                      <button
                        className={`px-3 py-1 rounded-full text-xs font-semibold border
                          ${
                            user.role === "instructor" || disableAll
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-white text-green-700 border-green-300 hover:bg-green-50"
                          }`}
                        disabled={user.role === "instructor" || disableAll}
                        onClick={() => handleMakeRole(user.id, "instructor")}
                      >
                        Make as Instructor
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
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
            className={`w-8 h-8 rounded-full text-sm ${
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
          onClick={() =>
            setCurrentPage((p) => Math.min(p + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default UsersTable;
