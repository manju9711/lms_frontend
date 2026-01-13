//original design
// import React from "react";
// import top from './images/top.png';
// import bottom from './images/bottom.png';

// const Certificate = ({
//   studentName = "Bartholomew Henderson",
//   courseTitle = "Full Stack Web Development",
//   completionDate = "08 July 2025",
//   certificateId = "EDU-2025-0001",
//   leftSignerName = "SAMIRA HADID",
//   leftSignerTitle = "University President",
//   rightSignerName = "ALFREDO TORRES",
//   rightSignerTitle = "Campus Coordinator",
// }) => {
//   return (
//     <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 print:bg-white print:p-0 font-serif">
//       {/* Download / Print */}
//       <button
//         onClick={() => window.print()}
//         className="print:hidden fixed top-4 right-4 rounded-full bg-indigo-600 text-white text-xs px-4 py-2 shadow-md hover:bg-indigo-700 transition"
//       >
//         Download / Print
//       </button>

//       {/* OUTER CERT CARD */}
//       <div className="relative w-[1120px] h-[700px] bg-white rounded-[22px] border-[8px] border-[#f7dca0] shadow-[0_18px_45px_rgba(15,23,42,0.35)] overflow-hidden print:shadow-none">
//         {/* inner gold border line */}
//         <div className="absolute inset-5 border border-[#f1d08c] rounded-[16px]" />

//         {/* corner decorative PNGs */}
//         {/* top-right wave */}
//         <img
//           src={top}
//           alt=""
//           className="pointer-events-none select-none absolute -top-2 right-0 w-72"
//         />
//         {/* bottom-left wave */}
//         <img
//           src={bottom}
//           alt=""
//           className="pointer-events-none select-none absolute bottom-0 -left-4 w-80"
//         />

//         {/* CONTENT */}
//         <div className="relative z-10 h-full flex flex-col items-center text-center px-32 pt-24 pb-20">
//           {/* heading */}
//           <div>
//             <h1 className="text-4xl tracking-[0.28em] text-slate-900 uppercase">
//               CERTIFICATE
//             </h1>
//             <p className="mt-1 text-lg tracking-[0.45em] text-slate-800 uppercase">
//               DIPLOMA
//             </p>

//             <p className="mt-6 text-[11px] tracking-[0.30em] text-[#c59a3d] uppercase">
//               THE FOLLOWING AWARDS ARE GIVEN TO
//             </p>
//           </div>

//           {/* name */}
//           <div className="mt-7">
//             <p className="text-3xl md:text-4xl text-slate-900 italic">
//               {studentName}
//             </p>
//           </div>

//           {/* description */}
//           <div className="mt-7 max-w-2xl text-[13px] leading-relaxed text-slate-700">
//             <p>
//               Having completed the assessment of the knowledge acquired in the
//               course of the supervised mentoring period, it is processed through
//               the issue of this certificate for{" "}
//               <span className="font-semibold">{courseTitle}</span>, in
//               recognition of accomplishment on{" "}
//               <span className="font-semibold">{completionDate}</span>.
//             </p>

//             {certificateId && (
//               <p className="mt-5 text-[11px] tracking-[0.24em] text-slate-500 uppercase">
//                 CERTIFICATE ID: {certificateId}
//               </p>
//             )}
//           </div>

//           {/* gold seal */}
//           <div className="mt-10 flex justify-center">
//             <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#fbe7aa] via-[#f2c649] to-[#da9c25] flex items-center justify-center shadow-[0_10px_22px_rgba(0,0,0,0.35)]">
//               <div className="w-18 h-18 rounded-full border-[4px] border-[#f9e9bd] flex items-center justify-center">
//                 <div className="w-16 h-16 rounded-full border border-[#f5d37c] flex items-center justify-center">
//                   <span className="text-2xl text-[#b67619]">★</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* signatures */}
//           <div className="mt-12 w-full flex justify-between px-14 text-left text-xs">
//             {/* left signer */}
//             <div className="w-64 text-center">
//               <div className="border-t border-slate-400 mb-2" />
//               <p className="tracking-[0.18em] text-slate-900 uppercase">
//                 {leftSignerName}
//               </p>
//               <p className="mt-1 text-[11px] text-[#b6974e]">
//                 {leftSignerTitle}
//               </p>
//             </div>

