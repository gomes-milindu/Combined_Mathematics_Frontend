import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Video,
  ScanLine,
  Settings,
  LogOut,
  Moon,
  Sun,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function Slidebar({ onClose }) {
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
    `flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all duration-200 group/link relative
     ${
       isActive
         ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 shadow-sm"
         : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-purple-600 dark:hover:text-purple-300"
     }`;

  const handleLogout = () => {
    setShowSettingsMenu(false);
    if (onClose) onClose();
    // Add logout logic here (clear auth, redirect to login, etc.)
    localStorage.removeItem("authToken"); // Example
    navigate("/");
  };

  const handleLoadAdmins = () => {
    setShowSettingsMenu(false);
    if (onClose) onClose();
    navigate("/admin/createAdmin"); // Navigate to admins page
  };

  const handleToggleMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    localStorage.setItem("admin-theme", nextMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", nextMode);
  };

  return (
    <div className="h-screen bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300 ease-in-out w-64 lg:w-20 lg:hover:w-64 group z-50 overflow-hidden shadow-lg hover:shadow-2xl">
      {/* Logo */}
      <div className="h-24 flex items-center gap-3 px-5 border-b border-slate-100 dark:border-slate-800 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-purple-200 dark:shadow-none shrink-0">
          🎓
        </div>
        <div className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden">
          <h1 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight">
            Tuition Master
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Admin Panel
          </p>
        </div>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2 mt-8 px-3 flex-1 overflow-y-auto overflow-x-hidden">
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 pl-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Menu
        </div>

        {/* Dashboard (exact match) */}
        <NavLink to="/admin" end className={linkClass} onClick={onClose}>
          <div className="min-w-[20px] flex justify-center">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <span className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap delay-75">
            Dashboard
          </span>
        </NavLink>

        <NavLink to="/admin/students" className={linkClass} onClick={onClose}>
          <div className="min-w-[20px] flex justify-center">
            <Users className="w-5 h-5" />
          </div>
          <span className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap delay-75">
            Student Details
          </span>
        </NavLink>

        <NavLink to="/admin/course" className={linkClass} onClick={onClose}>
          <div className="min-w-[20px] flex justify-center">
            <Video className="w-5 h-5" />
          </div>
          <span className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap delay-75">
            Course Details
          </span>
        </NavLink>

        <NavLink to="/admin/scan" className={linkClass} onClick={onClose}>
          <div className="min-w-[20px] flex justify-center">
            <ScanLine className="w-5 h-5" />
          </div>
          <span className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap delay-75">
            Scan Students
          </span>
        </NavLink>
      </div>

      {/* Bottom Settings */}
      <div className="p-3 relative shrink-0">
        <button
          onClick={() => setShowSettingsMenu(!showSettingsMenu)}
          className={`w-full flex items-center gap-3 p-2 rounded-xl font-medium transition-all duration-200 border overflow-hidden ${
            showSettingsMenu
              ? "bg-purple-50 border-purple-200 text-purple-700 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              : "bg-white border-slate-200 text-slate-600 hover:border-purple-200 hover:text-purple-600 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900"
          }`}
        >
          <div className="flex items-center gap-3 shrink-0 justify-center w-full lg:group-hover:w-auto">
            <div
              className={`p-1.5 rounded-lg shrink-0 ${showSettingsMenu ? "bg-purple-200 dark:bg-slate-700" : "bg-slate-100 dark:bg-slate-900"}`}
            >
              <Settings className="w-4 h-4" />
            </div>
            <span className="text-sm opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap absolute left-12 lg:group-hover:static">
              Settings
            </span>
          </div>
          <ChevronRight
            className={`w-4 h-4 ml-auto opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 ${showSettingsMenu ? "-rotate-90" : ""}`}
          />
        </button>

        {/* Settings Dropdown Menu */}
        {showSettingsMenu && (
          <div className="absolute bottom-20 left-6 right-6 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden z-[100] animate-in slide-in-from-bottom-2 fade-in duration-200">
            {/* Load Admins */}
            <NavLink
              to="/admin/createAdmin"
              onClick={handleLoadAdmins}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-800"
            >
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span className="font-medium">Create Admins</span>
            </NavLink>

            {/* Mode Toggle */}
            <button
              onClick={handleToggleMode}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-800"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-orange-400" />
                  <span className="font-medium">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-400" />
                  <span className="font-medium">Dark Mode</span>
                </>
              )}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
