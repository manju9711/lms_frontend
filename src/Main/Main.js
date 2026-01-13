import React from "react";
import Topbar from "../Components/Topbar/Topbar";
import HeroSection from "../Components/Herosection/Herosection";
import TopCategories from "../Components/TopCategories/TopCategories";
import AboutUs from "../Components/AboutUs/AboutUs";
import Courses from "../Components/Courses/Courses";
import WhyChooseUs from "../Components/WhyChooseUs/WhyChooseUs";
import Testimonials from "../Components/Testimonials/Testimonials";
import Instructors from "../Components/Instructors/Instructors";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
// import Register from "../register";


const Main = () =>{
    return(
        <>
        {/* <Register/> */}
        <Topbar/>
        <Header/>
        <HeroSection/>
        <TopCategories/>
        <AboutUs/>
        <Courses/>
        <WhyChooseUs/>
        <Testimonials/>
        <Instructors/>
        <Footer/>

        
        
        </>
    )
}
export default Main;