//             {/* right signer */}
//             <div className="w-64 text-center">
//               <div className="border-t border-slate-400 mb-2" />
//               <p className="tracking-[0.18em] text-slate-900 uppercase">
//                 {rightSignerName}
//               </p>
//               <p className="mt-1 text-[11px] text-[#b6974e]">
//                 {rightSignerTitle}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;

//responsive
// import React from "react";
// import top from "./images/top.png";
// import bottom from "./images/bottom.png";

// const Certificate = ({
//   studentName = "Bartholomew Henderson",
//   courseTitle = "Full Stack Web Development",
//   completionDate = "08 July 2025",
//   certificateId = "EDU-2025-0001",
//   leftSignerName = "SAMIRA HADID",
//   leftSignerTitle = "University President",
//   rightSignerName = "ALFREDO TORRES",
//   rightSignerTitle = "Campus Coordinator",
// }) => {
//   return (
//     <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 print:bg-white print:p-0 font-serif">
//       {/* Download / Print */}
//       <button
//         onClick={() => window.print()}
//         className="print:hidden fixed top-4 right-4 rounded-full bg-indigo-600 text-white text-xs px-4 py-2 shadow-md hover:bg-indigo-700 transition"
//       >
//         Download / Print
//       </button>

//       {/* OUTER CERT CARD */}
//       <div
//         className="
//           relative 
//           w-full max-w-[1120px] 
//           bg-white 
//           rounded-[22px] 
//           border-[8px] border-[#f7dca0] 
//           shadow-[0_18px_45px_rgba(15,23,42,0.35)] 
//           overflow-hidden 
//           print:shadow-none
//           min-h-[560px] md:min-h-[640px] lg:min-h-[700px]
//           print:w-[1120px] print:h-[700px]
//         "
//       >
//         {/* inner gold border line */}
//         <div className="absolute inset-3 sm:inset-4 md:inset-5 border border-[#f1d08c] rounded-[16px]" />

//         {/* corner decorative PNGs */}
//         {/* top-right wave */}
//         <img
//           src={top}
//           alt=""
//           className="
//             pointer-events-none select-none 
//             absolute -top-3 right-0 
//             w-40 sm:w-52 md:w-64 lg:w-72
//           "
//         />
//         {/* bottom-left wave */}
//         <img
//           src={bottom}
//           alt=""
//           className="
//             pointer-events-none select-none 
//             absolute bottom-0 -left-6 
//             w-44 sm:w-56 md:w-72 lg:w-80
//           "
//         />

//         {/* CONTENT */}
//         <div
//           className="
//             relative z-10 h-full 
//             flex flex-col items-center text-center 
//             px-6 sm:px-10 md:px-20 lg:px-32 
//             pt-12 sm:pt-16 md:pt-20 lg:pt-24 
//             pb-12 sm:pb-16 md:pb-20
//           "
//         >
//           {/* heading */}
//           <div>
//             <h1 className="text-2xl sm:text-3xl md:text-4xl tracking-[0.2em] md:tracking-[0.28em] text-slate-900 uppercase">
//               CERTIFICATE
//             </h1>
//             <p className="mt-1 text-sm sm:text-base md:text-lg tracking-[0.35em] md:tracking-[0.45em] text-slate-800 uppercase">
//               DIPLOMA
//             </p>

//             <p className="mt-4 sm:mt-5 md:mt-6 text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.26em] md:tracking-[0.30em] text-[#c59a3d] uppercase">
//               THE FOLLOWING AWARDS ARE GIVEN TO
//             </p>
//           </div>

//           {/* name */}
//           <div className="mt-4 sm:mt-6 md:mt-7">
//             <p className="text-2xl sm:text-3xl md:text-4xl text-slate-900 italic">
//               {studentName}
//             </p>
//           </div>

