import React from "react";
import { NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiUsers, FiUserPlus } from "react-icons/fi";
import { MdOutlineVideoSettings } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

export default function Slidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition
     ${
       isActive
         ? "bg-purple-100 text-purple-700"
         : "text-slate-600 hover:bg-purple-50 hover:text-purple-700"
     }`;

  return (
    <div className="w-full h-screen bg-white border-r border-purple-100 flex flex-col">

      {/* Logo */}
      <div className="h-20 flex items-center gap-3 px-6 border-b border-purple-100">
        <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white text-lg font-bold">
          🎓
        </div>
        <h1 className="text-lg font-semibold text-purple-700">
          Tuition Master
        </h1>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2 mt-6 px-4">

        {/* Dashboard (exact match) */}
        <NavLink to="/admin" end className={linkClass}>
          <LuLayoutDashboard className="text-xl" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/students" className={linkClass}>
          <FiUsers className="text-xl" />
          <span>Student Details</span>
        </NavLink>

        <NavLink to="/admin/register" className={linkClass}>
          <FiUserPlus className="text-xl" />
          <span>Student Register</span>
        </NavLink>

        <NavLink to="/admin/course" className={linkClass}>
          <MdOutlineVideoSettings className="text-xl" />
          <span>Course Details</span>
        </NavLink>
      </div>

      {/* Bottom Settings */}
      <div className="mt-auto px-4 pb-6">
        <NavLink to="/admin/settings" className={linkClass}>
          <IoSettingsOutline className="text-xl" />
          <span>Settings</span>
        </NavLink>
      </div>

    </div>
  );
}
