import ClassCard from "../components/ClassesPage/ClassCard"
import Footer from "../components/Footer"
import Header from "../components/Header"
import NavBar from "../components/NavBar"

import ClassCardSection from "../sections/ClassPage/ClassCardSection"

function Classes(){
    return(
        <>
            <Header bgImage= "https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/Classes%20Page/classCardHeader.jpg"/>
            <NavBar />

            <div className="w-full flex justify-center items-center mt-20">
                <ClassCardSection />
            </div>
            <Footer />
        </>
    )
}

export default Classes