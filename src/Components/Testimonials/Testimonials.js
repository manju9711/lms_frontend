// import React from 'react';

// import image1 from './images/1.png';
// import image2 from './images/2.jpg';
// import image3 from './images/3.png';

// const testimonials = [
//   {
//     name: 'Monaym Billah',
//     title: 'Executive @ Themesvila',
//     text: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer',
//     rating: 5,
//     image: image1, 
//   },
//   {
//     name: 'Motasim Billah',
//     title: 'Developer @ Themesvila',
//     text: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer',
//     rating: 5,
//     image: image2, 
//   },
// //   {
// //     name: 'Ekram Hossain',
// //     title: 'Ceo @ Themesvila',
// //     text: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer',
// //     rating: 5,
// //     image: image3, 
// //   },
// ];

// const TestimonialCard = ({ name, title, text, rating, image }) => (
//   <div className="relative bg-white rounded-lg shadow-md p-6 pt-10 w-full max-w-md border">
//     <div className="absolute -top-10 right-6 w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden">
//       <img src={image} alt={name} className="w-full h-full object-cover" />
//     </div>
//     <div className="mt-0">
//       <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
//       <p className="text-sm text-gray-600">{title}</p>
//       <p className="text-sm text-gray-500 mt-2">{text}</p>
//       <div className="mt-3 text-orange-400">
//         {Array.from({ length: rating }).map((_, idx) => (
//           <span key={idx}>★</span>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// const TestimonialsSection = () => (
//   <div className="bg-white py-16 px-4 md:px-20">
//     <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
//       <div>
//         <div className="inline-block bg-[#EF2E73] text-white text-sm px-4 py-2 rounded-full mb-4">
//           Testimonials
//         </div>
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">
//           What Our Students Have To Say
//         </h2>
//         <p className="text-gray-600 mb-6">
//           Lorem ipsum dolor sit amet consectetur adipiscing elit sed eiusmod temporincididunt labore dolore magna aliquaenim minim ve.
//         </p>
//         <div className="flex gap-4">
//           <button className="w-12 h-12 rounded-full bg-[#674CEF] text-white hover:bg-[#EF2E73] text-2xl">←</button>
//           <button className="w-12 h-12 rounded-full bg-[#674CEF] text-white hover:bg-[#EF2E73] text-2xl">→</button>
//         </div>
//       </div>
//       <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
//         {testimonials.map((t, index) => (
//           <TestimonialCard key={index} {...t} />
//         ))}
//       </div>
//     </div>
//   </div>
// );

// export default TestimonialsSection;


//carousel
import React, { useState } from 'react';
import image1 from './images/1.png';
import image2 from './images/2.jpg';
import image3 from './images/3.png';
import image4 from './images/3.png';

const testimonials = [
  {
    name: 'Monaym Billah',
    title: 'Executive @ Themesvila',
    text: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer',
    rating: 5,
    image: image1,
  },
  {
    name: 'Motasim Billah',
    title: 'Developer @ Themesvila',
    text: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer',
    rating: 5,
    image: image2,
  },
  {
    name: 'Ekram Hossain',
    title: 'CEO @ Themesvila',
    text: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer',
    rating: 5,
    image: image3,
  },
  {
    name: 'Zaber Ahmed',
    title: 'Designer @ Themesvila',
    text: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer',
    rating: 5,
    image: image4,
  },
];

const TestimonialCard = ({ name, title, text, rating, image }) => (
  <div className="relative bg-white rounded-xl shadow-md p-6 pt-10 w-full max-w-sm mx-auto border transition-all duration-500">
    <div className="absolute -top-10 right-6 w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-sm text-gray-500 mt-2">{text}</p>
      <div className="mt-3 text-orange-400">
        {Array.from({ length: rating }).map((_, idx) => (
          <span key={idx}>★</span>
        ))}
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const step = 2;

  const handlePrev = () => {
    setIndex((prev) => (prev - step + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + step) % testimonials.length);
  };

  const visibleTestimonials = [
    testimonials[index],
    testimonials[(index + 1) % testimonials.length],
  ];

  return (
    <div className="bg-white py-16 px-4 md:px-20 font-quicksand">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-block bg-[#EF2E73] text-white text-sm px-4 py-2 rounded-full mb-4 ">
            Testimonials
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Students Have To Say
          </h2>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed eiusmod tempor incididunt labore dolore magna aliqua enim minim ve.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-[#674CEF] text-white hover:bg-pink-500 text-2xl"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-[#674CEF] text-white hover:bg-pink-500 text-2xl"
            >
              →
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {visibleTestimonials.map((item, idx) => (
            <TestimonialCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
