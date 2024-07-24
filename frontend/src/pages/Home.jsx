import Navbar from "../components/Navbar"
import { useState, useEffect } from "react";
import api from "../api";
import Banner from "../components/Banner.jsx"
import Footer from "../components/Footer.jsx";
import About from "../components/About.jsx";

function Home() {

    return (
        <>
        <Navbar />
        <Banner />
        <About />
        <Footer />
        
        </>
    
    )
}
export default Home