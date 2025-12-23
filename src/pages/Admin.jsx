
import { Outlet, Route, Routes } from "react-router-dom";

import AdminCourseDetails from "./admin/AdminCourseDetails";
import AdminStudentDetails from "./admin/AdminStudentDetails";
import AdminStudentRegister from "../components/AdminPage/AdminStudentRegister";
import AdminDashboard from "./admin/AdminDashboard";




function Admin() {
  return (
    <>
      <div className="flex flex-row">
        {/* <div className="w-[20%] fixed">
          <Slidebar />
        </div> */}
        
        <div className="w-full">
        
          <Routes path="/">
            <Route path="/"  element={<AdminDashboard />} />
            <Route path="/students" element={<AdminStudentDetails />} />
            <Route path="/register" element={<AdminStudentRegister />} />
            <Route path="/register/*" element={<AdminStudentRegister />} />
            <Route path="/course" element={<AdminCourseDetails />} />
          </Routes>


        </div>
      </div>
    </>
  );
}

export default Admin;
