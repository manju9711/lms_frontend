// import React from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Sidebar from './Sidebar';
// import CourseTable from './Courses/CourseTable';


// function AdminPanel() {
//   return (
//     <>
//      <ToastContainer position="top-right" autoClose={3000} />
//     <div className="min-h-screen bg-[#d7e5f7] flex items-start justify-start p-6 gap-6 m-10 rounded-2xl shadow-md ">
//       {/* Sidebar inside a rounded panel */}
//       <div className="bg-white rounded-3xl shadow-md">
//         <Sidebar />
//       </div>

//       {/* Ledger Table already styled */}
//       <div className="flex-1">
//         <CourseTable/>
//       </div>
//     </div>
//     </>
//   );
// }

// export default AdminPanel;

import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';
import CourseTable from './Courses/CourseTable';
import ContactTable from './Contact/ConatactTable';
import StudentTable from './StudentTable/StudentTable';
import PaymentTable from './Payment/PaymentTable';

function AdminPanel() {
  const [selectedTab, setSelectedTab] = useState('Manage Courses'); // default tab

  const renderContent = () => {
    switch (selectedTab) {
      case 'Manage Courses':
        return <CourseTable />;
      case 'Manage Students':
        return <StudentTable />;
      case 'Contact':
        return <ContactTable />;
      case 'Paid Students':
        return <PaymentTable />;
      
      default:
        return <CourseTable />;
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen bg-[#d7e5f7] flex items-start justify-start p-6 gap-6 m-10 rounded-2xl shadow-md">
        <div className="bg-white rounded-3xl shadow-md">
          <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