//           {/* description */}
//           <div className="mt-5 sm:mt-6 md:mt-7 max-w-2xl text-xs sm:text-[13px] leading-relaxed text-slate-700">
//             <p>
//               Having completed the assessment of the knowledge acquired in the
//               course of the supervised mentoring period, it is processed through
//               the issue of this certificate for{" "}
//               <span className="font-semibold">{courseTitle}</span>, in
//               recognition of accomplishment on{" "}
//               <span className="font-semibold">{completionDate}</span>.
//             </p>

//             {certificateId && (
//               <p className="mt-4 sm:mt-5 text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.24em] text-slate-500 uppercase">
//                 CERTIFICATE ID: {certificateId}
//               </p>
//             )}
//           </div>

//           {/* gold seal */}
//           <div className="mt-8 sm:mt-9 md:mt-10 flex justify-center">
//             <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#fbe7aa] via-[#f2c649] to-[#da9c25] flex items-center justify-center shadow-[0_10px_22px_rgba(0,0,0,0.35)]">
//               <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full border-[3px] sm:border-[4px] border-[#f9e9bd] flex items-center justify-center">
//                 <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border border-[#f5d37c] flex items-center justify-center">
//                   <span className="text-xl sm:text-2xl text-[#b67619]">★</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* signatures */}
//           <div
//             className="
//               mt-10 sm:mt-11 md:mt-12 
//               w-full 
//               flex flex-col md:flex-row 
//               items-center md:items-end 
//               justify-between 
//               gap-8 md:gap-0 
//               px-4 sm:px-8 md:px-14 
//               text-xs
//             "
//           >
//             {/* left signer */}
//             <div className="w-full md:w-64 text-center">
//               <div className="border-t border-slate-400 mb-2" />
//               <p className="tracking-[0.14em] md:tracking-[0.18em] text-slate-900 uppercase text-[10px] sm:text-xs">
//                 {leftSignerName}
//               </p>
//               <p className="mt-1 text-[10px] text-[#b6974e]">
//                 {leftSignerTitle}
//               </p>
//             </div>

//             {/* right signer */}
//             <div className="w-full md:w-64 text-center">
//               <div className="border-t border-slate-400 mb-2" />
//               <p className="tracking-[0.14em] md:tracking-[0.18em] text-slate-900 uppercase text-[10px] sm:text-xs">
//                 {rightSignerName}
//               </p>
//               <p className="mt-1 text-[10px] text-[#b6974e]">
//                 {rightSignerTitle}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;

import React from "react";
import top from "./images/top.png";
import bottom from "./images/bottom.png";

