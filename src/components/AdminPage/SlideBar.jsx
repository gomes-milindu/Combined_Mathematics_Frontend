import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LuLayoutDashboard } from "react-icons/lu";
import { FiUsers, FiUserPlus } from "react-icons/fi";
import { MdOutlineVideoSettings } from "react-icons/md";
import { PiUploadSimpleBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import StudentDetails from "./StudentDetails";

export default function Slidebar() {
  return (
    <>
    <div className="w-full h-screen border border-[#f9f8fb] flex flex-col items-center bg-[#f9f8fb]">

      {/* Logo Section */}
      <div className="w-full flex justify-center gap-5 items-center h-20 border-b border-slate-200">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
          🎓
        </div>
        <h1 className="text-2xl font-semibold text-slate-700">Tuition Master</h1>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-5 w-full items-center">

        {/* Active Button */}
        <div className="h-12 grid grid-cols-2 justify-items-center place-items-center bg-linear-to-r hover:bg-slate-200  rounded-lg cursor-pointer">
          <LuLayoutDashboard className="text-xl text-slate-600" />
          <Link to="/admin/" className="text-lg text-slate-600">Dashboard</Link>
        </div>

        {/* Normal Buttons */}
        <div className="h-12 grid grid-cols-2 place-items-center justify-items-center hover:bg-slate-200 rounded-lg cursor-pointer">
          <FiUsers className="text-lg text-slate-600" />
          <Link to="/admin/students" className="text-lg text-slate-600">Student Details</Link>
        </div>

        <div className="h-12 grid grid-cols-2 place-items-center justify-items-center hover:bg-slate-200 rounded-lg cursor-pointer transition-colors">
          <FiUserPlus className="text-lg text-slate-600" />
          <Link to="/admin/register" className="text-lg text-slate-600">Student Register</Link>
        </div>
      </div>
        
    </div>

    
    </>
  );
}