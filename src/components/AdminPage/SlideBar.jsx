import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiUsers, FiUserPlus } from "react-icons/fi";
import { MdOutlineQrCodeScanner, MdOutlineVideoSettings } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import {
  FiLogOut,
  FiUsers as FiAdmins,
  FiMoon,
  FiSun,
  FiChevronRight,
} from "react-icons/fi";

export default function Slidebar() {
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTheme = localStorage.getItem("admin-theme");
    const shouldUseDark = storedTheme === "dark";
    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition
     ${
       isActive
         ? "bg-purple-100 text-purple-700"
         : "text-slate-600 hover:bg-purple-50 hover:text-purple-700"
     }`;

  const handleLogout = () => {
    setShowSettingsMenu(false);
    // Add logout logic here (clear auth, redirect to login, etc.)
    localStorage.removeItem("authToken"); // Example
    navigate("/");
  };

  const handleLoadAdmins = () => {
    setShowSettingsMenu(false);
    navigate("/admin/admins"); // Navigate to admins page
  };

  const handleToggleMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    localStorage.setItem("admin-theme", nextMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", nextMode);
  };

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

        {/* <NavLink to="/admin/register" className={linkClass}>
          <FiUserPlus className="text-xl" />
          <span>Student Register</span>
        </NavLink> */}

        <NavLink to="/admin/course" className={linkClass}>
          <MdOutlineVideoSettings className="text-xl" />
          <span>Course Details</span>
        </NavLink>

        <NavLink to="/admin/scan" className={linkClass}>
          <MdOutlineQrCodeScanner className="text-xl" />
          <span>Scan Students</span>
        </NavLink>
      </div>

      {/* Bottom Settings */}
      <div className="mt-auto px-4 pb-6 relative">
        <button
          onClick={() => setShowSettingsMenu(!showSettingsMenu)}
          className="w-full flex items-center justify-between gap-4 px-4 py-3 rounded-xl font-medium transition text-slate-600 hover:bg-purple-50 hover:text-purple-700"
        >
          <div className="flex items-center gap-4">
            <IoSettingsOutline className="text-xl" />
            <span>Settings</span>
          </div>
          <FiChevronRight
            className={`text-xl transition-transform ${showSettingsMenu ? "rotate-90" : ""}`}
          />
        </button>

        {/* Settings Dropdown Menu */}
        {showSettingsMenu && (
          <div className="absolute bottom-16 left-4 right-4 bg-white border border-purple-200 rounded-xl shadow-lg overflow-hidden z-50">
            {/* Load Admins */}
        
              <NavLink to="/admin/createAdmin"
                onClick={handleLoadAdmins}
                className="w-full flex items-center gap-4 px-4 py-3 text-slate-600 hover:bg-purple-50 hover:text-purple-700 transition border-b border-purple-100 last:border-b-0"
              >
                <FiAdmins className="text-lg" />
                <span className="font-medium">Create Admins</span>
             
            </NavLink>

            {/* Logout */}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-3 text-slate-600 hover:bg-purple-50 hover:text-purple-700 transition border-b border-purple-100 last:border-b-0"
            >
              <FiLogOut className="text-lg" />
              <span className="font-medium">Logout</span>
            </button>

            {/* Mode Toggle */}
            <button
              onClick={handleToggleMode}
              className="w-full flex items-center gap-4 px-4 py-3 text-slate-600 hover:bg-purple-50 hover:text-purple-700 transition"
            >
              {isDarkMode ? (
                <>
                  <FiSun className="text-lg" />
                  <span className="font-medium">Light Mode</span>
                </>
              ) : (
                <>
                  <FiMoon className="text-lg" />
                  <span className="font-medium">Dark Mode</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
