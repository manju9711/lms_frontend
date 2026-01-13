import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SuperSidebar from './supersidebar';
import CourseTable from '../Courses/CourseTable';
import StudentTable from '../StudentTable/StudentTable';
import ContactTable from '../Contact/ConatactTable';
import PaymentTable from '../Payment/PaymentTable';
import UsersTable from './UsersTable';
import EnrollmentTable from './EnrollmentTable';

function SuperAdmin() {
  const [selectedTab, setSelectedTab] = useState('All Users'); // default tab

  const renderContent = () => {
    switch (selectedTab) {
        case 'All Users':
        return <UsersTable />;
      case 'Manage Courses':
        return <CourseTable />;
      case 'Enrolled Users':
        return <EnrollmentTable />;
      case 'Contact':
        return <ContactTable />;
      case 'Paid Students':
        return <PaymentTable />;
      
      default:
        return <UsersTable />;
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen bg-[#d7e5f7] flex items-start justify-start p-6 gap-6 m-10 rounded-2xl shadow-md">
        <div className="bg-white rounded-3xl shadow-md">
          <SuperSidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </>
  );
}

export default SuperAdmin;