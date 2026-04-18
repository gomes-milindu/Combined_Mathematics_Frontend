// import { Link } from "react-router-dom"

// function NavBar(){
//     return(
//         <>  
//             <div className="w-full absolute z-15 top-5">
//                 <div className="flex justify-center items-center">
//                     <div className="w-4xl h-[68px] bg-white flex flex-row items-center justify-around rounded-[12px]">
//                         <Link to="/" className="text-[1.5rem] font-semibold text-[#6941C6]">Tution Master</Link>
//                         <div className="w-4/12 flex flex-row items-center justify-around">
//                             <Link to="/classes" className="text-[1rem]">Classes</Link>
//                             <Link to="/course" className="text-[1rem]">Courses</Link>
//                             <Link to="/about" className="text-[1rem]">About</Link>
//                             <Link to="/contact" className="text-[1rem]">Contact</Link>

//                         </div>
//                         <Link to="/login" className="w-[136px] h-9 bg-[#7F56D9] flex justify-center items-center text-white rounded-lg">Student Logging</Link>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default NavBar

import { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <div className="w-full absolute z-15 top-5">
                <div className="flex justify-center items-center">
                    <div className="w-[90%] md:w-[95%] lg:w-4xl h-[60px] md:h-[68px] bg-white flex flex-row items-center justify-between md:justify-around px-5 md:px-4 rounded-[12px]">
                        <Link
                            to="/"
                            className="text-[1.2rem] md:text-[1.5rem] font-semibold text-[#6941C6]"
                        >
                            Tution Master
                        </Link>

                        {/* Desktop/Tablet nav links */}
                        <div className="hidden md:flex w-4/12 flex-row items-center justify-around">
                            <Link to="/classes" className="text-[0.9rem] lg:text-[1rem]">Classes</Link>
                            <Link to="/course" className="text-[0.9rem] lg:text-[1rem]">Courses</Link>
                            <Link to="/about" className="text-[0.9rem] lg:text-[1rem]">About</Link>
                            <Link to="/contact" className="text-[0.9rem] lg:text-[1rem]">Contact</Link>
                        </div>

                        {/* Desktop/Tablet login button */}
                        <Link
                            to="/login"
                            className="hidden md:flex w-[120px] lg:w-[136px] h-9 bg-[#7F56D9] justify-center items-center text-white text-[13px] lg:text-[14px] rounded-lg"
                        >
                            Student Logging
                        </Link>

                        {/* Mobile hamburger */}
                        <button
                            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span
                                className={`w-5 h-[2px] bg-gray-800 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""
                                    }`}
                            ></span>
                            <span
                                className={`w-5 h-[2px] bg-gray-800 transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                                    }`}
                            ></span>
                            <span
                                className={`w-5 h-[2px] bg-gray-800 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                                    }`}
                            ></span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile dropdown */}
            <div
                className={`
          md:hidden fixed z-50 top-[80px] left-1/2 -translate-x-1/2 w-[90%]
          bg-white/95 backdrop-blur-lg rounded-xl shadow-lg
          border border-gray-200
          flex flex-col items-center gap-3 py-5
          transition-all duration-300 origin-top
          ${menuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}
        `}
            >
                <Link to="/classes" className="text-[16px] py-2" onClick={() => setMenuOpen(false)}>Classes</Link>
                <Link to="/course" className="text-[16px] py-2" onClick={() => setMenuOpen(false)}>Courses</Link>
                <Link to="/about" className="text-[16px] py-2" onClick={() => setMenuOpen(false)}>About</Link>
                <Link to="/contact" className="text-[16px] py-2" onClick={() => setMenuOpen(false)}>Contact</Link>
                <Link
                    to="/login"
                    className="w-[80%] h-10 bg-[#7F56D9] flex justify-center items-center text-white rounded-lg mt-2"
                    onClick={() => setMenuOpen(false)}
                >
                    Student Logging
                </Link>
            </div>
        </>
    );
}

export default NavBar;