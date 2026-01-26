import { Link } from "react-router-dom"

function NavBar(){
    return(
        <>  
            <div className="w-full absolute z-15 top-5">
                <div className="flex justify-center items-center">
                    <div className="w-10/12 h-[68px] bg-white flex flex-row items-center justify-around rounded-[12px]">
                        <Link to="/" className="text-[1.5rem] font-semibold text-[#6941C6]">Tution Master</Link>
                        <div className="w-4/12 flex flex-row items-center justify-around">
                            <Link to="/classes" className="text-[1rem]">Classes</Link>
                            <Link to="/course" className="text-[1rem]">Courses</Link>
                            <Link to="/about" className="text-[1rem]">About</Link>
                            <Link to="/contact" className="text-[1rem]">Contact</Link>

                        </div>
                        <div className="">Student Login</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar