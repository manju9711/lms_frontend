import React from 'react';
import { FaShareAlt } from 'react-icons/fa';

const Instructors = () => {
  const instructors = [
    {
      name: 'Jenny Wilson',
      role: 'Digital Marketer',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Darrell Steward',
      role: 'Designer',
      image: 'https://randomuser.me/api/portraits/men/44.jpg',
    },
    {
      name: 'Ronald Richards',
      role: 'WordPress Developer',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      name: 'Albert Flores',
      role: 'Fitness Trainer',
      image: 'https://randomuser.me/api/portraits/men/76.jpg',
    },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto font-quicksand">
      <div className="text-center mb-10">
        <span className="bg-[#EF2E73] text-white px-4 py-1 rounded-full text-sm font-medium">Instructors</span>
        <h2 className="text-3xl font-bold mt-4">Our Expert Instructors</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {instructors.map((instructor, idx) => (
          <div key={idx} className="relative bg-white rounded-xl overflow-hidden shadow-md group">
            <img src={instructor.image} alt={instructor.name} className="w-full h-72 object-cover" />
            <div className="absolute top-4 right-4 bg-purple-600 text-white p-2 rounded-full cursor-pointer transition group-hover:scale-110">
              <FaShareAlt />
            </div>
            <div className="bg-white p-4 text-center rounded-b-xl shadow -mt-2 relative z-10">
              <h3 className="font-semibold text-lg">{instructor.name}</h3>
              <p className="text-gray-600">{instructor.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Instructors;