const Certificate = ({
  studentName = "Bartholomew Henderson",
  courseTitle = "Full Stack Web Development",
  completionDate = "08 July 2025",
  certificateId = "EDU-2025-0001",
  leftSignerName = "SAMIRA HADID",
  leftSignerTitle = "Head of Academics",
  rightSignerName = "ALFREDO TORRES",
  rightSignerTitle = "Course Instructor",
}) => {
  return (
    <div className="min-h-screen  bg-slate-100 flex items-center justify-center p-4 sm:p-6 print:bg-white print:p-0 font-serif">
      {/* Download / Print */}
      {/* <button
        onClick={() => window.print()}
        className="print:hidden fixed top-4 right-4 rounded-full bg-indigo-600 text-white text-xs px-4 py-2 shadow-md hover:bg-indigo-700 transition"
      >
        Download / Print
      </button> */}

      {/* OUTER CERT CARD */}
      <div
        className="
          relative 
          w-full max-w-[1120px] 
          bg-white 
          rounded-[22px] 
          border-[8px] border-[#f7dca0] 
          shadow-[0_18px_45px_rgba(15,23,42,0.35)] 
          overflow-hidden 
          print:shadow-none
          min-h-[560px] md:min-h-[640px] lg:min-h-[700px]
          print:w-[1120px] print:h-[700px]
        "
      >
        {/* inner gold border line */}
        <div className="absolute inset-3 sm:inset-4 md:inset-5 border border-[#f1d08c] rounded-[16px]" />

        {/* corner decorative PNGs */}
        {/* top-right wave */}
        <img
          src={top}
          alt=""
          className="
            pointer-events-none select-none 
            absolute -top-3 right-0 
            w-40 sm:w-52 md:w-64 lg:w-72
          "
        />
        {/* bottom-left wave */}
        <img
          src={bottom}
          alt=""
          className="
            pointer-events-none select-none 
            absolute bottom-0 -left-6 
            w-44 sm:w-56 md:w-72 lg:w-80
          "
        />

        {/* CONTENT */}
        <div
          className="
            relative z-10 h-full 
            flex flex-col items-center text-center 
            px-6 sm:px-10 md:px-20 lg:px-32 
            pt-12 sm:pt-16 md:pt-20 lg:pt-10 
            pb-12 sm:pb-16 md:pb-10
          "
        >
          {/* heading */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl tracking-[0.2em] md:tracking-[0.28em] text-slate-900 uppercase">
              CERTIFICATE
            </h1>
            <p className="mt-1 text-sm sm:text-base md:text-lg tracking-[0.35em] md:tracking-[0.45em] text-slate-800 uppercase">
              OF COMPLETION
            </p>

            <p className="mt-4 sm:mt-5 md:mt-6 text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.26em] md:tracking-[0.30em] text-[#c59a3d] uppercase">
              THIS IS TO CERTIFY THAT
            </p>
          </div>

          {/* name */}
          <div className="mt-4 sm:mt-6 md:mt-7">
            <p className="text-2xl sm:text-3xl md:text-4xl text-slate-900 italic">
              {studentName}
            </p>
          </div>

          {/* description */}
          <div className="mt-5 sm:mt-6 md:mt-7 max-w-2xl text-xs sm:text-[13px] leading-relaxed text-slate-700">
            <p>
              has successfully completed the{" "}
              <span className="font-semibold">{courseTitle}</span> online
              course, including all required lessons, assignments and final
              assessments. This certificate is awarded in recognition of the
              knowledge and skills demonstrated during the programme, on{" "}
              <span className="font-semibold">{completionDate}</span>.
            </p>

            {certificateId && (
              <p className="mt-4 sm:mt-5 text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.24em] text-slate-500 uppercase">
                CERTIFICATE ID: {certificateId}
              </p>
            )}
          </div>

          {/* gold seal */}
          <div className="mt-8 sm:mt-9 md:mt-10 flex justify-center">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#fbe7aa] via-[#f2c649] to-[#da9c25] flex items-center justify-center shadow-[0_10px_22px_rgba(0,0,0,0.35)]">
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full border-[3px] sm:border-[4px] border-[#f9e9bd] flex items-center justify-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border border-[#f5d37c] flex items-center justify-center">
                  <span className="text-xl sm:text-2xl text-[#b67619]">★</span>
                </div>
              </div>
            </div>
          </div>

          {/* signatures */}
          <div
            className="
              mt-10 sm:mt-11 md:mt-12 
              w-full 
              flex flex-col md:flex-row 
              items-center md:items-end 
              justify-between 
              gap-8 md:gap-0 
              px-4 sm:px-8 md:px-14 
              text-xs
              mb-10
            "
          >
            {/* left signer */}
            <div className="w-full md:w-64 text-center">
              <div className="border-t border-slate-400 mb-2" />
              <p className="tracking-[0.14em] md:tracking-[0.18em] text-slate-900 uppercase text-[10px] sm:text-xs">
                {leftSignerName}
              </p>
              <p className="mt-1 text-[10px] text-[#b6974e]">
                {leftSignerTitle}
              </p>
            </div>

            {/* right signer */}
            <div className="w-full md:w-64 text-center">
              <div className="border-t border-slate-400 mb-2" />
              <p className="tracking-[0.14em] md:tracking-[0.18em] text-slate-900 uppercase text-[10px] sm:text-xs">
                {rightSignerName}
              </p>
              <p className="mt-1 text-[10px] text-[#b6974e]">
                {rightSignerTitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;









