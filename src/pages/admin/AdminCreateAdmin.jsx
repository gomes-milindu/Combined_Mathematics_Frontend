import AdminRegister from "../../components/AdminPage/AdminRegister";
import Slidebar from "../../components/AdminPage/SlideBar";
import TopNav from "../../components/AdminPage/TopNav";

export default function AdminCreateAdmin() {
  return (
    <>
      <div className="w-full flex">
        {/* Sidebar */}
        <div className="w-[20%] fixed left-0 top-0 h-screen bg-white dark:bg-slate-950">
          <Slidebar />
        </div>

        {/* Right Content */}
        <div className="w-[80%] ml-[20%] min-h-screen bg-[#faf9ff] dark:bg-slate-950">
          <TopNav pageTitle="Create Admin" />
          <AdminRegister />
        </div>
      </div>
    </>
  );
}
