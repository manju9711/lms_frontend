// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Header from "../Components/Header/Header";
// import Footer from "../Components/Footer/Footer";

// const ADMIN_WHATSAPP = "919080280818"; 

// const OfflineSession = () => {
//   const { id } = useParams(); // courseId
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     city: "",
//     preferredBatch: "",
//     message: "",
//   });

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/course/${id}`);
//         setCourse(res.data);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load course details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCourse();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post("http://localhost:5000/api/offline-enquiry", {
//         ...form,
//         courseId: id,
//       });
//       toast.success("Thank you! We will contact you soon.");
//       setForm({
//         name: "",
//         email: "",
//         phone: "",
//         city: "",
//         preferredBatch: "",
//         message: "",
//       });
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to submit enquiry");
//     }
//   };

//   const openWhatsApp = () => {
//     const courseName = course?.courseTitle || "your course";
//     const text = `Hi, I am interested in the OFFLINE batch for ${courseName}. Please share details.`;
//     const url = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(
//       text
//     )}`;
//     window.open(url, "_blank");
//   };

//   return (
//     <>
//       <Header />
//       <ToastContainer position="top-right" />

//       <section className="bg-slate-50 py-16 font-quicksand relative">
//         {/* floating WhatsApp */}
//         <button
//           onClick={openWhatsApp}
//           className="fixed bottom-6 right-6 z-30 bg-green-500 hover:bg-green-600 text-white rounded-full px-5 py-3 shadow-xl flex items-center gap-2"
//         >
//           <span className="text-lg">💬</span>
//           <span className="hidden sm:inline text-sm font-semibold">
//             Chat on WhatsApp
//           </span>
//         </button>

//         <div className="max-w-6xl mx-auto px-4">
//           {/* hero */}
//           <div className="grid md:grid-cols-2 gap-10 items-start">
//             <div>
//               <p className="text-sm text-[#EF2E73] font-semibold uppercase mb-2">
//                 Offline Classroom Training
//               </p>
//               <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
//                 {loading
//                   ? "Loading..."
//                   : course?.courseTitle || "Offline Session"}
//               </h1>
//               <p className="text-slate-600 mb-4 text-sm md:text-base">
//                 Attend in–person classroom sessions with mentors, doubt clearing
//                 and hands-on practice. Ideal for students who prefer physical
//                 classroom learning.
//               </p>

//               {!loading && (
//                 <div className="flex flex-wrap gap-4 text-sm mb-6">
//                   <span className="bg-white shadow-sm px-3 py-2 rounded-lg">
//                     Fee:{" "}
//                     <span className="font-semibold">
//                       ₹{course?.price || 0}
//                     </span>
//                   </span>
//                   <span className="bg-white shadow-sm px-3 py-2 rounded-lg">
//                     Mode: <span className="font-semibold">Classroom</span>
//                   </span>
//                   <span className="bg-white shadow-sm px-3 py-2 rounded-lg">
//                     Location: <span className="font-semibold">Chennai</span>
//                     {/* later dynamic */}
//                   </span>
//                 </div>
//               )}

//               <h2 className="font-semibold mb-2 text-sm uppercase tracking-wide text-slate-700">
//                 How Offline Training Works
//               </h2>
//               <ul className="space-y-2 text-sm text-slate-600">
//                 <li>• Fill the enquiry form or WhatsApp us your details.</li>
//                 <li>• Our team will call you with batch schedule & location.</li>
//                 <li>• Confirm your seat, pay the fee and start attending class.</li>
//               </ul>
//             </div>

//             {/* contact form */}
//             <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
//               <h3 className="text-lg font-semibold mb-4">
//                 Book your offline seat
//               </h3>
//               <form onSubmit={handleSubmit} className="space-y-4 text-sm">
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     name="name"
//                     required
//                     value={form.name}
//                     onChange={handleChange}
//                     placeholder="Full Name"
//                     className="border border-slate-300 rounded-md px-3 py-2 w-full"
//                   />
//                   <input
//                     type="tel"
//                     name="phone"
//                     required
//                     value={form.phone}
//                     onChange={handleChange}
//                     placeholder="Mobile Number"
//                     className="border border-slate-300 rounded-md px-3 py-2 w-full"
//                   />
//                 </div>
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="Email Address"
//                   className="border border-slate-300 rounded-md px-3 py-2 w-full"
//                 />
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     name="city"
//                     value={form.city}
//                     onChange={handleChange}
//                     placeholder="City / Area"
//                     className="border border-slate-300 rounded-md px-3 py-2 w-full"
//                   />
//                   <select
//                     name="preferredBatch"
//                     value={form.preferredBatch}
//                     onChange={handleChange}
//                     className="border border-slate-300 rounded-md px-3 py-2 w-full"
//                   >
//                     <option value="">Preferred Batch</option>
//                     <option value="weekday-morning">Weekday – Morning</option>
//                     <option value="weekday-evening">Weekday – Evening</option>
//                     <option value="weekend">Weekend Batch</option>
//                   </select>
//                 </div>
//                 <textarea
//                   name="message"
//                   rows="3"
//                   value={form.message}
//                   onChange={handleChange}
//                   placeholder="Tell us your background / questions"
//                   className="border border-slate-300 rounded-md px-3 py-2 w-full"
//                 />
//                 <button
//                   type="submit"
//                   className="w-full bg-[#7E5EFF] hover:bg-[#5b3fee] text-white font-semibold py-2.5 rounded-md"
//                 >
//                   Submit Enquiry
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// };

