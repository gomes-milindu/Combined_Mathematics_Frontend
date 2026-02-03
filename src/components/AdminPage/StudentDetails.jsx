//

// import React, { useEffect, useState } from "react";

// import axios from "axios";

// export default function StudentDetails() {
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8080/student/").then((response) => {
//       console.log(response.data);
//       setStudents(response.data);
//     });
//   }, []);

//   return (
//     <main className="w-full min-h-screen bg-slate-50 flex justify-center py-10">
//       <div className="">
//         <table>
//           <thead>
//             <tr>
//               <th>Student Id</th>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Contact No:</th>
//               <th>Batch</th>
//               <th>Course</th>
//               <th>Status</th>

//             </tr>
//           </thead>

//           <tbody>

//             {students.map((items)=>(

//               <tr>
//               <td>{items.studentId}</td>
//               <td>{items.firstName}</td>
//               <td>{items.lastName}</td>
//               <td>{items.phone}</td>
//               <td>{items.batch}</td>
//               <td>{items.course}</td>
//               <td>{items.isActive ? "Active" : "Inactive"}</td>

//             </tr>
//             ))}

//           </tbody>
//         </table>
//       </div>
//     </main>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Breadcrumb from "./BreadCrumb";

export default function StudentDetails() {
  const [students, setStudents] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  function loadStudents() {
    axios.get("http://localhost:8080/student/").then((res) => {
      setStudents(res.data);
    });
  }

  const toggleMenu = (index) => {
    setOpenMenuId(openMenuId === index ? null : index);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await axios.delete(`http://localhost:8080/student/${id}`);
      setStudents((prev) => prev.filter((s) => s._id !== id));
      toast.success("Student deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Administration
            </p>
            <h1 className="text-2xl font-semibold text-slate-800">
              Student Management
            </h1>
          </div>
          <Breadcrumb />
        </div>

        <div className="bg-white rounded-2xl shadow-[0_6px_30px_rgba(15,23,42,0.08)] border border-slate-100">
          <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Student List
              </h2>
              <p className="text-sm text-slate-500">
                Overview of registered students and their current status.
              </p>
            </div>
            <Link
              to="/admin/register"
              className="inline-flex items-center justify-center rounded-full bg-purple-600 text-white px-5 py-2 text-sm font-medium shadow hover:bg-slate-800 transition"
            >
              + Add New Student
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr className="text-left">
                  <th className="px-6 py-4 font-medium">Student</th>
                  <th className="px-6 py-4 font-medium">Student ID</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Batch</th>
                  <th className="px-6 py-4 font-medium">Course</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((items, index) => (
                  <tr
                    key={items._id}
                    className="hover:bg-slate-50/70 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
                          {items.firstName?.[0]}
                          {items.lastName?.[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">
                            {items.firstName} {items.lastName}
                          </p>
                          <p className="text-xs text-slate-400">
                            {items.course}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-slate-700">
                      {items.studentId}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {items.phone}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {items.batch}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {items.course}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                          items.isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {items.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right relative">
                      <button
                        onClick={() => toggleMenu(index)}
                        className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
                        aria-label="Open actions"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenuId === index && (
                        <div className="absolute right-6 mt-2 bg-white shadow-lg rounded-xl border border-slate-100 w-44 z-50 overflow-hidden">
                          <Link
                            to={`/admin/students/studentView/${items._id}`}
                            onClick={() => setOpenMenuId(null)}
                            className="block px-4 py-3 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                          >
                            <Eye size={16} />
                            View
                          </Link>

                          <Link
                            to={`/admin/students/studentEdit/${items._id}`}
                            onClick={() => setOpenMenuId(null)}
                            className="block px-4 py-3 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                          >
                            <Edit size={16} />
                            Edit
                          </Link>

                          <button
                            onClick={() => handleDelete(items._id)}
                            className="block w-full text-left px-4 py-3 hover:bg-rose-50 text-rose-600 flex items-center gap-2"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
