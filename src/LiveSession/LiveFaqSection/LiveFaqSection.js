import React, { useState } from "react";

const faqs = [
  {
    q: "What does “live online” mean?",
    a: "All students and the instructor join through a live web conference. The class is fully designed and structured for online delivery only – no classroom mix.",
  },
  {
    q: "What kind of courses are offered live online?",
    a: "We offer a wide range of live online courses, including Microsoft, Java, Adobe, Python, Web Development, business skills and more.",
  },
  {
    q: "What happens on the day of class?",
    a: "Your trainer shares their screen, explains concepts, gives you exercises to do on your own computer, and then reviews the answers together with the class.",
  },
  {
    q: "What can I expect from the instructor?",
    a: "Because batches are small, instructors can give personal attention, walk you through exercises, clarify doubts and, with your permission, even view your screen to help you.",
  },
  {
    q: "How will I participate and get help?",
    a: "You can speak to your trainer using your mic/headset or ask questions via chat. If needed, you can share your screen so the trainer can guide you step by step.",
  },
  {
    q: "Do you provide technical support?",
    a: "Yes. If you face any technical issues, our support team is available to help you quickly so you don’t miss your live session.",
  },
];

const LiveFaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex((current) => (current === idx ? -1 : idx));
  };

  return (
    <section className="font-quicksand bg-[#fff5ff] py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#a855f7]">
            FAQ – Live Online Classes
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Clear all your doubts about how our live, instructor-led online
            classes work before you join your first session.
          </p>
        </div>

        {/* FAQ list */}
        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = idx === openIndex;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-sm shadow-[#e5d5ff] border border-[#f3e8ff] overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#a855f7] via-[#ec4899] to-[#f97316] text-white text-sm font-semibold">
                      {idx + 1}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-slate-900">
                      {item.q}
                    </span>
                  </div>
                  <span className="text-[#a855f7] text-xl font-semibold">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm md:text-base text-slate-600 border-t border-[#f3e8ff]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LiveFaqSection;
