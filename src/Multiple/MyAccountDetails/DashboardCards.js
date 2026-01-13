import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardCards = () => {
  const [enrolledCount, setEnrolledCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchCounts = async () => {
      if (!user?.id) return;

      try {
        const enrolledRes = await axios.get(`http://localhost:5000/api/enrolled-courses/${user.id}`);
        setEnrolledCount(enrolledRes.data.length);

        const completedRes = await axios.get(`http://localhost:5000/api/progress/completed-count/${user.id}`);
        setCompletedCount(completedRes.data.totalCompleted);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };

    fetchCounts();
  }, [user]);

  const inProgressCount = enrolledCount - completedCount;

  const stats = [
    { label: 'Enrolled Courses', count: enrolledCount, icon: '📘' },
    { label: 'In Progress Courses', count: inProgressCount >= 0 ? inProgressCount : 0, icon: '⏳' },
    { label: 'Completed Courses', count: completedCount, icon: '🏆' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((item) => (
        <div key={item.label} className="border rounded-md p-6 shadow-sm flex flex-col items-center text-center">
          <div className="text-4xl mb-2">{item.icon}</div>
          <div className="text-2xl font-bold">{item.count}</div>
          <div className="text-sm text-gray-500">{item.label}</div>
        </div>
        
      ))}
    </div>
  );
};

export default DashboardCards;
