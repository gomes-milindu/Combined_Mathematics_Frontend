import Slidebar from "../components/AdminPage/SlideBar";
import { Outlet, Route, Routes } from "react-router-dom";
import StudentDetails from "../components/AdminPage/StudentDetails";
import Dashboard from "../components/AdminPage/Dashboard";
import StudentRegister from "../components/AdminPage/StudentRegister";


function Admin() {
  return (
    <>
      <div className="flex flex-row">
        <div className="w-[20%]">
          <Slidebar />
        </div>
        
        <div className="w-[80%]">
        
          <Routes path="/">
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentDetails />} />
            <Route path="/register" element={<StudentRegister/>} />
          </Routes>


        </div>
      </div>
    </>
  );
}

export default Admin;
