//download certificate
// import React, { useEffect, useState, useRef } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import axios from "axios";
// import Certificate from "./Certificate";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// function formatDate(dateString) {
//   if (!dateString) return "";
//   const d = new Date(dateString);
//   if (Number.isNaN(d.getTime())) return dateString;
//   return d.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   });
// }

// function buildCertId(userId, courseId) {
//   const u = String(userId || "X").padStart(4, "0");
//   const c = String(courseId || "0").padStart(4, "0");
//   return `EDU-${u}-${c}`;
// }

// const DownloadCertificate = () => {
//   const { courseId } = useParams();
//   const location = useLocation();

//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");
//   const certRef = useRef(null);           // 👈 certificate wrapper ref

//   const search = new URLSearchParams(location.search);
//   const nameFromQuery = search.get("name");
//   const userIdFromQuery = search.get("userId");
//   const completedAtFromQuery = search.get("completedAt");
//   const isAdminView = !!nameFromQuery;

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const courseRes = await axios.get(
//           `http://localhost:5000/api/course/${courseId}`
//         );
//         const course = courseRes.data;

//         let studentName;
//         let completionDate;
//         let certificateId;

//         if (isAdminView) {
//           studentName = nameFromQuery;
//           completionDate = formatDate(
//             completedAtFromQuery || new Date().toISOString()
//           );
//           certificateId = buildCertId(userIdFromQuery, courseId);
//         } else {
//           const user = JSON.parse(localStorage.getItem("user"));
//           if (!user) {
//             setError("Please login to view your certificate.");
//             return;
//           }

//           const progRes = await axios.get(
//             `http://localhost:5000/api/progress/${user.id}/${courseId}`
//           );

//           if (!progRes.data?.isCompleted) {
//             setError("You have not completed this course yet.");
//             return;
//           }

//           studentName =
//             user.username ||
//             `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
//             "Student";

//           completionDate = formatDate(
//             progRes.data.completedAt || new Date().toISOString()
//           );
//           certificateId = buildCertId(user.id, courseId);
//         }

//         setData({
//           studentName,
//           courseTitle: course.courseTitle,
//           completionDate,
//           certificateId,
//         });
//       } catch (err) {
//         console.error("Error loading certificate:", err);
//         setError("Failed to load certificate.");
//       }
//     };

//     load();
//   }, [courseId, isAdminView, nameFromQuery, completedAtFromQuery, userIdFromQuery]);

//   // ---------- DOWNLOAD HANDLERS ----------

//   const captureCanvas = async () => {
//     if (!certRef.current) return null;
//     // higher scale → better quality
//     const canvas = await html2canvas(certRef.current, { scale: 2 });
//     return canvas;
//   };

//   const handleDownloadImage = async () => {
//     const canvas = await captureCanvas();
//     if (!canvas) return;

//     const imgData = canvas.toDataURL("image/png");
//     const link = document.createElement("a");
//     link.href = imgData;
//     link.download = `${data?.certificateId || "certificate"}.png`;
//     link.click();
//   };

//   const handleDownloadPdf = async () => {
//     const canvas = await captureCanvas();
//     if (!canvas) return;

//     const imgData = canvas.toDataURL("image/png");

//     // landscape A4
//     const pdf = new jsPDF("landscape", "pt", "a4");
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = pdf.internal.pageSize.getHeight();

//     const imgWidth = canvas.width;
//     const imgHeight = canvas.height;

//     const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
//     const renderWidth = imgWidth * ratio;
//     const renderHeight = imgHeight * ratio;

//     const x = (pdfWidth - renderWidth) / 2;
//     const y = (pdfHeight - renderHeight) / 2;

//     pdf.addImage(imgData, "PNG", x, y, renderWidth, renderHeight);
//     pdf.save(`${data?.certificateId || "certificate"}.pdf`);
//   };

//   // ---------- RENDER ----------

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-600">
//         {error}
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading certificate...
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen bg-slate-100 print:bg-white">
//       {/* 🎯 Download buttons (no print) */}
//       <div className="print:hidden fixed top-4 right-4 flex gap-2">
//         <button
//           onClick={handleDownloadPdf}
//           className="rounded-full bg-indigo-600 text-white text-xs px-4 py-2 shadow-md hover:bg-indigo-700 transition"
//         >
//           Download PDF
//         </button>
//         <button
//           onClick={handleDownloadImage}
//           className="rounded-full bg-emerald-600 text-white text-xs px-4 py-2 shadow-md hover:bg-emerald-700 transition"
//         >
//           Download Image
//         </button>
//       </div>

//       {/* capture area */}
//       <div ref={certRef}>
//         <Certificate
//           studentName={data.studentName}
//           courseTitle={data.courseTitle}
//           completionDate={data.completionDate}
//           certificateId={data.certificateId}
//         />
//       </div>
//     </div>
//   );
// };

// export default DownloadCertificate;

//button alignment
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Certificate from "./Certificate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// ------------------ HELPERS ------------------

function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function buildCertId(userId, courseId) {
  const u = String(userId || "X").padStart(4, "0");
  const c = String(courseId || "0").padStart(4, "0");
  return `EDU-${u}-${c}`;
}

// ------------------ MAIN COMPONENT ------------------

const DownloadCertificate = () => {
  const { courseId } = useParams();
  const location = useLocation();

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const certRef = useRef(null);

  const search = new URLSearchParams(location.search);
  const nameFromQuery = search.get("name");
  const userIdFromQuery = search.get("userId");
  const completedAtFromQuery = search.get("completedAt");
  const isAdminView = !!nameFromQuery;

  // ------------------ LOAD DATA ------------------

  useEffect(() => {
    const load = async () => {
      try {
        const courseRes = await axios.get(
          `http://localhost:5000/api/course/${courseId}`
        );
        const course = courseRes.data;

        let studentName, completionDate, certificateId;

        if (isAdminView) {
          studentName = nameFromQuery;
          completionDate = formatDate(
            completedAtFromQuery || new Date().toISOString()
          );
          certificateId = buildCertId(userIdFromQuery, courseId);
        } else {
          const user = JSON.parse(localStorage.getItem("user"));
          if (!user) {
            setError("Please login to view your certificate.");
            return;
          }

          const progRes = await axios.get(
            `http://localhost:5000/api/progress/${user.id}/${courseId}`
          );

          if (!progRes.data?.isCompleted) {
            setError("You have not completed this course yet.");
            return;
          }

          studentName =
            user.username ||
            `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
            "Student";

          completionDate = formatDate(
            progRes.data.completedAt || new Date().toISOString()
          );
          certificateId = buildCertId(user.id, courseId);
        }

        setData({
          studentName,
          courseTitle: course.courseTitle,
          completionDate,
          certificateId,
        });
      } catch (err) {
        console.error("Error loading certificate:", err);
        setError("Failed to load certificate.");
      }
    };

    load();
  }, [courseId, isAdminView, nameFromQuery, completedAtFromQuery, userIdFromQuery]);

  // ------------------ DOWNLOAD HANDLERS ------------------

  const captureCanvas = async () => {
    if (!certRef.current) return null;
    return await html2canvas(certRef.current, { scale: 2 });
  };

  const handleDownloadImage = async () => {
    const canvas = await captureCanvas();
    if (!canvas) return;

    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imgData;
    link.download = `${data?.certificateId || "certificate"}.png`;
    link.click();
  };

  const handleDownloadPdf = async () => {
    const canvas = await captureCanvas();
    if (!canvas) return;

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const renderWidth = imgWidth * ratio;
    const renderHeight = imgHeight * ratio;

    const x = (pdfWidth - renderWidth) / 2;
    const y = (pdfHeight - renderHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, renderWidth, renderHeight);
    pdf.save(`${data?.certificateId || "certificate"}.pdf`);
  };

  // ------------------ RENDER UI ------------------

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading certificate...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 print:bg-white flex flex-col items-center py-6">

      {/* 🎯 Download Buttons – Center Top, Fully Responsive */}
      <div
        className="
        print:hidden 
        fixed top-4 left-1/2 -translate-x-1/2 
        flex flex-wrap items-center justify-center 
        gap-3 
        z-0
      "
      >
        <button
          onClick={handleDownloadPdf}
          className="rounded-full bg-indigo-600 text-white text-sm px-5 py-2 shadow-md hover:bg-indigo-700 transition"
        >
          Download PDF
        </button>

        <button
          onClick={handleDownloadImage}
          className="rounded-full bg-emerald-600 text-white text-sm px-5 py-2 shadow-md hover:bg-emerald-700 transition"
        >
          Download Image
        </button>
      </div>

      {/* 🎯 Certificate Container */}
      <div
        ref={certRef}
        className="w-full  max-w-5xl  flex justify-center overflow-hidden sm:mt-4 mt-16  
        px-2          
    md:px-4"
      >
        <Certificate
          studentName={data.studentName}
          courseTitle={data.courseTitle}
          completionDate={data.completionDate}
          certificateId={data.certificateId}
        />
      </div>
    </div>
  );
};

export default DownloadCertificate;


