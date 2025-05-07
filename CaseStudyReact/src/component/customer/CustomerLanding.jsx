import React from "react";
import { Navbar } from "react-bootstrap";
import CustomerNavbar from "./CustomerNavbar";
import AboutSection from "./CustomerAboutSection";
import CustomerFactsSection from "./CustomerFactsSection";
import Header from "./Header";
import CustomerReasonsSection from "./CustomerReasonsSection";
import InsuranceServices from "./CustomerServicesSection";
import TestimonialsSection from "./CustomerTestimonialSection";
import Footer from "./CustomerFooterSection";
import { useSelector } from "react-redux";
import { selectToken, selectUsername } from "../../store/userSlice";

function CustomerLanding()
{
    const usernameFromRedux=useSelector(selectUsername);
    const tokenFromRedux=useSelector(selectToken);
    console.log(usernameFromRedux,tokenFromRedux);
    return(
        <>
        <Header />
        <AboutSection />
        <CustomerFactsSection/>
        <CustomerReasonsSection/>
        <InsuranceServices />
        <TestimonialsSection />
        <Footer />
        
        </>
    )
}

export default CustomerLanding;