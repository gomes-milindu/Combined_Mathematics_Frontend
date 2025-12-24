import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function GlassBox() {
  
  
  return (
    <div
      className="
        w-7xl h-[67px]
        flex
        flex-row
        items-center
        justify-evenly
        rounded-xl
        bg-linear-to-r from-[#F3ECFF]/30 to-white/40
        border border-white/20
        backdrop-blur-lg backdrop-saturate-150
        shadow-[0_8px_20px_rgba(90,52,255,0.08)]
        absolute
        z-20
        top-5
        left-1/12
      "
      style={{ WebkitBackdropFilter: "blur(12px)" }}
    >

      
        <Link to="/" className="text-[24px]">Tution Master</Link>
        <div className="text-[16px] flex flex-row items-center justify-between gap-6">
          <Link to="/classes" className="">Classes</Link>
          <Link to="/course" className="">Courses</Link>
          <div className="/about">About</div>
          <div className="/contactus">Contact</div>
        </div>
        <Link to="/admin" className="w-[136px] h-9 bg-[#7F56D9] flex justify-center items-center text-white rounded-lg">Student Logging</Link>
      </div>
    
  );
}