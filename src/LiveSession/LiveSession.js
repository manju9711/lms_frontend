import React from 'react';
import LiveHeader from './LiveHeader/LiveHeader';
import LiveBanner from './LiveBanner/LiveBanner';
import CourseMarquee from './LiveBanner/CourseMarquee';
import LiveHowItWorks from './LiveHowItWorks/LiveHowItWorks';
import Footer from '../Components/Footer/Footer';
import Testimonials from './Testimonials/Testimonials';
import LiveFaqSection from './LiveFaqSection/LiveFaqSection';
import LiveCTA from './LiveCta/LiveCta';



const LiveSession = () => {
    return(
        <>
        <LiveHeader/>
        <LiveBanner/>
        <CourseMarquee/>
        <LiveHowItWorks/>
        <Testimonials/>
        <LiveFaqSection/>
        <LiveCTA/>
        <Footer/>
        </>

    )
}
export default LiveSession;