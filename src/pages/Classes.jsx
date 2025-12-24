import Footer from "../components/Footer"
import Header from "../components/Header"
import NavBar from "../components/NavBar"

function Classes(){
    return(
        <>
            <Header />
            <NavBar />

            <div className="w-full h-[800px] flex justify-center items-center text-4xl">
                <h1>This is Classes Page</h1>
            </div>
            <Footer />
        </>
    )
}

export default Classes