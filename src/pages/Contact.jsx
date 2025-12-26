import Footer from "../components/Footer"
import Header from "../components/Header"
import NavBar from "../components/NavBar"

function Contact(){
    return(
        <>
            <Header />
            <NavBar />
            <div className="w-full h-[600px] flex justify-center items-center">
                <h1 className="text-4xl">This is Contact Page</h1>
            </div>
            <Footer />
        </>
    )
}

export default Contact