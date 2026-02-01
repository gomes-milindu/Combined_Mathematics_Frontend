import ClassCard from "../components/ClassesPage/ClassCard"
import Footer from "../components/Footer"
import Header from "../components/Header"
import NavBar from "../components/NavBar"
import HeaderImage from "../assets/Hero/classCardHeader.jpg"
import ClassCardSection from "../sections/ClassPage/ClassCardSection"

function Classes(){
    return(
        <>
            <Header backgroundImage= "bg-[url(./assets/Hero/classCardHeader.jpg)]"/>
            <NavBar />

            <div className="w-full flex justify-center items-center mt-20">
                <ClassCardSection />
            </div>
            <Footer />
        </>
    )
}

export default Classes