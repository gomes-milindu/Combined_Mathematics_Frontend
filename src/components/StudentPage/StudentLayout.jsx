import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import StudentSlideBar from "./StudentSlideBar";
import StudentTopNav from "./StudentTopNav";

export default function StudentLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("Student Portal");

  useEffect(() => {
    setPageTitle("Student Dashboard");
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
        <StudentSlideBar onClose={() => setIsSidebarOpen(false)} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full ml-0 lg:ml-20 peer-hover:lg:ml-64 transition-all duration-300 ease-in-out">
        <StudentTopNav
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
