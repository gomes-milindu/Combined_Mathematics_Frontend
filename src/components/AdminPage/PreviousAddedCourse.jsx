import { FiEdit2, FiTrash2 } from "react-icons/fi";

import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { Edit, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumb from "./BreadCrumb";
import toast from "react-hot-toast";

export default function PreviousAddedCourse() {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editForm, setEditForm] = useState({
    courseName: "",
    courseCategory: "",
    coursePrice: "",
    courseUrl: "",
    courseDescription: "",
  });

  const fetchCourses = () => {
    api.get("/addcourse/").then((response) => {
      setCourses(response.data);
    });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await api.delete(`/addcourse/${id}`);
      toast.success("Course deleted");
      fetchCourses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const handleEditClick = (course) => {
    setEditingCourse(course._id);
    setEditForm({
      courseName: course.courseName,
      courseCategory: course.courseCategory,
      coursePrice: course.coursePrice,
      courseUrl: course.courseUrl,
      courseDescription: course.courseDescription || "",
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/addcourse/${editingCourse}`, editForm);
      toast.success("Course updated");
      setEditingCourse(null);
      fetchCourses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <>
    <main className="w-full min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Course Management
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage all course records
              </p>
            </div>

            <Breadcrumb />
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">Course List</h2>
            <Link
              to="/admin/course/*"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
            >
              + Add New Course
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
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
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
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
                          course.courseCategory === "Pure Mathematics"
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
                      <a
                        href={course.courseUrl}
                        className="text-sm text-purple-600 hover:underline"
                      >
                        View
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button className="text-gray-400 hover:text-purple-600" onClick={() => handleEditClick(course)}>
                          <Edit size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-red-500" onClick={() => handleDelete(course._id)}>
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

    {/* Edit Modal */}
    {editingCourse && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Edit Course</h3>
            <button onClick={() => setEditingCourse(null)} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Course Name</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" value={editForm.courseName} onChange={(e) => setEditForm({...editForm, courseName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" value={editForm.courseCategory} onChange={(e) => setEditForm({...editForm, courseCategory: e.target.value})}>
                <option value="">Select</option>
                <option value="Applied Mathematics">Applied Mathematics</option>
                <option value="Pure Mathematics">Pure Mathematics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Price</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" value={editForm.coursePrice} onChange={(e) => setEditForm({...editForm, coursePrice: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">URL</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" value={editForm.courseUrl} onChange={(e) => setEditForm({...editForm, courseUrl: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
              <textarea rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none" value={editForm.courseDescription} onChange={(e) => setEditForm({...editForm, courseDescription: e.target.value})} />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setEditingCourse(null)} className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    )}
    </>
  );
}
