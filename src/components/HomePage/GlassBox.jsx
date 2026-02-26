import { useState } from "react";
import { Link } from "react-router-dom";

export default function GlassBox() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div
        className="
          w-[90%] md:w-[95%] lg:w-4xl h-[60px] md:h-[67px]
          flex flex-row items-center justify-between md:justify-around
          px-5 md:px-4
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
        <Link to="/" className="text-[18px] md:text-[24px] font-semibold">
          Tution Master
        </Link>

        {/* Desktop/Tablet Nav Links */}
        <div className="hidden md:flex text-[14px] lg:text-[16px] flex-row items-center justify-between gap-4 lg:gap-6">
          <Link to="/classes">Classes</Link>
          <Link to="/course">Courses</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Desktop/Tablet Login Button */}
        <Link
          to="/login"
          className="hidden md:flex w-[120px] lg:w-[136px] h-9 bg-[#7F56D9] justify-center items-center text-white text-[13px] lg:text-[14px] rounded-lg"
        >
          Student Logging
        </Link>

        {/* Mobile Hamburger Button */}
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

      {/* Mobile Dropdown Menu */}
      <div
        className={`
          md:hidden fixed z-50 top-[80px] left-1/2 -translate-x-1/2 w-[90%]
          bg-white/95 backdrop-blur-lg rounded-xl shadow-lg
          border border-white/30
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