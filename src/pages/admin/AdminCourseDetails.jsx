import AddCourse from "../../components/AdminPage/AddCourse";
import CourseDetails from "../../components/AdminPage/AddCourse";
import PreviousAddedCourse from "../../components/AdminPage/PreviousAddedCourse";
import Slidebar from "../../components/AdminPage/SlideBar";
import TopNav from "../../components/AdminPage/TopNav";

export default function AdminCourseDetails() {
  return (
    <>
      <div className="w-full flex">
        {/* Sidebar */}
        <div className="w-[20%] fixed left-0 top-0 h-screen bg-white dark:bg-slate-950">
          <Slidebar />
        </div>

        {/* Right Content */}
        <div className="w-[80%] ml-[20%] min-h-screen bg-white dark:bg-slate-950">
          <TopNav pageTitle="Course Details" />
          
          <PreviousAddedCourse />
        </div>
      </div>
    </>
  );
}
