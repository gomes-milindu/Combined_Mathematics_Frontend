import { Dashboard } from "../../components/AdminPage/Dashborad";
import Slidebar from "../../components/AdminPage/SlideBar";
import TopNav from "../../components/AdminPage/TopNav";

export default function AdminDashboard() {
  return (
    <>
      <div className="w-full flex">
        {/* Sidebar */}
        <div className="fixed left-0 top-0 h-screen z-50 peer">
          <Slidebar />
        </div>

        {/* Right Content */}
        <div className="w-full lg:ml-20 peer-hover:lg:ml-64 min-h-screen bg-white dark:bg-slate-950 transition-all duration-300 ease-in-out">
          <TopNav pageTitle="Dashboard" />
          <Dashboard />
        </div>
      </div>
    </>
  );
}
