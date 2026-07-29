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
    else if (path.includes("/admin/pricing")) setPageTitle("Pricing Management");
    else if (path.includes("/admin/scan")) setPageTitle("QR Scanner");
    else if (path.includes("/admin/register")) setPageTitle("Registration");
    else if (path.includes("/admin/createAdmin"))
      setPageTitle("Admin Management");
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
        className={`fixed inset-y-0 left-0 z-50 w-auto bg-transparent transform transition-transform duration-300 ease-in-out lg:translate-x-0 peer ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Slidebar onClose={() => setIsSidebarOpen(false)} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full ml-0 lg:ml-20 peer-hover:lg:ml-64 transition-all duration-300 ease-in-out">
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
