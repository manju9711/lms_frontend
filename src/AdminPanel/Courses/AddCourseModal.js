//new
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaTimes } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const AddCourseModal = ({ isOpen, onClose, onCourseAdded }) => {
//   const [formData, setFormData] = useState({
//     category: '',
//     courseTitle: '',
//     courseDescription: '',
//     price: '',
//     videoUrls: '',
//     courseContent: '',        // ⭐ NEW
//     image: null,
//     pdf: null,
//   });

//   useEffect(() => {
//     if (isOpen) {
//       setFormData({
//         category: '',
//         courseTitle: '',
//         courseDescription: '',
//         price: '',
//         videoUrls: '',
//         courseContent: '',      // ⭐ reset
//         image: null,
//         pdf: null,
//       });
//     }
//   }, [isOpen]);

//   const categories = [
//     'Frontend Development',
//     'Backend Development',
//     'Programming',
//     'DBMS',
//     'Full Stack Development',
//     'Mobile App Development',
//   ];

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const form = new FormData();
//       form.append('image', formData.image);
//       if (formData.pdf) form.append('pdf', formData.pdf);

//       form.append('category', formData.category);
//       form.append('courseTitle', formData.courseTitle);
//       form.append('courseDescription', formData.courseDescription);
//       form.append('price', formData.price);
//       form.append('videoUrls', formData.videoUrls);

//       // ⭐ send courseContent as JSON string (optional)
//       if (formData.courseContent.trim()) {
//         form.append('courseContent', formData.courseContent.trim());
//       }

//       await axios.post('http://localhost:5000/api/course', form);
//       toast.success('🎉 Course added successfully!');
//       onCourseAdded();

//       setTimeout(() => {
//         onClose();
//       }, 1500);
//     } catch (err) {
//       console.error(err);
//       toast.error('❌ Failed to add course');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />

//       <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
//         <div
//           className="relative w-full max-w-xl rounded-xl bg-blue-100 p-6 border border-blue-300"
//           style={{
//             maxHeight: '90vh',
//             overflowY: 'auto',
//             scrollbarWidth: 'none',
//             msOverflowStyle: 'none',
//           }}
//           onWheel={(e) => e.stopPropagation()}
//         >
//           <style>{`div::-webkit-scrollbar { display: none; }`}</style>

//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
//           >
//             <FaTimes />
//           </button>

//           <h2 className="text-2xl font-bold text-center text-[#1C1A57] mb-6">📘 Add New Course</h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* category, title, description, price, videoUrls same as before */}

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 required
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1C1A57]"
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>{cat}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Course Title</label>
//               <input
//                 type="text"
//                 name="courseTitle"
//                 value={formData.courseTitle}
//                 onChange={handleChange}
//                 required
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Course Description</label>
//               <textarea
//                 name="courseDescription"
//                 value={formData.courseDescription}
//                 onChange={handleChange}
//                 required
//                 rows="3"
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2"
//               ></textarea>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹)</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 required
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Video URLs (comma separated)
//               </label>
//               <textarea
//                 name="videoUrls"
//                 value={formData.videoUrls}
//                 onChange={handleChange}
//                 required
//                 rows="2"
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2"
//               ></textarea>
//             </div>

//             {/* ⭐ NEW: Course Content (JSON) */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Course Content (JSON)
//               </label>
//               <textarea
//                 name="courseContent"
//                 value={formData.courseContent}
//                 onChange={handleChange}
//                 rows="6"
//                 placeholder='[ { "sectionTitle": "Section 1", "lessons": ["1. Intro", "2. ..."] } ]'
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-xs"
//               ></textarea>
//               <p className="text-[11px] text-gray-500 mt-1">
//                 Paste the JSON structure with sectionTitle & lessons. Leave empty if not needed.
//               </p>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Course Image</label>
//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={handleChange}
//                 required
//                 className="w-full text-sm"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 PDF File (optional)
//               </label>
//               <input
//                 type="file"
//                 name="pdf"
//                 accept="application/pdf"
//                 onChange={handleChange}
//                 className="w-full text-sm"
//               />
//             </div>

