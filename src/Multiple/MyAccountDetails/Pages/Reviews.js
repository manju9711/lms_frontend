// import React from 'react';
// import { FaStar, FaRegStar, FaEdit, FaTrash } from 'react-icons/fa';

// const Reviews = () => {
//   return (
//     <>
//       <div className="p-10 min-h-screen bg-gray-50 flex flex-col">
//         <h2 className="text-xl font-semibold mb-4">Reviews</h2>

//         <div className="w-full max-w-3xl bg-white border rounded-lg shadow-sm">
//           {/* Header */}
//           <div className="p-4 border-b">
//             <p className="text-lg font-semibold">
//               Course: <span className="font-normal text-gray-600">Auto CADD</span>
//             </p>
//           </div>

//           {/* Body */}
//           <div className="p-4 space-y-3">
//             <div className="flex justify-between items-center">
//               {/* Star Rating */}
//               <div className="flex text-yellow-500 text-xl">
//                 <FaStar />
//                 <FaStar />
//                 <FaStar />
//                 <FaRegStar />
//                 <FaRegStar />
//               </div>

//               {/* Action Buttons aligned to the right */}
//               <div className="flex gap-4 text-sm text-blue-600 cursor-pointer">
//                 <div className="flex items-center gap-1 hover:underline">
//                   <FaEdit />
//                   <span>Edit</span>
//                 </div>
//                 <div className="flex items-center gap-1 hover:underline">
//                   <FaTrash />
//                   <span>Delete</span>
//                 </div>
//               </div>
//             </div>

//             {/* Review Text */}
//             <p className="text-sm text-gray-700">nice</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Reviews;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaRegStar, FaEdit, FaTrash } from 'react-icons/fa';

const Reviews = () => {
  const [userReviews, setUserReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [editedRating, setEditedRating] = useState(0);
  const [editedComment, setEditedComment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  // Fetch reviews
  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/course');
        const allCourses = res.data;

        const reviews = [];

        allCourses.forEach(course => {
          const review = course.reviews?.find(r => String(r.userId) === String(user?.id));
          if (review) {
            reviews.push({
              courseTitle: course.courseTitle,
              courseId: course.id,
              rating: review.rating,
              comment: review.comment
            });
          }
        });

        setUserReviews(reviews);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      }
    };

    if (user) fetchUserReviews();
  }, [user]);

  // Open edit modal
  const handleEdit = (review) => {
    setEditingReview(review);
    setEditedRating(review.rating);
    setEditedComment(review.comment);
    setShowModal(true);
  };

  // Submit edited review
  const handleUpdate = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/course/review/${editingReview.courseId}`, {
        userId: user.id,
        rating: editedRating,
        comment: editedComment
      });

      // Refresh list
      setUserReviews(prev =>
        prev.map(r =>
          r.courseId === editingReview.courseId
            ? { ...r, rating: editedRating, comment: editedComment }
            : r
        )
      );
      setShowModal(false);
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  // Delete review
  const handleDelete = async (courseId) => {
    try {
      
      await axios.post(`http://localhost:5000/api/course/review/delete/${courseId}`, {
        userId: user.id
      });

      setUserReviews(prev => prev.filter(r => r.courseId !== courseId));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div className="p-10 min-h-screen bg-gray-50 flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-6">My Course Reviews</h2>

      {userReviews.length === 0 ? (
        <p className="text-gray-500">You haven't reviewed any courses yet.</p>
      ) : (
        userReviews.map((review, index) => (
          <div key={index} className="w-full max-w-3xl bg-white border rounded-lg shadow-sm mb-6">
            {/* Header */}
            <div className="p-4 border-b">
              <p className="text-lg font-semibold">
                Course: <span className="font-normal text-gray-600">{review.courseTitle}</span>
              </p>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex text-yellow-500 text-xl">
                  {[...Array(5)].map((_, i) =>
                    i < review.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-4 text-sm text-blue-600 cursor-pointer">
                  {/* <div onClick={() => handleEdit(review)} className="flex items-center gap-1 hover:underline">
                    <FaEdit />
                    <span>Edit</span>
                  </div> */}
                  <div onClick={() => handleDelete(review.courseId)} className="flex items-center gap-1 hover:underline text-red-600">
                    <FaTrash />
                    <span>Delete</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-700">{review.comment}</p>
            </div>
          </div>
        ))
      )}

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4 shadow-lg">
            <h3 className="text-lg font-semibold">Edit Review</h3>

            <div className="flex gap-1 text-yellow-500 text-2xl">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  onClick={() => setEditedRating(i + 1)}
                  className="cursor-pointer"
                >
                  {i < editedRating ? <FaStar /> : <FaRegStar />}
                </span>
              ))}
            </div>

            <textarea
              className="w-full border p-2 rounded"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              rows={4}
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;

