import EditStudent from "../../components/AdminPage/EditStudent";
import Slidebar from "../../components/AdminPage/SlideBar";
import TopNav from "../../components/AdminPage/TopNav";


export default function AdminStudentEdit() {
  return (
    <>
      <div className="w-full flex bg-red-800">
        <div className="w-[20%] fixed left-0 top-0 h-screen bg-white">
          <Slidebar />
        </div>
        <div className="w-[80%] ml-[20%] min-h-screen bg-[#faf9ff]">
          <TopNav pageTitle="Student Edit" />
          <EditStudent />
        </div>
      </div>
    </>
  );
}