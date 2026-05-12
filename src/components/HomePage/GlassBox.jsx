import { useState } from "react";
import { Link } from "react-router-dom";

export default function GlassBox() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ===== DESKTOP/TABLET - Glass pill navbar (unchanged) ===== */}
      <div
        className="
          hidden md:flex
          w-[95%] lg:w-4xl h-[67px]
          flex-row items-center justify-around
          px-4
          rounded-xl
          bg-linear-to-r from-[#F3ECFF]/30 to-white/40
          border border-white/20
          backdrop-blur-lg backdrop-saturate-150
          shadow-[0_8px_20px_rgba(90,52,255,0.08)]
          absolute z-20 top-5
          left-1/2 transform -translate-x-1/2
        "
        style={{ WebkitBackdropFilter: "blur(12px)" }}
      >
        {/* Logo */}
        <Link to="/" className="text-[24px] font-semibold">
          Tution Master
        </Link>

        {/* Nav Links */}
        <div className="flex text-[14px] lg:text-[16px] flex-row items-center justify-between gap-4 lg:gap-6">
          <Link to="/classes">Classes</Link>
          <Link to="/course">Courses</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Login Button */}
        <Link
          to="/login"
          className="flex w-[120px] lg:w-[136px] h-9 bg-[#7F56D9] justify-center items-center text-white text-[13px] lg:text-[14px] rounded-lg"
        >
          Student Logging
        </Link>
      </div>

      {/* ===== MOBILE - Transparent navbar (just hamburger) ===== */}
      <div
        className="
          flex md:hidden
          w-full h-[60px]
          flex-row items-center justify-end
          px-5
          absolute z-20 top-5
          left-0
        "
      >
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

      {/* Mobile Dropdown Menu */}
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