// export default OfflineSession;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import OfflineContactForm from "./OfflineContactForm/OfflineContactForm";

const ADMIN_WHATSAPP = "919080280818";

const OfflineSession = () => {
  const { id } = useParams(); // courseId
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

 

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/course/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load course details");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchCourse();
    } else {
      setLoading(false);
    }
  }, [id]);

 

  const openWhatsApp = () => {
    const courseName = course?.courseTitle || "your course";
    const text = `Hi, I am interested in the OFFLINE batch for ${courseName}. Please share details.`;
    const url = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, "_blank");
  };

  const offlineFee =
    course && (course.offlinePrice ?? course.price)
      ? course.offlinePrice ?? course.price
      : 0;

  return (
    <>
      <Header />
      <ToastContainer position="top-right" />

      <section className="relative bg-gradient-to-b from-[#fff5fb] via-[#fdf6ff] to-[#eef3ff] py-16 font-quicksand overflow-hidden">
        {/* floating WhatsApp */}
        <button
          onClick={openWhatsApp}
          className="fixed bottom-6 right-6 z-30 bg-green-500 hover:bg-green-600 text-white rounded-full px-5 py-3 shadow-xl flex items-center gap-2"
        >
          <span className="text-lg">💬</span>
          <span className="hidden sm:inline text-sm font-semibold">
            WhatsApp
          </span>
        </button>

        {/* soft background shapes */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-72 h-72 bg-[#EF2E73]/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 w-80 h-80 bg-[#7E5EFF]/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 space-y-12">
          {/* HERO: image + text */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* left – image card */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.35)] bg-slate-900/5">
                {loading ? (
                  <div className="h-72 bg-slate-200 animate-pulse" />
                ) : (
                  <img
                    src={
                      course?.image
                        ? `http://localhost:5000/uploads/${course.image}`
                        : "https://images.pexels.com/photos/1181278/pexels-photo-1181278.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    }
                    alt={course?.courseTitle || "Offline session"}
                    className="w-full h-72 object-cover"
                  />
                )}
              </div>

              {/* badge overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white/90 backdrop-blur shadow-md">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-slate-500">
                      Offline Classroom
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {course?.courseTitle || "Offline Training Session"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-slate-500">Location</p>
                    <p className="text-sm font-semibold text-[#EF2E73]">
                      Chennai
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* right – offline course text */}
            <div>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#EF2E73] mb-2">
                Offline Classroom Training
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-snug">
                Learn in a{" "}
                <span className="text-[#7E5EFF]">real classroom</span> with
                mentors by your side.
              </h1>
              <p className="text-slate-600 mb-5 text-sm md:text-base">
                Join our in–person offline batch for{" "}
                <span className="font-semibold">
                  {course?.courseTitle || "your selected course"}
                </span>
                . Get structured training, doubt–clearing, and hands–on coding
                practice in a focused classroom environment.
              </p>

              {!loading && (
                <div className="flex flex-wrap gap-3 text-xs md:text-sm mb-6">
                  <span className="bg-white shadow-sm px-3 py-2 rounded-full border border-slate-100">
                    Fee:{" "}
                    <span className="font-semibold">
                      ₹{offlineFee || "TBA"}
                    </span>
                  </span>
                  <span className="bg-white shadow-sm px-3 py-2 rounded-full border border-slate-100">
                    Mode: <span className="font-semibold">Offline classroom</span>
                  </span>
                  <span className="bg-white shadow-sm px-3 py-2 rounded-full border border-slate-100">
                    City: <span className="font-semibold">Chennai</span>
                  </span>
                  <span className="bg-white shadow-sm px-3 py-2 rounded-full border border-slate-100">
                    Small batch • Mentor support
                  </span>
                </div>
              )}

              <h2 className="font-semibold mb-2 text-xs md:text-sm uppercase tracking-wide text-slate-700">
                How Offline Training Works
              </h2>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Fill the enquiry form or WhatsApp us your details.</li>
                <li>• Our team will call you with batch schedule & location.</li>
                <li>• Confirm your seat, pay the fee and start attending class.</li>
              </ul>
            </div>
          </div>

         
        </div>
      </section>

      <OfflineContactForm/>

      <Footer />
    </>
  );
};

export default OfflineSession;

