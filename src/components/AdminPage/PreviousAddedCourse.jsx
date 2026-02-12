import { FiEdit2, FiTrash2 } from "react-icons/fi";


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumb from "./BreadCrumb";

export default function PreviousAddedCourse() {
  const [courses, setCourses] = useState([
   
  ]);

   useEffect(() => {
    axios.get("http://localhost:8080/addcourse/").then((response) => {
      console.log(response.data);
      setCourses(response.data);
    });
  }, []);

  return (
    <main className="w-full min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Course Management</h1>
              <p className="text-sm text-gray-500 mt-1">Manage all course records</p>
            </div>

            <Breadcrumb />
            
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Table Header */}
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">Course List</h2>
            <Link to="/admin/course/*" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
              + Add New Course
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Link
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course, index) => (
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
                            {course.courseName?.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {course.courseName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                          course.category === "Pure Mathematics"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {course.courseCategory}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Rs. {course.coursePrice}
                    </td>
                    <td className="px-6 py-4">
                      <a href={course.courseUrl} className="text-sm text-purple-600 hover:underline">
                        View
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button className="text-gray-400 hover:text-purple-600">
                          <Edit size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-red-500">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
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
