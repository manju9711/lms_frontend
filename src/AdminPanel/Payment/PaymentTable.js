import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/payment");
      setPayments(res.data); // assuming array of paid users
    } catch (err) {
      console.error("Failed to fetch payments", err);
    }
  };

//   useEffect(() => {
//   const fetchAll = async () => {
//     try {
//       const paymentRes = await axios.get('http://localhost:5000/api/payment');

//       const enriched = await Promise.all(paymentRes.data.map(async (p) => {
//         const userRes = await axios.get(`http://localhost:5000/api/user/${p.userId}`);
//         const courseRes = await axios.get(`http://localhost:5000/api/course/${p.courseId}`);

//         return {
//           ...p,
//           userName: userRes.data.name,
//           email: userRes.data.email,
//           phone: userRes.data.phone,
//           courseName: courseRes.data.courseTitle,
//           amount: courseRes.data.price
//         };
//       }));

//       setPayments(enriched);
//     } catch (error) {
//       console.error("Failed to fetch enriched payments", error);
//     }
//   };

//   fetchAll();
// }, []);


  const totalPages = Math.ceil(payments.length / entriesPerPage);
  const currentData = payments.slice(
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
          {/* <thead className="bg-[#F3EDF9] text-[#1C1A57]">
            <tr className="text-left">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">User Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Course</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Method</th>
              <th className="py-3 px-4">Date</th>
            </tr>
          </thead>
          <tbody className="text-[#1C1A57]">
            {currentData.map((payment, index) => (
              <tr key={payment.id} className="border-b hover:bg-[#F9F9FB]">
                <td className="px-4 py-3">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                <td className="px-4 py-3">{payment.userName}</td>
                <td className="px-4 py-3">{payment.email}</td>
                <td className="px-4 py-3">{payment.phone}</td>
                <td className="px-4 py-3">{payment.courseName}</td>
                <td className="px-4 py-3">₹{payment.amount}</td>
                <td className="px-4 py-3">{payment.paymentMethod}</td>
                <td className="px-4 py-3">
                  {new Date(payment.paymentDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody> */}
          <thead className="bg-[#F3EDF9] text-[#1C1A57]">
  <tr className="text-left">
    <th className="py-3 px-4">#</th>
    <th className="py-3 px-4">User ID</th>
    <th className="py-3 px-4">User Name</th>
    <th className="py-3 px-4">Course</th>
    <th className="py-3 px-4">Amount</th>
    <th className="py-3 px-4">Method</th>
    <th className="py-3 px-4">Date</th>
  </tr>
</thead>
<tbody className="text-[#1C1A57]">
  {currentData.map((payment, index) => (
    <tr key={payment.id} className="border-b hover:bg-[#F9F9FB]">
      <td className="px-4 py-3">{(currentPage - 1) * entriesPerPage + index + 1}</td>
      <td className="px-4 py-3">{payment.userId}</td>
      <td className="px-4 py-3">{payment.userName}</td>
      <td className="px-4 py-3">{payment.courseTitle}</td>
      <td className="px-4 py-3">₹{payment.amount}</td>
      <td className="px-4 py-3">{payment.method}</td>
      <td className="px-4 py-3">{new Date(payment.createdAt).toLocaleDateString()}</td>
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

export default PaymentTable;
