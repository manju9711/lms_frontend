import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa"; // added

const VideoLessonPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [completed, setCompleted] = useState(false);

  // useEffect(() => {
  //   const fetchCourse = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:5000/api/course/${courseId}`);
  //       setCourse(res.data);
  //     } catch (error) {
  //       console.error("Error fetching course:", error);
  //     }
  //   };

  //   fetchCourse();

  //   // Load completion status from localStorage
  //   const isCompleted = localStorage.getItem(`videoCompleted_${courseId}`) === 'true';
  //   setCompleted(isCompleted);
  // }, [courseId]);

  // Convert normal YouTube link to embedded
  useEffect(() => {
  const fetchCourse = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/course/${courseId}`);
      setCourse(res.data);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const fetchProgress = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return;

      const res = await axios.get(`http://localhost:5000/api/${user.id}/${courseId}`);
      setCompleted(res.data.isCompleted);
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  };

  fetchCourse();
  fetchProgress();
}, [courseId]);

  const getEmbeddedUrl = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  if (!course) return <div className="text-center mt-10">Loading...</div>;

  const embeddedUrl = getEmbeddedUrl(course.videoUrl);

  // const handleMarkComplete = () => {
  //   localStorage.setItem(`videoCompleted_${courseId}`, 'true');
  //   setCompleted(true);
  // };
const handleMarkComplete = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    await axios.post("http://localhost:5000/api/progress/complete", {
      userId: user.id,
      courseId: parseInt(courseId)
    });
    setCompleted(true);
  } catch (err) {
    console.error("Error marking as complete:", err);
  }
};

  return (
    <div className="flex h-screen font-quicksand">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-6 border-r">
        <h2 className="text-xl font-semibold mb-6">Course Content</h2>
        <div className="bg-blue-100 p-4 rounded mb-4">
          <h3 className="text-lg font-bold">{course.courseTitle}</h3>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center">
              <span className="mr-2">📄</span>
              Videos
              {completed ? (
                <FaCheckCircle className="ml-auto text-green-500" />
              ) : (
                <FaRegCircle className="ml-auto text-gray-400" />
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8 bg-gray-100 flex flex-col items-center">
        <div className="mb-4 w-full flex justify-between">
          <h2 className="text-2xl font-semibold">{course.courseTitle}</h2>
          <button
            onClick={handleMarkComplete}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            MARK AS COMPLETE
          </button>
        </div>
        <p className="text-right w-full mb-4">
          Your Progress: {completed ? "1 of 1 (100%)" : "0 of 1 (0%)"}
        </p>

        {embeddedUrl ? (
          <iframe
            width="100%"
            height="500"
            src={embeddedUrl}
            title="Course Video"
            frameBorder="0"
            allowFullScreen
            className="rounded shadow"
          ></iframe>
        ) : (
          <div className="text-center mt-10 text-red-500">⚠️ Invalid video URL</div>
        )}
      </div>
    </div>
  );
};

export default VideoLessonPage;





