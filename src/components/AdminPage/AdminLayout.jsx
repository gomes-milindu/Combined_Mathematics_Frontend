import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Slidebar from "./SlideBar";
import TopNav from "./TopNav";

export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const [pageTitle, setPageTitle] = useState("Admin Portal");

    // Map routes to titles
    useEffect(() => {
        const path = location.pathname;
        if (path.includes("/admin/students")) setPageTitle("Student Management");
        else if (path.includes("/admin/course")) setPageTitle("Course Management");
        else if (path.includes("/admin/scan")) setPageTitle("QR Scanner");
        else if (path.includes("/admin/register")) setPageTitle("Registration");
        else if (path.includes("/admin/createAdmin")) setPageTitle("Admin Management");
        else setPageTitle("Dashboard");
    }, [location]);

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
                    }`}
            >
                <Slidebar onClose={() => setIsSidebarOpen(false)} />
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 h-full">
                <TopNav
                    pageTitle={pageTitle}
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
