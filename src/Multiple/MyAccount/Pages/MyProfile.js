import React from "react";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";
import Sidebar from "../Sidebar";

const MyProfile = () => {
  const user = {
    registrationDate: "June 4, 2025 7:09 am",
    firstName: "magi",
    lastName: "j",
    username: "magi",
    email: "manjusivacj@gmail.com",
    phone: "-",
    skill: "-",
    bio: "-",
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen flex font-sans bg-gray-100">
        <Sidebar/>
         <main className="flex-1 p-10">
        <h1 className="text-xl font-semibold mb-6">Dashboard</h1>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <StatCard icon="📘" label="Enrolled Courses" value="11" />
          <StatCard icon="🎓" label="Active Courses" value="7" />
          <StatCard icon="🏆" label="Completed Courses" value="4" />
        </div>
        </main>
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-4">
          My Profile
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 text-sm text-gray-700">
          <ProfileRow label="Registration Date" value={user.registrationDate} />
          <ProfileRow label="First Name" value={user.firstName} />
          <ProfileRow label="Last Name" value={user.lastName} />
          <ProfileRow label="Username" value={user.username} />
          <ProfileRow label="Email" value={user.email} />
          <ProfileRow label="Phone Number" value={user.phone} />
          <ProfileRow label="Skill/Occupation" value={user.skill} />
          <ProfileRow label="Biography" value={user.bio} />
        </div>
      </div>
    </div>
    </div>
    <Footer/>
    </>
  );
};

const ProfileRow = ({ label, value }) => (
  <div className="flex justify-between border-b pb-2">
    <span className="font-medium text-gray-600">{label}</span>
    <span className="text-gray-800">{value}</span>
  </div>
);
const StatCard = ({ icon, label, value }) => (
  <div className="bg-white border rounded-lg shadow p-6 flex flex-col items-center justify-center text-center">
    <div className="text-4xl">{icon}</div>
    <div className="text-2xl font-bold mt-2">{value}</div>
    <div className="text-sm text-gray-600 mt-1">{label}</div>
  </div>
);
export default MyProfile;

