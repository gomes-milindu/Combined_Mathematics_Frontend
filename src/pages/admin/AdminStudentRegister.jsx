import Slidebar from "../../components/AdminPage/SlideBar";
import StudentRegister from "../../components/AdminPage/StudentRegister";
import TopNav from "../../components/AdminPage/TopNav";

export default function AdminStudentRegister() {
  return (
    <>
    <div className="w-full flex">
        {/* Sidebar */}
        <div className="w-[20%] fixed left-0 top-0 h-screen bg-transparent">
          <Slidebar />
        </div>

        {/* Right Content */}
        <div className="w-[80%] ml-[20%] min-h-screen bg-white">
          <TopNav pageTitle="Student Register" />
          <StudentRegister />
          
         
        </div>
      </div>
    </>
  )
}