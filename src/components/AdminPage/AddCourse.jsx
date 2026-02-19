import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import toast from "react-hot-toast";
import axios from "axios";
import Breadcrumb from "./BreadCrumb";

export default function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseUrl, setCourseURL] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [role, setRole] = useState("admin");
  const navigate = useNavigate();

  async function Create() {
    try {
      await axios.post("http://localhost:8080/addcourse/", {
        courseName,
        courseCategory,
        coursePrice,
        courseUrl,
        courseDescription,
      });

      toast.success("Admin Created Successfully");
      await navigate("/admin/course");
    } catch (e) {
      toast.error("Admin Not Created");
    }
  }

  return (
    <main className="w-full max-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-purple-700">
                Add New Course
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Fill the course details below
              </p>
            </div>

            <Breadcrumb />
            {/* <nav className="text-sm text-slate-500">
              <span>Home</span>
              <span className="mx-2">›</span>
              <span className="text-purple-600">Course Management</span>
              <span className="mx-2">›</span>
              <span className="text-purple-600">Add New Course</span>
            </nav> */}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
          {/* Form */}
          <form className="space-y-6">
            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Course Name */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Course Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Advanced Calculus"
                  className="w-full px-3 py-2 border border-purple-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400"
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>

              {/* Course Category */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Course Category
                </label>
                <select
                  className="w-full px-3 py-2 border border-purple-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400"
                  onChange={(e) => setCourseCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  <option value="Applied Mathematics">
                    Applied Mathematics
                  </option>
                  <option value="Pure Mathematics">Pure Mathematics</option>
                </select>
              </div>

              {/* Course Price */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Course Price
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2000"
                  className="w-full px-3 py-2 border border-purple-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400"
                  onChange={(e) => setCoursePrice(e.target.value)}
                />
              </div>

              {/* Course URL */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Course URL
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/course"
                  className="w-full px-3 py-2 border border-purple-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400"
                  onChange={(e) => setCourseURL(e.target.value)}
                />
              </div>
            </div>

            {/* Full Width Description */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Course Description
              </label>
              <textarea
                rows="4"
                placeholder="Brief description about the course"
                className="w-full px-3 py-2 border border-purple-200 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400"
                onChange={(e) => setCourseDescription(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-purple-100">
              <button
                type="button"
                className="px-6 py-2 rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50 transition text-sm font-medium"
              >
                Cancel
              </button>

              <button
                type="button"
                className="px-6 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition text-sm font-medium"
                onClick={Create}
              >
                Save Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
