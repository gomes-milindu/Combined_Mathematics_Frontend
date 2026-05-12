import { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <div className="w-full absolute z-15 top-5">
                <div className="flex justify-center items-center">
                    {/* Desktop/Tablet - White pill navbar */}
                    <div className="hidden md:flex w-[95%] lg:w-4xl h-[68px] bg-white flex-row items-center justify-around px-4 rounded-[12px]">
                        <Link
                            to="/"
                            className="text-[1.5rem] font-semibold text-[#6941C6]"
                        >
                            Tution Master
                        </Link>

                        {/* Desktop/Tablet nav links */}
                        <div className="flex w-4/12 flex-row items-center justify-around">
                            <Link to="/classes" className="text-[0.9rem] lg:text-[1rem]">Classes</Link>
                            <Link to="/course" className="text-[0.9rem] lg:text-[1rem]">Courses</Link>
                            <Link to="/about" className="text-[0.9rem] lg:text-[1rem]">About</Link>
                            <Link to="/contact" className="text-[0.9rem] lg:text-[1rem]">Contact</Link>
                        </div>

                        {/* Desktop/Tablet login button */}
                        <Link
                            to="/login"
                            className="flex w-[120px] lg:w-[136px] h-9 bg-[#7F56D9] justify-center items-center text-white text-[13px] lg:text-[14px] rounded-lg"
                        >
                            Student Logging
                        </Link>
                    </div>

                    {/* Mobile - Transparent (just hamburger) */}
                    <div className="flex md:hidden w-full h-[60px] flex-row items-center justify-end px-5">
                        <button
                            className="flex flex-col justify-center items-center gap-[5px] w-8 h-8"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span
                                className={`w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""
                                    }`}
                            ></span>
                            <span
                                className={`w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                                    }`}
                            ></span>
                            <span
                                className={`w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
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
          bg-white rounded-2xl shadow-lg
          border border-gray-200
          flex flex-col
          transition-all duration-300 origin-top
          ${menuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}
        `}
            >
                {/* Header of popup */}
                <div className="flex justify-between items-center w-full px-6 py-5 border-b border-gray-100">
                    <span className="text-[#6941C6] font-semibold text-[18px] w-full text-center pl-6">Tuition Master</span>
                    <button onClick={() => setMenuOpen(false)} className="text-[#6941C6]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6m0-6l6 6m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                
                {/* Links */}
                <div className="flex flex-col w-full px-8">
                    <Link to="/" className="text-[14px] text-[#6941C6] py-4 text-center border-b border-gray-100" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/classes" className="text-[14px] text-[#6941C6] py-4 text-center border-b border-gray-100" onClick={() => setMenuOpen(false)}>Classes</Link>
                    <Link to="/events" className="text-[14px] text-[#6941C6] py-4 text-center border-b border-gray-100" onClick={() => setMenuOpen(false)}>Events</Link>
                    <Link to="/gallery" className="text-[14px] text-[#6941C6] py-4 text-center border-b border-gray-100" onClick={() => setMenuOpen(false)}>Gallery</Link>
                    <Link to="/about" className="text-[14px] text-[#6941C6] py-4 text-center border-b border-gray-100" onClick={() => setMenuOpen(false)}>About Us</Link>
                    <Link to="/contact" className="text-[14px] text-[#6941C6] py-4 text-center border-b border-gray-100" onClick={() => setMenuOpen(false)}>Contact Us</Link>
                </div>

                <div className="px-6 py-6 w-full">
                    <Link
                        to="/login"
                        className="w-full h-11 bg-[#7F56D9] flex justify-center items-center text-white rounded-lg font-medium text-[15px]"
                        onClick={() => setMenuOpen(false)}
                    >
                        Student Logging
                    </Link>
                </div>
            </div>
        </>
    );
}

export default NavBar;