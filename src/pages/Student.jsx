import { Outlet, Route, Routes } from "react-router-dom";
import StudentLayout from "../components/StudentPage/StudentLayout";
import StudentDashboard from "../components/StudentPage/StudentDashboard";

function Student() {
  return (
    <div className="student-scope min-h-screen bg-white text-slate-900">
      <Routes>
        <Route element={<StudentLayout />}>
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Student;
