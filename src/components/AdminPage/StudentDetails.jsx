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

export default function StudentDetails() {
  const [students, setStudents] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/student/").then((response) => {
      console.log(response.data);
      setStudents(response.data);
    });
  }, []);

  const toggleMenu = (index) => {
    setOpenMenuId(openMenuId === index ? null : index);
  };

  return (
    <main className="w-full min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-semibold text-gray-800">Student Management</h1>
            <nav className="text-sm text-gray-500">
              <span>Home</span>
              <span className="mx-2">›</span>
              <span className="text-gray-700">Student Management</span>
            </nav>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">Student List</h2>
            <Link to="/admin/register" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
              + Add New Student
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Student Id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Contact No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Batch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((items, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 cursor-move">⠿</span>
                        <input type="checkbox" className="rounded border-gray-300" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-600 font-medium text-sm">
                            {items.firstName?.charAt(0)}{items.lastName?.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {items.firstName} {items.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {items.studentId}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {items.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {items.batch}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {items.course}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                          items.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-200 text-orange-700"
                        }`}
                      >
                        {items.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 relative">
                      <button 
                        onClick={() => toggleMenu(index)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <MoreVertical size={20} />
                      </button>

                      {/* Dropdown Menu */}
                      {openMenuId === index && (
                        <div className="absolute right-8 top-12 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                          <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-purple-50 flex items-center gap-3">
                            <Eye size={16} className="text-gray-500" />
                            View
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-purple-50 flex items-center gap-3">
                            <Edit size={16} className="text-gray-500" />
                            Edit
                          </button>
                          <div className="border-t border-gray-100 my-1"></div>
                          <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
                            <Trash2 size={16} className="text-red-500" />
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

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Rows per page</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
                «
              </button>
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
                ‹
              </button>
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
                ›
              </button>
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
                »
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}



