import { Dashboard } from "../../components/AdminPage/Dashborad";
import Slidebar from "../../components/AdminPage/SlideBar";
import TopNav from "../../components/AdminPage/TopNav";

export default function AdminDashboard() {
  return (
    <>
      <div className="w-full flex">
        {/* Sidebar */}
        <div className="w-[20%] fixed left-0 top-0 h-screen bg-white">
          <Slidebar />
        </div>

        {/* Right Content */}
        <div className="w-[80%] ml-[20%] min-h-screen bg-white">
          <TopNav pageTitle="Dashboard" />
          <Dashboard />
        </div>
      </div>
    </>
  );
}
