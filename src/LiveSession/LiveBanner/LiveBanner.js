import React from "react";
import { useNavigate } from "react-router-dom";

const LiveBanner = () => {
   const navigate = useNavigate();
  const handleContact = () =>{
    navigate('/LiveContactForm');
  }
  return (
    <section className="bg-[#fff5ff] pt-10 md:pt-16 pb-16 font-quicksand">
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* LEFT: TEXT SIDE */}
        <div className="space-y-6">
          <p className="inline-flex items-center text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#a855f7] bg-white/70 px-4 py-1 rounded-full shadow-sm">
            Live Session Software Training
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">
            Develop your skills
            <br className="hidden sm:block" /> in a{" "}
            <span className="text-[#a855f7]">live &amp; interactive</span> way
          </h1>

          <p className="text-sm md:text-base text-slate-600 max-w-xl">
            Join our live online classes for Frontend, Backend, Full-Stack and
            other software courses. Learn with real-time coding, doubt-clearing,
            recordings access and mentor support – all from your home.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-wrap items-center gap-4">
            <button 
            className="px-6 py-3 rounded-full text-sm md:text-base font-semibold text-white bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#f97316] shadow-lg shadow-[#a855f7]/40 hover:translate-y-0.5 hover:shadow-xl transition"
            onClick={handleContact}
            >
              Contact Now – Join Live Batch
            </button>

            <button className="inline-flex items-center gap-2 text-sm md:text-base font-semibold text-[#a855f7] hover:text-[#7c3aed]">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4e4ff] shadow-sm">
                ▶
              </span>
              Watch Demo Class
            </button>
          </div>

          {/* SMALL INFO TEXT */}
          <div className="flex flex-wrap gap-4 text-xs md:text-sm text-slate-500">
            <span>✅ Live Zoom / Google Meet classes</span>
            <span>✅ Lifetime access to recordings</span>
            <span>✅ 1-to-1 doubt support</span>
          </div>
        </div>

        {/* RIGHT: IMAGE / CARDS SIDE */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-sm md:max-w-md h-72 sm:h-80 md:h-[340px]">
            {/* Dotted circle behind */}
            <div className="absolute -top-4 right-4 sm:right-8 w-48 sm:w-60 h-48 sm:h-60 rounded-full border-4 border-dashed border-[#f9c5ff]" />

            {/* Solid purple circle */}
            <div className="absolute top-0 right-6 sm:right-10 w-44 sm:w-56 h-44 sm:h-56 rounded-full bg-[#e2d4ff]" />

            {/* Student image */}
            <img
              src="https://images.purevpn-tools.com/wp-content/uploads/en/2025/09/How-to-Select-the-Right-VPN-Deal-02-1.png"
              alt="Live software training"
              className="absolute bottom-0 right-8 sm:right-12 h-52 sm:h-60 md:h-64 object-contain drop-shadow-xl z-20"
            />

            {/* Floating card: 50+ Online Courses (top-left of circle) – desktop/tablet only */}
            <div className="hidden sm:block absolute top-4 right-48 lg:right-60 z-30">
              <div className="flex items-center gap-3 rounded-2xl bg-white shadow-lg px-4 py-3 text-xs md:text-sm">
                <div className="h-8 w-8 rounded-full bg-[#f4e4ff] flex items-center justify-center text-[#a855f7] text-base font-bold">
                  🎓
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">
                    Online Courses
                  </p>
                  <p className="font-semibold text-slate-800">50+ Batches</p>
                </div>
              </div>
            </div>

            {/* Floating card: 10k+ Online Students (top-right) – desktop/tablet only */}
            <div className="hidden sm:block absolute top-10 -right-8 z-30">
              <div className="rounded-2xl bg-white shadow-lg px-4 py-3 text-xs md:text-sm">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  Online Students
                </p>
                <p className="font-semibold text-slate-800">10k+ Learners</p>
                <div className="mt-2 flex -space-x-2">
                  <span className="h-7 w-7 rounded-full bg-[#fde68a] border-2 border-white" />
                  <span className="h-7 w-7 rounded-full bg-[#a855f7] border-2 border-white" />
                  <span className="h-7 w-7 rounded-full bg-[#ec4899] border-2 border-white" />
                  <span className="h-7 w-7 rounded-full bg-slate-900 border-2 border-white text-[10px] flex items-center justify-center text-white">
                    +9k
                  </span>
                </div>
              </div>
            </div>

            {/* Floating card: React JS Live Class (bottom) – always visible */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 z-30">
              <div className="flex items-center gap-3 rounded-2xl bg-white shadow-lg px-4 py-3 text-xs md:text-sm">
                <div className="h-9 w-9 rounded-full overflow-hidden bg-slate-200" />
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">
                    Today at 8:00 PM
                  </p>
                  <p className="font-semibold text-slate-800">
                    React JS Live Class
                  </p>
                  <button className="mt-1 inline-flex items-center rounded-full bg-[#a855f7] px-3 py-1 text-[11px] font-semibold text-white">
                    Join now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveBanner;


