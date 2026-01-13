import React, { useState } from 'react';
import axios from 'axios';

const ReviewModal = ({ show, onClose, courseId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [reviewText, setReviewText] = useState('');

  if (!show) return null;

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)

    if (!user) {
      alert("Please login first.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/course/review/${courseId}`, {
        userId: user.id,
        userName: user.firstName,
        
        rating,
        comment: reviewText
      });

      if (response.status === 200) {
        onReviewSubmitted();  // refresh reviews
        onClose();            // close modal
      } else {
        alert("Something went wrong.");
      }
    } catch (err) {
      console.error("Review submission failed:", err);
      alert("Failed to submit review.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold text-center mb-4">
          How would you rate this course?
        </h2>

        {/* Stars */}
        <div className="flex justify-center mb-4 text-2xl space-x-1">
          {[...Array(5)].map((_, index) => {
            const currentRating = index + 1;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setRating(currentRating)}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              >
                <span
                  className={`${
                    currentRating <= (hover || rating)
                      ? 'text-yellow-500'
                      : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              </button>
            );
          })}
        </div>

        {/* Textarea */}
        <textarea
          rows="4"
          className="w-full border border-gray-300 rounded-md p-2 text-sm mb-4"
          placeholder="Tell us about your own personal experience taking this course. Was it a good match for you?"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 font-semibold"
          >
            Update Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;


