import { Outlet, Route, Routes } from "react-router-dom";
import AdminCourseDetails from "./admin/AdminCourseDetails";
import AdminStudentDetails from "./admin/AdminStudentDetails";
import AdminStudentRegister from "./admin/AdminStudentRegister";
import AdminDashboard from "./admin/AdminDashboard";
import AdminCreateAdmin from "./admin/AdminCreateAdmin";
import AdminCourseRegister from "../components/AdminPage/AdminCourseRegister";
import AdminStudentView from "./admin/AdminStudentView";
import AdminStudentEdit from "./admin/AdminStudentEdit";
import AdminScanStudents from "./admin/AdminScanStudents";
import QrScanner from "../components/AdminPage/QrScanner";

function Admin() {
  return (
    <>
      <div className="flex flex-row">
        <div className="w-full">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />

            <Route path="/students" element={<AdminStudentDetails />} />

            <Route path="/register" element={<AdminStudentRegister />} />
            <Route path="/register/*" element={<AdminStudentRegister />} />

            <Route path="/course" element={<AdminCourseDetails />} />
            <Route path="/course/*" element={<AdminCourseRegister />} />

            <Route path="/scan" element={<AdminScanStudents />} />
            <Route path="/scan/*" element={<QrScanner />} />

            <Route path="/createAdmin" element={<AdminCreateAdmin />} />

            <Route
              path="/students/studentView/:id"
              element={<AdminStudentView />}
            />

            {/* ✅ FIXED — matches edit link */}
            <Route
              path="/students/studentEdit/:id"
              element={<AdminStudentEdit />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Admin;
