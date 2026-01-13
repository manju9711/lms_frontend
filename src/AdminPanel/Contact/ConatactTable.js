// src/AdminPanel/Contacts/ContactTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact");
      setContacts(res.data);
    } catch (err) {
      console.error("Failed to fetch contacts", err);
    }
  };

  const totalPages = Math.ceil(contacts.length / entriesPerPage);
  const currentData = contacts.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
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
      </div>

      <div className="overflow-x-auto shadow-sm rounded-xl">
        <table className="min-w-full text-sm bg-white">
          <thead className="bg-[#F3EDF9] text-[#1C1A57]">
            <tr className="text-left">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Subject</th>
              <th className="py-3 px-4">Message</th>
            </tr>
          </thead>
          <tbody className="text-[#1C1A57]">
            {currentData.map((contact, index) => (
              <tr key={contact.id} className="border-b hover:bg-[#F9F9FB]">
                <td className="px-4 py-3">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                <td className="px-4 py-3">{contact.name}</td>
                <td className="px-4 py-3">{contact.email}</td>
                <td className="px-4 py-3">{contact.phone}</td>
                <td className="px-4 py-3">{contact.subject}</td>
                <td className="px-4 py-3 line-clamp-2 text-gray-600">{contact.message}</td>
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
  );
};

export default ContactTable;
