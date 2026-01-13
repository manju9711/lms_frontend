import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SubscribePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = new URLSearchParams(location.search).get('courseId');

  const handlePayment = async (e) => {
    e.preventDefault();

    // mock payment success
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      toast.error('Please log in first');
      return;
    }

    // Call backend API to enroll
    try {
      await fetch(`http://localhost:5000/api/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, courseId }),
      });

      toast.success('Subscription successful!');
    //   navigate(`/CourseDetails/${courseId}`);
    navigate(`/CourseDetails/${courseId}?subscribed=true`);

    } catch (err) {
      toast.error('Subscription failed. Try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Subscribe to Course</h2>
      <form onSubmit={handlePayment}>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Card Number"
          className="w-full mb-4 border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Pay ₹499 & Subscribe
        </button>
      </form>
    </div>
  );
};

export default SubscribePage;
