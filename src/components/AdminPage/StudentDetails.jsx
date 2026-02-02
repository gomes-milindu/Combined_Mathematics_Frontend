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
    <main className="w-full min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Student Management
          </h1>
          <Breadcrumb />
        </div>

        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 border-b flex justify-between">
            <h2 className="text-lg font-medium">Student List</h2>
            <Link
              to="/admin/register"
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              + Add New Student
            </Link>
          </div>

          <table className="w-full">
            <tbody>
              {students.map((items, index) => (
                <tr key={items._id} className="border-b">
                  <td className="px-6 py-4">
                    {items.firstName} {items.lastName}
                  </td>

                  <td>{items.studentId}</td>
                  <td>{items.phone}</td>
                  <td>{items.batch}</td>
                  <td>{items.course}</td>

                  <td>{items.isActive ? "Active" : "Inactive"}</td>

                  <td className="relative">
                    <button onClick={() => toggleMenu(index)}>
                      <MoreVertical />
                    </button>

                    {openMenuId === index && (
                      <div className="absolute right-0 bg-white shadow rounded border w-40 z-50">
                        <Link
                          to={`/admin/students/studentView/${items._id}`}
                          onClick={() => setOpenMenuId(null)}
                          className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Eye size={16} />
                          View
                        </Link>

                        <Link
                          to={`/admin/students/studentEdit/${items._id}`}
                          onClick={() => setOpenMenuId(null)}
                          className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Edit size={16} />
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(items._id)}
                          className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2"
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
    </main>
  );
}
