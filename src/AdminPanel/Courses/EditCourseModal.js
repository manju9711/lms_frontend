//new
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaTimes } from 'react-icons/fa';
// import { toast } from 'react-toastify';

// const EditCourseModal = ({ isOpen, onClose, course, onCourseUpdated }) => {
//   const [formData, setFormData] = useState({
//     category: '',
//     courseTitle: '',
//     courseDescription: '',
//     price: '',
//     videoUrls: '',
//     courseContent: '',   // ⭐ NEW
//     image: '',
//     pdf: '',
//   });

//   useEffect(() => {
//     if (isOpen && course) {
//       setFormData({
//         category: course.category || '',
//         courseTitle: course.courseTitle || '',
//         courseDescription: course.courseDescription || '',
//         price: course.price || '',
//         videoUrls: (course.videoUrls || []).join(', '),
//         courseContent: course.courseContent
//           ? JSON.stringify(course.courseContent, null, 2) // pretty JSON
//           : '',
//         image: course.image || '',
//         pdf: course.pdf || '',
//       });
//     }
//   }, [isOpen, course]);

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

//       // Only append new files if user selected them
//       if (formData.image && formData.image instanceof File) {
//         form.append('image', formData.image);
//       }
//       if (formData.pdf && formData.pdf instanceof File) {
//         form.append('pdf', formData.pdf);
//       }

//       form.append('category', formData.category);
//       form.append('courseTitle', formData.courseTitle);
//       form.append('courseDescription', formData.courseDescription);
//       form.append('price', formData.price);
//       form.append('videoUrls', formData.videoUrls);

//       // ⭐ send courseContent (JSON string)
//       if (formData.courseContent.trim()) {
//         form.append('courseContent', formData.courseContent.trim());
//       } else {
//         form.append('courseContent', '[]'); // optional: empty array
//       }

//       await axios.put(`http://localhost:5000/api/course/${course.id}`, form);

//       toast.success('✅ Course updated successfully!');
//       onCourseUpdated();
//       setTimeout(() => onClose(), 1500);
//     } catch (err) {
//       console.error(err);
//       toast.error('❌ Failed to update course');
//     }
//   };

//   if (!isOpen || !course) return null;

//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
//       <div
//         className="relative w-full max-w-xl rounded-xl bg-blue-100 p-6 border border-blue-300"
//         style={{
//           maxHeight: '90vh',
//           overflowY: 'auto',
//           scrollbarWidth: 'none',
//           msOverflowStyle: 'none',
//         }}
//         onWheel={(e) => e.stopPropagation()}
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
//         >
//           <FaTimes />
//         </button>

//         <h2 className="text-2xl font-bold text-center text-[#1C1A57] mb-6">✏️ Edit Course</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* category, title, description, price, videoUrls same as before + courseContent */}

//           <div>
//             <label className="block mb-1 font-medium">Category</label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               required
//               className="w-full border rounded px-3 py-2"
//             >
//               <option value="">Select Category</option>
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>{cat}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Course Title</label>
//             <input
//               type="text"
//               name="courseTitle"
//               value={formData.courseTitle}
//               onChange={handleChange}
//               required
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Description</label>
//             <textarea
//               name="courseDescription"
//               value={formData.courseDescription}
//               onChange={handleChange}
//               required
//               rows="3"
//               className="w-full border rounded px-3 py-2"
//             ></textarea>
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Price (₹)</label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               required
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Video URLs (comma separated)</label>
//             <textarea
//               name="videoUrls"
//               value={formData.videoUrls}
//               onChange={handleChange}
//               required
//               rows="2"
//               className="w-full border rounded px-3 py-2"
//             ></textarea>
//           </div>

//           {/* ⭐ NEW: Course Content */}
//           <div>
//             <label className="block mb-1 font-medium">Course Content (JSON)</label>
//             <textarea
//               name="courseContent"
//               value={formData.courseContent}
//               onChange={handleChange}
//               rows="6"
//               className="w-full border rounded px-3 py-2 font-mono text-xs"
//             ></textarea>
//             <p className="text-[11px] text-gray-500 mt-1">
//               Edit the sectionTitle & lessons JSON. Make sure it is valid JSON.
//             </p>
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Course Image (optional)</label>
//             {formData.image && typeof formData.image === 'string' && (
//               <img
//                 src={`http://localhost:5000/uploads/${formData.image}`}
//                 alt="Course"
//                 className="w-24 h-24 object-cover mb-2 rounded"
//               />
//             )}
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleChange}
//               className="w-full"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">PDF File (optional)</label>
//             {formData.pdf && typeof formData.pdf === 'string' && (
//               <a
//                 href={`http://localhost:5000/uploads/${formData.pdf}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block text-blue-600 mb-2 underline"
//               >
//                 📄 View existing PDF
//               </a>
//             )}
//             <input
//               type="file"
//               name="pdf"
//               accept="application/pdf"
//               onChange={handleChange}
//               className="w-full"
//             />
//           </div>

