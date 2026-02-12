import Slidebar from "../../components/AdminPage/SlideBar";
import TopNav from "../../components/AdminPage/TopNav";
import ViewStudent from "../../components/AdminPage/ViewStudent.jsx";

export default function AdminStudentView() {
  return (
    <>
      <div className="w-full flex bg-red-800">
        <div className="w-[20%] fixed left-0 top-0 h-screen bg-white dark:bg-slate-950">
          <Slidebar />
        </div>

        <div className="w-[80%] ml-[20%] min-h-screen bg-white dark:bg-slate-950">
          <TopNav pageTitle="Student View" />
          <ViewStudent />
        </div>
      </div>
    </>
  );
}
