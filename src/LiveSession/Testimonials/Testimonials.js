import React, { useState } from "react";

const testimonials = [
  {
    name: "Alexa Rodriguez",
    role: "Web Developer",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    text: "Enrolling in courses at this eLearning platform was a game-changer for me. Absolutely transformative experience!",
    rating: 5,
  },
  {
    name: "Emily Chen",
    role: "UI/UX Designer",
    avatar:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    text: "Exceptional courses! The practical insights and flexible learning structure have been instrumental in my professional growth.",
    rating: 5,
  },
  {
    name: "James Johnson",
    role: "Data Engineer",
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    text: "Highly recommend! The personalised feedback and real-world projects really boosted my confidence in applying new skills.",
    rating: 5,
  },
  {
    name: "Sara Ahmed",
    role: "Full-Stack Developer",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    text: "Live sessions + recordings combo is perfect. I can attend, ask doubts and still rewatch everything at my own pace.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Mobile App Developer",
    avatar:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    text: "Mentors are very supportive. The way they explain concepts and review code has helped me crack multiple interviews.",
    rating: 5,
  },
];

const StarRow = ({ count }) => (
  <div className="flex gap-0.5 mt-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        viewBox="0 0 20 20"
        className={`h-3.5 w-3.5 ${
          i < count ? "text-[#fbbf24]" : "text-gray-300"
        }`}
        fill="currentColor"
      >
        <path d="M10 1.5 12.6 7l6 .5-4.5 3.8 1.4 5.8L10 13.9 4.5 17.1 5.9 11.3 1.4 7.5l6-.5L10 1.5z" />
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  // show 3 cards like design
  const visibleIndexes = [
    current,
    (current + 1) % total,
    (current + 2) % total,
  ];

  const formatIndex = (i) => String(i).padStart(2, "0");

  return (
    <section className="font-quicksand bg-gradient-to-b from-[#a855f7] via-[#ec4899] to-[#f97316] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6 text-center text-white">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Student&apos;s Testimonials
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-sm md:text-base text-white/80">
          Here&apos;s what our students have to say about their live learning
          experience – real stories, real growth. See how our courses have
          helped them upgrade their careers.
        </p>

        {/* Cards */}
        <div className="mt-10 grid gap-5 md:gap-6 md:grid-cols-3">
          {visibleIndexes.map((idx) => {
            const t = testimonials[idx];
            return (
              <article
                key={idx}
                className="bg-white text-slate-800 rounded-3xl px-5 py-6 md:px-6 md:py-7 shadow-xl shadow-black/10 flex flex-col items-start"
              >
                {/* top: avatar + name/role */}
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-purple-200"
                  />
                  <div className="text-left">
                    <h3 className="text-sm md:text-base font-semibold text-[#7c3aed]">
                      {t.name}
                    </h3>
                    <p className="text-[11px] md:text-xs text-slate-500">
                      {t.role}
                    </p>
                    <StarRow count={t.rating} />
                  </div>
                </div>

                {/* text */}
                <p className="mt-4 text-sm md:text-[15px] text-slate-600 text-left leading-relaxed">
                  {t.text}
                </p>
              </article>
            );
          })}
        </div>

        {/* Pagination + arrows */}
        <div className="mt-8 flex items-center justify-center gap-6 text-white/90">
          <button
            onClick={prev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 hover:bg-white/10 transition"
            aria-label="Previous testimonial"
          >
            <span className="text-lg">&lt;</span>
          </button>

          <span className="text-sm md:text-base font-medium">
            {formatIndex(current + 1)}/{formatIndex(total)}
          </span>

          <button
            onClick={next}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 hover:bg-white/10 transition"
            aria-label="Next testimonial"
          >
            <span className="text-lg">&gt;</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
