import ClassCard from "../components/ClassesPage/ClassCard"
import Footer from "../components/Footer"
import Header from "../components/Header"
import NavBar from "../components/NavBar"
import Assets from "../data/AssetLinks"
import ClassCardSection from "../sections/ClassPage/ClassCardSection"

function Classes() {
    return (
        <>
            <Header
                backgroundImage={Assets.Hero_Classes}
                heroTitle="Join Our Classes &"
                heroSubtitle="Start Learning Today"
            />
            <NavBar />

            <div className="w-full flex justify-center items-center -mt-8 md:mt-20">
                <ClassCardSection />
            </div>
            <Footer />
        </>
    )
}

export default Classes