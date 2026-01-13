import React from "react";

const steps = [
  {
    type: "register",
    title: "Register & Login to Student Account",
    description:
      "Register as a new student and log in to your personal portal. All your courses, enrollment status and live-session updates will be managed from this dashboard.",
  },
  {
    type: "request",
    title: "Enroll & Enter the Live Session Portal",
    description:
      "Choose the course you want to learn and click Enroll. Once enrolled, you’ll be able to access the live session portal for that course and see available batch timings.",
  },
  {
    type: "setup",
    title: "Contact Admin & Confirm Your Batch",
    description:
      "From the live session portal, send a request or message to the admin with your preferred schedule. The admin will review your request, confirm your batch and share the live class details.",
  },
  {
    type: "join",
    title: "Pay for the Course & Join the Live Class",
    description:
      "Complete the course payment securely inside the portal. After payment, the Join Live Class button will be enabled – just click it to enter the Zoom / Google Meet session with your trainer.",
  },
];

// gradient circle icons
const StepIcon = ({ type }) => {
  let gradient = "from-[#f973c5] to-[#a855f7]";
  let icon;

  if (type === "register") {
    gradient = "from-[#f973c5] to-[#fb923c]";
    icon = (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <line x1="9" y1="7" x2="15" y2="7" />
        <line x1="9" y1="11" x2="15" y2="11" />
        <line x1="9" y1="15" x2="13" y2="15" />
      </svg>
    );
  } else if (type === "request") {
    gradient = "from-[#a855f7] to-[#6366f1]";
    icon = (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <line x1="9" y1="3" x2="9" y2="7" />
        <line x1="15" y1="3" x2="15" y2="7" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <rect x="9" y="13" width="3" height="3" rx="0.6" />
      </svg>
    );
  } else if (type === "setup") {
    gradient = "from-[#22c55e] to-[#0ea5e9]";
    icon = (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a1.3 1.3 0 0 1-1 2.1h-1.1a1.7 1.7 0 0 0-1.6 1.1l-.3.9a1.3 1.3 0 0 1-2.4 0l-.3-.9A1.7 1.7 0 0 0 11 19h-1a1.7 1.7 0 0 0-1.6 1.1l-.3.9a1.3 1.3 0 0 1-2.4 0l-.3-.9A1.7 1.7 0 0 0 3.7 19H2.6a1.3 1.3 0 0 1-1-2.1l.1-.1A1.7 1.7 0 0 0 2 15a1.7 1.7 0 0 0-.3-1.8l-.1-.1A1.3 1.3 0 0 1 2.6 11h1.1a1.7 1.7 0 0 0 1.6-1.1l.3-.9a1.3 1.3 0 0 1 2.4 0l.3.9A1.7 1.7 0 0 0 11 11h1a1.7 1.7 0 0 0 1.6-1.1l.3-.9a1.3 1.3 0 0 1 2.4 0l.3.9a1.7 1.7 0 0 0 1.6 1.1h1.1a1.3 1.3 0 0 1 1 2.1l-.1.1A1.7 1.7 0 0 0 19.4 15Z" />
      </svg>
    );
  } else if (type === "join") {
    gradient = "from-[#fb7185] to-[#f97316]";
    icon = (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="6" width="11" height="12" rx="2" />
        <path d="M15 10.5 20 7v10l-5-3.5Z" />
      </svg>
    );
  }

  return (
    <div
      className={`flex items-center justify-center h-10 w-10 md:h-11 md:w-11 rounded-full bg-gradient-to-br ${gradient} shadow-md shadow-[#a855f7]/30 flex-shrink-0`}
    >
      {icon}
    </div>
  );
};

const LiveHowItWorks = () => {
  return (
    <section className="font-quicksand bg-[#fff5ff] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-12">
        {/* LEFT: BIG LIVE SESSION IMAGE CARD */}
        <div className="w-full md:w-1/2 flex justify-center order-2 md:order-1">
          <div className="relative w-full max-w-md lg:max-w-lg">
            <div className="rounded-[40px] border-2 border-dashed border-[#f9c5ff] p-4 md:p-5">
              <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 rounded-[32px] overflow-hidden bg-gradient-to-br from-[#a855f7] via-[#ec4899] to-[#f97316] shadow-lg shadow-[#d1c4ff]/60">
                {/* 👉 replace this src with your own students image file */}
                <img
                  src="https://images.pexels.com/photos/1181371/pexels-photo-1181371.jpeg"
                  alt="Students in live online class"
                  className="w-full h-full object-cover object-center opacity-95"
                />

                {/* subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/15 to-transparent" />

                {/* LIVE badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 shadow-md">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[11px] font-semibold text-slate-900 uppercase tracking-wide">
                    Live Session
                  </span>
                </div>

                {/* bottom info strip */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-white/80">
                      Today · 8:00 PM IST
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-white">
                      React JS Live Coding Class
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center justify-center h-9 w-9 rounded-full bg-white text-[#a855f7] text-xs font-semibold">
                    JOIN
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: STEPS */}
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <p className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#a855f7] mb-2">
            How it works
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            How our live online classes work
          </h2>

          <p className="text-sm md:text-base text-slate-600 max-w-xl">
            To join any live session, students must first register and log in to the student portal. After that you can enroll in your course, contact the admin through the live session portal and complete payment to join the live class.
          </p>

          <div className="mt-8 space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <StepIcon type={step.type} />
                <div>
                  <h3 className="font-semibold text-slate-900 text-base md:text-lg">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveHowItWorks;
