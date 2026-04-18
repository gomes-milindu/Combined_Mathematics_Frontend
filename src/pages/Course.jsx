import cardData from "../../Data/CourseData";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CourseCard from "../components/HomePage/CourseCard";
import GlassBox from "../components/HomePage/GlassBox";
import NavBar from "../components/NavBar";
import CourseCardSection from "../sections/CoursePage/CourseCardSection";

export default function Course(){
    
    // Card Data in Data Folder
    
    return(
        <>
        <Header
                
                heroTitle="Your Learning"
                heroSubtitle="Journey Starts Here"
            />
        
        
        <NavBar />
        
        <CourseCardSection />
        
        <Footer />
        </>
    )
}