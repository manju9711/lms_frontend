import React from "react";

const marqueeStyles = `
@keyframes marquee-scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.marquee-track {
  animation: marquee-scroll 20s linear infinite;
}

/* optional: pause on hover */
.marquee-track:hover {
  animation-play-state: paused;
}
`;

const courses = [
  "React JS Live",
  "Node.js Backend",
  "Full-Stack MERN",
  "Python for Data Science",
  "UI/UX Design",
  "DevOps & AWS",
  "Java Spring Boot",
  "DSA with Java",
];

const CourseMarquee = () => {
  return (
    <>
      {/* local CSS for this component */}
      <style>{marqueeStyles}</style>

      <section className="font-quicksand bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#f97316]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="overflow-hidden py-3 sm:py-4">
            <div className="marquee-track flex items-center gap-10 sm:gap-14 whitespace-nowrap">
              {courses.map((course, i) => (
                <span
                  key={i}
                  className="text-white/90 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide"
                >
                  {course}
                </span>
              ))}
              {/* duplicate for seamless loop */}
              {courses.map((course, i) => (
                <span
                  key={`dup-${i}`}
                  className="text-white/90 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseMarquee;