//             <div className="flex justify-end gap-3 pt-3">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-5 py-2 rounded-md bg-[#1C1A57] text-white hover:bg-[#2f2c75] text-sm"
//               >
//                 Save Course
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddCourseModal;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCourseModal = ({ isOpen, onClose, onCourseAdded }) => {
  const [formData, setFormData] = useState({
    category: '',
    courseTitle: '',
    courseDescription: '',
    // fees
    price: '',        // recording fee
    livePrice: '',    // live fee
    offlinePrice: '', // offline fee
    videoUrls: '',
    courseContent: '',
    image: null,
    pdf: null,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        category: '',
        courseTitle: '',
        courseDescription: '',
        price: '',
        livePrice: '',
        offlinePrice: '',
        videoUrls: '',
        courseContent: '',
        image: null,
        pdf: null,
      });
    }
  }, [isOpen]);

  const categories = [
    'Frontend Development',
    'Backend Development',
    'Programming',
    'DBMS',
    'Full Stack Development',
    'Mobile App Development',
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const form = new FormData();
  //     form.append('image', formData.image);
  //     if (formData.pdf) form.append('pdf', formData.pdf);

  //     form.append('category', formData.category);
  //     form.append('courseTitle', formData.courseTitle);
  //     form.append('courseDescription', formData.courseDescription);

  //     // fees
  //     form.append('price', formData.price);               // recording
  //     form.append('livePrice', formData.livePrice || ''); // optional
  //     form.append('offlinePrice', formData.offlinePrice || '');

  //     form.append('videoUrls', formData.videoUrls);

  //     // course content JSON string (optional)
  //     if (formData.courseContent.trim()) {
  //       form.append('courseContent', formData.courseContent.trim());
  //     }

  //     await axios.post('http://localhost:5000/api/course', form);
  //     toast.success('🎉 Course added successfully!');
  //     onCourseAdded();

  //     setTimeout(() => {
  //       onClose();
  //     }, 1500);
  //   } catch (err) {
  //     console.error(err);
  //     toast.error('❌ Failed to add course');
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ front-end validation – at least one fee
  if (!formData.price && !formData.livePrice && !formData.offlinePrice) {
    toast.error("Please enter at least one fee (Recording / Live / Offline).");
    return;
  }

  try {
    const form = new FormData();
    form.append("image", formData.image);
    if (formData.pdf) form.append("pdf", formData.pdf);

    form.append("category", formData.category);
    form.append("courseTitle", formData.courseTitle);
    form.append("courseDescription", formData.courseDescription);

    // ✅ only append if non-empty, so backend gets undefined instead of ""
    if (formData.price) form.append("price", formData.price);
    if (formData.livePrice) form.append("livePrice", formData.livePrice);
    if (formData.offlinePrice) form.append("offlinePrice", formData.offlinePrice);

    form.append("videoUrls", formData.videoUrls);

    if (formData.courseContent.trim()) {
      form.append("courseContent", formData.courseContent.trim());
    }

    await axios.post("http://localhost:5000/api/course", form);
    toast.success("🎉 Course added successfully!");
    onCourseAdded();

    setTimeout(() => {
      onClose();
    }, 1500);
  } catch (err) {
    console.error("Add course error:", err.response?.data || err.message);
    toast.error(err.response?.data?.error || "❌ Failed to add course");
  }
};


  if (!isOpen) return null;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div
          className="relative w-full max-w-xl rounded-xl bg-blue-100 p-6 border border-blue-300"
          style={{
            maxHeight: '90vh',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          onWheel={(e) => e.stopPropagation()}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
          >
            <FaTimes />
          </button>

          <h2 className="text-2xl font-bold text-center text-[#1C1A57] mb-6">
            📘 Add New Course
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1C1A57]"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Course Title
              </label>
              <input
                type="text"
                name="courseTitle"
                value={formData.courseTitle}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Course Description
              </label>
              <textarea
                name="courseDescription"
                value={formData.courseDescription}
                onChange={handleChange}
                required
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              ></textarea>
            </div>

            {/* Fees block */}
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Recording Fee (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  // required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Live Session Fee (₹)
                </label>
                <input
                  type="number"
                  name="livePrice"
                  value={formData.livePrice}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <p className="text-[11px] text-gray-500">
                  Leave empty to use recording fee.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Offline Session Fee (₹)
                </label>
                <input
                  type="number"
                  name="offlinePrice"
                  value={formData.offlinePrice}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <p className="text-[11px] text-gray-500">
                  Leave empty to use recording fee.
                </p>
              </div>
            </div>

            {/* Videos */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Video URLs (comma separated)
              </label>
              <textarea
                name="videoUrls"
                value={formData.videoUrls}
                onChange={handleChange}
                required
                rows="2"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              ></textarea>
            </div>

            {/* Course Content JSON */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Course Content (JSON)
              </label>
              <textarea
                name="courseContent"
                value={formData.courseContent}
                onChange={handleChange}
                rows="6"
                placeholder='[ { "sectionTitle": "Section 1", "lessons": ["1. Intro", "2. ..."] } ]'
                className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-xs"
              ></textarea>
              <p className="text-[11px] text-gray-500 mt-1">
                Paste the JSON structure with sectionTitle &amp; lessons. Leave
                empty if not needed.
              </p>
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Course Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                required
                className="w-full text-sm"
              />
            </div>

            {/* PDF */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                PDF File (optional)
              </label>
              <input
                type="file"
                name="pdf"
                accept="application/pdf"
                onChange={handleChange}
                className="w-full text-sm"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-md bg-[#1C1A57] text-white hover:bg-[#2f2c75] text-sm"
              >
                Save Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCourseModal;


