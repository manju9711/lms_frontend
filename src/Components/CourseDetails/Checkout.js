import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
 import { useParams } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Checkout = () => {
  const location = useLocation();
  const message = location.state?.message;

  // const queryParams = new URLSearchParams(location.search);
  // const courseId = queryParams.get('courseId');
 
const { id: courseId } = useParams(); // ✅ get ID from URL


  const [course, setCourse] = useState(null);

  // useEffect(() => {
  //   if (message) {
  //     toast.info(message);
  //   }

  //   const fetchCourse = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:5000/api/course/${courseId}`);
  //       setCourse(res.data);
  //     } catch (err) {
  //       toast.error("❌ Failed to load course details");
  //     }
  //   };

  //   if (courseId) {
  //     fetchCourse();
  //   }
  // }, [courseId, message]);
  useEffect(() => {
  toast.info('Please complete the payment to access the syllabus.');

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/course/${courseId}`);
      setCourse(res.data);
    } catch (err) {
      toast.error("❌ Failed to load course details");
    }
  };

  if (courseId) {
    fetchCourse();
  }
}, [courseId]);


  if (!course) {
    return (
      <>
        <Header />
        <div className="text-center py-10 text-lg text-gray-600">Loading course details...</div>
        <ToastContainer position="top-right" />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <ToastContainer position="top-right" />
      <div className="max-w-4xl mx-auto mt-10 mb-10">
        <div className="bg-white rounded shadow border">
          <div className="bg-yellow-500 text-white font-semibold px-6 py-3 flex justify-between items-center">
            <span>Products</span>
            <span>Price</span>
          </div>

          <div className="flex items-center px-6 py-4 border-b">
            <img
              src={`http://localhost:5000/uploads/${course.image}`}
              alt={course.courseTitle}
              className="w-[100px] h-[80px] object-cover rounded"
            />
            <div className="ml-4 flex-grow">
              <h3 className="text-md font-semibold">{course.courseTitle}</h3>
              <p className="text-gray-600 text-sm">Subscription Type: Fixed One Year</p>
            </div>
            <div className="text-right">
              <p className="text-gray-800 font-medium">₹ {course.price.toFixed(2)}</p>
            </div>
            <i className="bi bi-trash text-gray-500 hover:text-red-600 ml-3 cursor-pointer"></i>
          </div>

          <div className="px-6 py-3 flex justify-end">
            <div className="text-right space-y-1">
              <p className="font-semibold">
                Subtotal: <span className="ml-2">₹ {course.price.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Link to="/PaymentForm" state={{
    courseId: course.id,
    courseTitle: course.courseTitle,
    amount: course.price
  }}>
            <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
              Checkout
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
