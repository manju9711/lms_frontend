import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Main from "./Main/Main";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import CourseDetails from "./Components/CourseDetails/CourseDetails";
import VideoLessonPage from "./Components/VideoLessonPage/VideoLessonPage";
import RegisterForm from "./Components/RegisterForm/RegisterForm";
import LoginForm from "./Components/LoginForm/LoginForm";
import ContactUs from "./Multiple/ContactUs/ContactUs";
import About from "./Multiple/About/About";
import Sidebar from './Multiple/MyAccountDetails/Sidebar';
import Dashboard from './Multiple/MyAccountDetails/Pages/Dashboard';
import Profile from './Multiple/MyAccountDetails/Pages/Profile';
import EnrolledCourses from './Multiple/MyAccountDetails/Pages/EnrolledCourses';
import Reviews from './Multiple/MyAccountDetails/Pages/Reviews';
import Settings from './Multiple/MyAccountDetails/Pages/Settings';
import Frontend from './Components/Courses/Frontend';
import Backend from "./Components/Courses/Backend";
import Programming from "./Components/Courses/Programming";
import DBMS from "./Components/Courses/DBMS";
import Fullstack from "./Components/Courses/Fullstack";
import Mobileapp from "./Components/Courses/Mobilapp";
import SubscribePage from "./Components/CourseDetails/SubscribePage";
import Checkout from "./Components/CourseDetails/Checkout";
import PaymentForm from "./Components/CourseDetails/PaymentForm";
import WhatsAppChatButton from "./Components/WhatsAppChatButton/WhatsAppChatButton";
import CoursePlayer from "./Components/Courseplayer/Courseplayer";
import AdminPanel from "./AdminPanel/AdminPanel";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import ChatWidget from "./Components/Chatbot/ChatWidget";
import SuperAdmin from "./AdminPanel/SuperAdmin/superadmin";
import Instructor from "./AdminPanel/Instructor/Instructor";
import Certificate from "./Components/Certificate/Certificate";
import OfflineSession from "./OfflineSession/OfflineSession";
import LiveSession from "./LiveSession/LiveSession";
import LiveContactForm from "./LiveSession/LiveContactForm/LiveContactForm";
import AllCourses from "./Components/Courses/AllCourses";
import DownloadCertificate from "./Components/Certificate/DownloadCertificate";


const AppContent = () => {
  const location = useLocation();
  const [selected, setSelected] = useState('Dashboard');

  const renderContent = () => {
    switch (selected) {
      case 'Dashboard': return <Dashboard />;
      case 'My Profile': return <Profile />;
      case 'Enrolled Courses': return <EnrolledCourses />;
      case 'Reviews': return <Reviews />;
      case 'Settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

    const hideChatRoutes = [
    "/AdminPanel",
    "/superadmin",
    "/Instructor",
    "/Certificate",
    "/DownloadCertificate"
  ];

  // OfflineSession + future :id path-களையும் hide பண்ண
  const hideChat =
    hideChatRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/OfflineSession") ||
      location.pathname.startsWith("/DownloadCertificate") ;

  return (
    <>
      {/* {location.pathname !== "/AdminPanel" && <WhatsAppChatButton />} */}   
      
     {/* {location.pathname !== "/AdminPanel" && "/superadmin" && "/Instructor" && "/Certificate" && "/OfflineSession" && <ChatWidget/>} */}
      
 {/* Chat widget – hide on admin / superadmin / instructor / certificate / offline session */}
      {!hideChat && <ChatWidget />}

      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route path='/Frontend' element={<Frontend />} />
        <Route path='/Backend' element={<Backend />} />
        <Route path='/Programming' element={<Programming />} />
        <Route path='/DBMS' element={<DBMS />} />
        <Route path='/Fullstack' element={<Fullstack />} />
        <Route path='/Mobileapp' element={<Mobileapp />} />
        <Route path='/CourseDetails/:id' element={<CourseDetails />} />
        <Route path='/Checkout/:id' element={<Checkout />} />
        <Route path='/PaymentForm' element={<PaymentForm />} />
        <Route path="/SubscribePage" element={<SubscribePage />} />
        <Route path='/VideoLessonPage/:courseId' element={<VideoLessonPage />} />
        <Route path="/Courseplayer/:id" element={<CoursePlayer />} />
        <Route path="/RegisterForm" element={<RegisterForm />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/About" element={<About />} />
        <Route path="/Certificate" element={<Certificate />} />
       
        <Route path="/LiveSession" element={<LiveSession />} />
        <Route path="/LiveContactForm" element={<LiveContactForm />} />
        <Route path="/AllCourses" element={<AllCourses />} />
        <Route path="/DownloadCertificate/:courseId" element={<DownloadCertificate />} />

        <Route path="/AdminPanel" element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        } />
         <Route path="/superadmin" element={
          <ProtectedRoute>
            <SuperAdmin />
          </ProtectedRoute>
        } />
         <Route path="/Instructor" element={
          <ProtectedRoute>
            <Instructor />
          </ProtectedRoute>
        } />

         <Route path="/OfflineSession" element={
           <ProtectedRoute>
          <OfflineSession />
          </ProtectedRoute>
          } />



        <Route path="/Dashboard" element={
          <>
          
            <Header />
            <ProtectedRoute>
            <div className="flex">
              <Sidebar selected={selected} setSelected={setSelected} />
              <div className="flex-1 bg-gray-50 min-h-screen">
                {renderContent()}
              </div>
            </div>
            </ProtectedRoute>
            <Footer />
            
          </>
        } />
      </Routes>
    </>
  );
};

export default AppContent;
