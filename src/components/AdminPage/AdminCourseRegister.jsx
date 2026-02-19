import AddCourse from "./AddCourse";
import Slidebar from "./SlideBar";
import TopNav from "./TopNav";

export default function AdminCourseRegister() {
  return (
    <>
    <div className="w-full flex">
        {/* Sidebar */}
        <div className="w-[20%] fixed left-0 top-0 h-screen bg-transparent">
          <Slidebar />
        </div>

        {/* Right Content */}
        <div className="w-[80%] ml-[20%] min-h-screen bg-white">
          <TopNav pageTitle="Course Register" />
          <AddCourse />
          
         
        </div>
      </div>
    </>
  )
}