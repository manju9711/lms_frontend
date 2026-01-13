import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import icon from './images/cicon.svg';
import contactImage from './images/contact-image.jpg';
import bgImage from './images/bg-image.jpeg';
// import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import LiveHeader from '../LiveHeader/LiveHeader';

const LiveContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? 'Name is required' : '';
      case 'email':
        return !/^\S+@\S+\.\S+$/.test(value) ? 'Invalid email address' : '';
      case 'phone':
        return value.trim().length < 8 ? 'Phone must be at least 8 digits' : '';
      case 'subject':
        return value.trim() === '' ? 'Subject is required' : '';
      case 'message':
        return value.trim() === '' ? 'Message is required' : '';
      default:
        return '';
    }
  };

  // Handle blur validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle form submission
// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};
  Object.keys(formData).forEach((key) => {
    const error = validateField(key, formData[key]);
    if (error) newErrors[key] = error;
  });

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    toast.error("Please fix the form errors before submitting.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        context: "LIVE_SESSION",   // ⭐ tell backend this is for Live Session
      }),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success(result.message || "Message sent successfully!");
      setFormData({ name: '', email: '', subject: '', phone: '', message: '' });
      setErrors({});
    } else {
      toast.error(result.message || result.error || "Something went wrong.");
    }
  } catch (error) {
    console.error("Submit error:", error);
    toast.error("Server error. Please try again.");
  }
};



  return (
    <>
      <LiveHeader />
       {/* Banner Section */}
      <section
        className="relative bg-cover bg-center py-24 text-center overflow-hidden font-quicksand"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-0"></div>
        <div className="absolute top-10 right-10 text-purple-700 text-4xl z-10">*</div>

        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#222] mb-4">Contact US</h1>
          <div className="inline-block bg-[#FFA722] text-white px-6 py-2 rounded-full font-medium shadow-md">
            Home <span className="mx-1">»</span> Contact Us
          </div>
        </div>
      </section>
      <div className="min-h-screen bg-white flex items-center justify-center px-6 pb-32 pt-16 mt-4 font-quicksand">
        <div className="flex flex-col lg:flex-row gap-10 max-w-7xl w-full relative">

          {/* Left Side */}
          <div className="relative w-full lg:w-1/2">
            <div className="absolute -top-16 -left-10 w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center shadow-md z-10">
              <img src={icon} alt="icon" className="w-full h-full" />
            </div>
            <img src={contactImage} alt="Student" className="rounded-xl shadow-lg w-full" />

            <div className="relative z-10 sm:mt-[-120px] mt-[-50px] w-full px-2">
              <div className="bg-[#18254F] text-white rounded-xl shadow-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: '📞', label: 'For any Query?', value: 'Free +68 (026)-9879' },
                  { icon: '📧', label: 'Write email Us', value: 'support@example.com' },
                  { icon: '📍', label: 'Visit anytime', value: '427 Hall Place Longview' },
                  { icon: '⏰', label: 'Office Time', value: '10AM - 10PM' },
                ].map(({ icon, label, value }, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="bg-white text-pink-600 p-3 rounded-full text-xl">{icon}</div>
                    <div>
                      <p className="font-semibold">{label}</p>
                      <p className="text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2 mt-20 lg:mt-0">
            <button className="mb-4 bg-[#EF2E73] text-white py-1 px-4 rounded-full">
              Send us email
            </button>
            <h2 className="text-3xl font-bold mb-6">Feel Free to write</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {['name', 'email', 'subject', 'phone'].map((field, idx) => (
                <div key={idx} className="flex flex-col col-span-1">
                  <input
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                    className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  {errors[field] && (
                    <span className="text-red-500 text-sm mt-1">{errors[field]}</span>
                  )}
                </div>
              ))}

              <div className="md:col-span-2 flex flex-col">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Message"
                  className="border border-gray-300 rounded-md p-3 w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
                ></textarea>
                {errors.message && (
                  <span className="text-red-500 text-sm mt-1">{errors.message}</span>
                )}
              </div>

              <button
                type="submit"
                className="bg-violet-600 hover:bg-violet-700 text-white py-3 px-6 rounded-full mt-2"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Scroll-to-top */}
        <div className="fixed bottom-6 right-6">
          <button className="bg-white shadow-md border rounded-full w-10 h-10 flex items-center justify-center hover:bg-orange-200 transition-all duration-200">
            <span className="text-orange-500 text-xl">↑</span>
          </button>
        </div>
      </div>

      <ToastContainer position="top-right mt-10" />
      <Footer />
    </>
  );
};

export default LiveContactForm ;
