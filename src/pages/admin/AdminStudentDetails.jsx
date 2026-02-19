import AddCourse from "../../components/AdminPage/AddCourse";
import Slidebar from "../../components/AdminPage/SlideBar";
import StudentDetails from "../../components/AdminPage/StudentDetails";
import TopNav from "../../components/AdminPage/TopNav";

export default function AdminStudentDetails() {
  return (
    <>
      <div className="w-full flex bg-white ">
        {/* Sidebar */}
        <div className="w-[20%] fixed left-0 top-0 h-screen bg-white dark:bg-slate-950">
          <Slidebar />
        </div>

        {/* Right Content */}
        <div className="w-[80%] ml-[20%] min-h-screen bg-white dark:bg-slate-950">
          <TopNav pageTitle="Student Details" />
          <StudentDetails />
         
        </div>
      </div>
    </>
  )
}
