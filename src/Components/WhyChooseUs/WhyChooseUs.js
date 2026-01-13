import React from "react";
import whyImage from "./images/why-image.jpg";
import img1 from "./images/1.png";
import img2 from "./images/2.jpg";
import img3 from "./images/3.png";
import img4 from "./images/4.webp";
import phone from './images/phone.jpeg';

const features = [
  {
    id: 1,
    image: img1,
    title: "World Class Instructors",
    desc: "We are passionate about education and dedicated",
  },
  {
    id: 2,
    image: img2,
    title: "Video Classes",
    desc: "We are passionate about education and dedicated",
  },
  {
    id: 3,
    image: img3,
    title: "Online Courses",
    desc: "We are passionate about education and dedicated",
  },
  {
    id: 4,
    image: img4,
    title: "24/7 Support",
    desc: "We are passionate about education and dedicated",
  },
];

export default function WhyChooseUs() {
  return (
    <div className="max-w-7xl mx-auto sm:py-16 py-0 px-4 grid md:grid-cols-2 gap-12 items-center font-quicksand">
      {/* Left Section */}
      <div>
        <div className="mb-4">
          <span className="bg-[#EF2E73] text-white text-sm font-medium px-4 py-1 rounded-full">
            Why Choose Us
          </span>
        </div>
        <h2 className="sm:text-3xl text-2xl  font-bold text-gray-900 leading-snug mb-10">
          Transform education your Life, <br /> Change the World
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group border rounded-xl p-5 bg-white shadow transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <img src={feature.image} alt="" className="w-8 h-8 object-contain" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="relative">
        <img
          src={whyImage}
          alt="student"
          className="rounded-2xl w-full object-cover"
        />
        <div className="absolute bottom-6 left-6 bg-white shadow-lg rounded-lg px-4 py-3 flex items-center gap-3">
          <img
            src={phone}
            alt="phone"
            className="w-10 h-10 text-orange-500"
          />
          <span className="text-gray-700 font-medium">Call : +91 8790657843</span>
        </div>
      </div>
    </div>
  );
}