//           <div className="flex justify-end gap-3 pt-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-5 py-2 rounded bg-[#1C1A57] text-white hover:bg-[#2f2c75] text-sm"
//             >
//               Update Course
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditCourseModal;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const EditCourseModal = ({ isOpen, onClose, course, onCourseUpdated }) => {
  const [formData, setFormData] = useState({
    category: '',
    courseTitle: '',
    courseDescription: '',
    price: '',
    livePrice: '',
    offlinePrice: '',
    videoUrls: '',
    courseContent: '',
    image: '',
    pdf: '',
  });

  useEffect(() => {
    if (isOpen && course) {
      setFormData({
        category: course.category || '',
        courseTitle: course.courseTitle || '',
        courseDescription: course.courseDescription || '',
        price: course.price || '',
        livePrice: course.livePrice || '',
        offlinePrice: course.offlinePrice || '',
        videoUrls: (course.videoUrls || []).join(', '),
        courseContent: course.courseContent
          ? JSON.stringify(course.courseContent, null, 2)
          : '',
        image: course.image || '',
        pdf: course.pdf || '',
      });
    }
  }, [isOpen, course]);

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

  //     if (formData.image && formData.image instanceof File) {
  //       form.append('image', formData.image);
  //     }
  //     if (formData.pdf && formData.pdf instanceof File) {
  //       form.append('pdf', formData.pdf);
  //     }

  //     form.append('category', formData.category);
  //     form.append('courseTitle', formData.courseTitle);
  //     form.append('courseDescription', formData.courseDescription);

  //     // fees
  //     form.append('price', formData.price);
  //     form.append('livePrice', formData.livePrice || '');
  //     form.append('offlinePrice', formData.offlinePrice || '');

  //     form.append('videoUrls', formData.videoUrls);

  //     if (formData.courseContent.trim()) {
  //       form.append('courseContent', formData.courseContent.trim());
  //     } else {
  //       form.append('courseContent', '[]');
  //     }

  //     await axios.put(`http://localhost:5000/api/course/${course.id}`, form);

  //     toast.success('✅ Course updated successfully!');
  //     onCourseUpdated();
  //     setTimeout(() => onClose(), 1500);
  //   } catch (err) {
  //     console.error(err);
  //     toast.error('❌ Failed to update course');
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ atleast one fee check
  if (
    !formData.price &&
    !formData.livePrice &&
    !formData.offlinePrice
  ) {
    toast.error("Please enter at least one fee (Recording / Live / Offline).");
    return;
  }

  try {
    const form = new FormData();

    // image / pdf – new file select pannina mattum append
    if (formData.image && formData.image instanceof File) {
      form.append("image", formData.image);
    }
    if (formData.pdf && formData.pdf instanceof File) {
      form.append("pdf", formData.pdf);
    }

    form.append("category", formData.category);
    form.append("courseTitle", formData.courseTitle);
    form.append("courseDescription", formData.courseDescription);

    // ✅ fees: empty string na send pannadha
    if (formData.price !== "") {
      form.append("price", formData.price);            // recording
    }
    if (formData.livePrice !== "") {
      form.append("livePrice", formData.livePrice);    // live
    }
    if (formData.offlinePrice !== "") {
      form.append("offlinePrice", formData.offlinePrice); // offline
    }

    form.append("videoUrls", formData.videoUrls);

    if (formData.courseContent.trim()) {
      form.append("courseContent", formData.courseContent.trim());
    } else {
      form.append("courseContent", "[]");
    }

    await axios.put(`http://localhost:5000/api/course/${course.id}`, form);

    toast.success("✅ Course updated successfully!");
    onCourseUpdated();
    setTimeout(() => onClose(), 1500);
  } catch (err) {
    console.error("Update course error:", err.response?.data || err.message);
    toast.error(err.response?.data?.error || "❌ Failed to update course");
  }
};


  if (!isOpen || !course) return null;

  return (
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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold text-center text-[#1C1A57] mb-6">
          ✏️ Edit Course
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
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
            <label className="block mb-1 font-medium">Course Title</label>
            <input
              type="text"
              name="courseTitle"
              value={formData.courseTitle}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="courseDescription"
              value={formData.courseDescription}
              onChange={handleChange}
              required
              rows="3"
              className="w-full border rounded px-3 py-2"
            ></textarea>
          </div>

          {/* Fees block */}
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block mb-1 font-medium">Recording Fee (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                // required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Live Session Fee (₹)</label>
              <input
                type="number"
                name="livePrice"
                value={formData.livePrice}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              <p className="text-[11px] text-gray-500">
                Leave empty to use recording fee.
              </p>
            </div>

            <div>
              <label className="block mb-1 font-medium">Offline Session Fee (₹)</label>
              <input
                type="number"
                name="offlinePrice"
                value={formData.offlinePrice}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              <p className="text-[11px] text-gray-500">
                Leave empty to use recording fee.
              </p>
            </div>
          </div>

          {/* Video URLs */}
          <div>
            <label className="block mb-1 font-medium">
              Video URLs (comma separated)
            </label>
            <textarea
              name="videoUrls"
              value={formData.videoUrls}
              onChange={handleChange}
              required
              rows="2"
              className="w-full border rounded px-3 py-2"
            ></textarea>
          </div>

          {/* Course Content JSON */}
          <div>
            <label className="block mb-1 font-medium">Course Content (JSON)</label>
            <textarea
              name="courseContent"
              value={formData.courseContent}
              onChange={handleChange}
              rows="6"
              className="w-full border rounded px-3 py-2 font-mono text-xs"
            ></textarea>
            <p className="text-[11px] text-gray-500 mt-1">
              Edit the sectionTitle &amp; lessons JSON. Make sure it is valid JSON.
            </p>
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 font-medium">
              Course Image (optional)
            </label>
            {formData.image && typeof formData.image === 'string' && (
              <img
                src={`http://localhost:5000/uploads/${formData.image}`}
                alt="Course"
                className="w-24 h-24 object-cover mb-2 rounded"
              />
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* PDF */}
          <div>
            <label className="block mb-1 font-medium">PDF File (optional)</label>
            {formData.pdf && typeof formData.pdf === 'string' && (
              <a
                href={`http://localhost:5000/uploads/${formData.pdf}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 mb-2 underline"
              >
                📄 View existing PDF
              </a>
            )}
            <input
              type="file"
              name="pdf"
              accept="application/pdf"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded bg-[#1C1A57] text-white hover:bg-[#2f2c75] text-sm"
            >
              Update Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourseModal;


