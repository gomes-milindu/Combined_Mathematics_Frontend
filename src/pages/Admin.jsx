import { Outlet, Route, Routes } from "react-router-dom";
import AdminStudentRegister from "./admin/AdminStudentRegister";
import AdminCreateAdmin from "./admin/AdminCreateAdmin";
import AdminStudentView from "./admin/AdminStudentView";
// import AdminStudentEdit from "./admin/AdminStudentEdit";
import EditStudent from "../components/AdminPage/EditStudent";
import AdminScanStudents from "./admin/AdminScanStudents";
import QrScanner from "../components/AdminPage/QrScanner";
import { Dashboard } from "../components/AdminPage/Dashborad";
import AdminLayout from "../components/AdminPage/AdminLayout";
import StudentDetails from "../components/AdminPage/StudentDetails";
import AddCourse from "../components/AdminPage/AddCourse";
import PreviousAddedCourse from "../components/AdminPage/PreviousAddedCourse";
import UnderDevelopment from "../components/AdminPage/UnderDevelopment";
import PricingManagement from "../components/AdminPage/PricingManagement";

function Admin() {
  return (
    <>
      <div className="admin-scope min-h-screen bg-white text-slate-900">
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/students" element={<StudentDetails />} />

            <Route path="/register" element={<AdminStudentRegister />} />
            <Route path="/register/*" element={<AdminStudentRegister />} />

            <Route path="/course" element={<UnderDevelopment />} />
            {/* Note: AdminCourseRegister wrapped AddCourse. Direct use: */}
            <Route path="/course/*" element={<AddCourse />} />

            <Route path="/pricing" element={<PricingManagement />} />

            <Route path="/scan" element={<AdminScanStudents />} />
            <Route path="/scan/*" element={<QrScanner />} />

            <Route path="/createAdmin" element={<AdminCreateAdmin />} />

            <Route
              path="/students/studentView/:id"
              element={<AdminStudentView />}
            />

            <Route path="/students/studentEdit/:id" element={<EditStudent />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default Admin;
