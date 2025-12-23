import rect6 from "../assets/Footer/Rectangle 6.png"
import rect7 from "../assets/Footer/Rectangle 7.png"
function Footer(){
    return(
        <>
        <section className="relative w-full h-[530px]">
            <div className="w-full h-full bg-cover bg-no-repeat" style={{backgroundImage: `url(${rect6})`}}>
                 <div className="w-full h-full bg-cover absolute z-1 bg-no-repeat right-0 top-0" style={{backgroundImage: `url(${rect7})`}}></div>
                 <div className="w-full h-[415px] bottom-0 bg-gray-900 absolute z-2 " ></div>
            </div>
           

        </section>
        </>
    )
}

export default Footer