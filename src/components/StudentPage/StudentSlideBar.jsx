import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlayCircle,
  CreditCard,
  CalendarCheck,
  MessageSquare,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

export default function StudentSlideBar({ onClose }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTheme = localStorage.getItem("student-theme");
    const shouldUseDark = storedTheme === "dark";
    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all duration-200 group/link relative
     ${isActive
      ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 shadow-sm"
      : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-purple-600 dark:hover:text-purple-300"
    }`;

  const handleLogout = () => {
    if (onClose) onClose();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleToggleMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    localStorage.setItem("student-theme", nextMode ? "dark" : "light");
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
            Student Portal
          </p>
        </div>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2 mt-8 px-3 flex-1 overflow-y-auto overflow-x-hidden">
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 pl-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Menu
        </div>

        <NavLink to="/student" end className={linkClass} onClick={onClose}>
          <div className="min-w-[20px] flex justify-center">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <span className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap delay-75">
            Dashboard
          </span>
        </NavLink>

        <NavLink to="/student/lms" className={linkClass} onClick={onClose}>
          <div className="min-w-[20px] flex justify-center">
            <PlayCircle className="w-5 h-5" />
          </div>
          <span className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap delay-75">
            My Classes
          </span>
        </NavLink>

        <NavLink to="/student/payments" className={linkClass} onClick={onClose}>
          <div className="min-w-[20px] flex justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
          <span className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap delay-75">
            My Payments
          </span>
        </NavLink>

        <NavLink to="/student/attendance" className={linkClass} onClick={onClose}>
          <div className="min-w-[20px] flex justify-center">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <span className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap delay-75">
            Attendance
          </span>
        </NavLink>

        <NavLink to="/student/messages" className={linkClass} onClick={onClose}>
          <div className="min-w-[20px] flex justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap delay-75">
            Messages
          </span>
        </NavLink>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
        <button
          onClick={handleToggleMode}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-all duration-200 mb-2 shadow-sm"
        >
          <div className="min-w-[20px] flex justify-center">
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </div>
          <span className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200 relative overflow-hidden group/btn"
        >
          <div className="absolute inset-0 bg-red-100 dark:bg-red-900/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
          <div className="relative min-w-[20px] flex justify-center">
            <LogOut className="w-5 h-5" />
          </div>
          <span className="relative opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-bold">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}
