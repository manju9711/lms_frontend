import React from "react";
import { useNavigate } from "react-router-dom";

const LiveCTA = () => {
  const navigate = useNavigate();
  const handleContact = () =>{
    navigate('/LiveContactForm');
  }
  return (
    <>  
      <section className="font-quicksand bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#f97316] py-14 md:py-16">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* big white rounded container (back layer) */}
        <div className="bg-[#fdfbff] rounded-[40px] md:rounded-[52px] py-10 md:py-12 flex justify-center shadow-lg shadow-black/10">
          {/* gradient card (front layer) */}
          <div className="w-full max-w-2xl bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#f97316] rounded-[30px] md:rounded-[36px] px-6 md:px-10 py-8 md:py-9 text-center text-white shadow-xl shadow-[#c4b5fd]/60">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
              Let us know about your training needs.
            </h2>

            <p className="mt-3 text-xs sm:text-sm md:text-base text-white/90">
              Let us help you find the perfect training for you or your team.
              Our experts are ready to help.
            </p>

            {/* button + phone (like subscribe row) */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button 
              className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 rounded-[999px] bg-white text-[#a855f7] font-semibold text-sm md:text-base shadow-md hover:bg-slate-50 transition"
              onClick={handleContact}>
                Contact Us
              </button>

              <div className="w-full sm:w-auto flex items-center justify-center text-sm md:text-base font-medium text-white">
                <span>1-877-932-8228</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default LiveCTA;
