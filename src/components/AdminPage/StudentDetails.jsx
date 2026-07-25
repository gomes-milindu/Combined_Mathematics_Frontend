import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import toast from "react-hot-toast";
import Breadcrumb from "./Breadcrumb";
import DeleteConfirmation from "./DeleteConfirmation";

import StudentTable from "./StudentTable";
import StudentMobileList from "./StudentMobileList";
import StudentActionMenu from "./StudentActionMenu";
import { api } from "../../utils/api";

export default function StudentDetails() {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [activeStudent, setActiveStudent] = useState(null);

  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    studentId: null,
    studentName: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  // store current loaded students (so we can update list after delete)
  const [students, setStudents] = useState([]);

  // called by StudentTable to provide the current page list
  const handleStudentsLoaded = (list) => {
    setStudents(Array.isArray(list) ? list : []);
  };

  const toggleMenu = (student, index, e) => {
    e.stopPropagation();

    if (openMenuId === index) {
      setOpenMenuId(null);
      setActiveStudent(null);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + window.scrollY + 5,
      left: rect.right + window.scrollX - 176,
    });

    setOpenMenuId(index);
    setActiveStudent(student);
  };

  const handleDeleteClick = (student) => {
    if (!student?._id) return;

    setDeleteModal({
      isOpen: true,
      studentId: student._id,
      studentName: `${student.firstName || ""} ${student.lastName || ""}`.trim(),
    });

    setOpenMenuId(null);
    setActiveStudent(null);
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      studentId: null,
      studentName: "",
    });
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/student/${deleteModal.studentId}`);

      // remove from current page list (UI update)
      setStudents((prev) =>
        Array.isArray(prev)
          ? prev.filter((s) => s._id !== deleteModal.studentId)
          : []
      );

      toast.success("Student deleted successfully");
      closeDeleteModal();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete student");
    }
  };

  return (
    <main className="w-full min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Administration
            </p>
            <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
              Student Management
            </h1>
          </div>
          <Breadcrumb />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0_6px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-800">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  Student List
                </h2>
                <p className="text-sm text-slate-500">
                  Overview of registered students and their current status.
                </p>
              </div>

              <Link
                to="/admin/register"
                className="inline-flex items-center justify-center rounded-full bg-purple-600 text-white px-5 py-2 text-sm font-medium shadow hover:bg-purple-700 transition"
              >
                + Add New Student
              </Link>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="relative flex-1">
                <span className="sr-only">Search students by name</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search students by name..."
                  className="w-full rounded-md border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-sm text-slate-700 shadow-sm outline-none transition duration-200 ease-in-out focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-purple-400 dark:focus:ring-purple-900/30"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-md bg-slate-100 text-slate-500 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </label>
            </div>
          </div>

          {/* Mobile View (keeps its own pagination + fetch) */}
          <StudentMobileList
            searchQuery={searchQuery}
            onDeleteClick={handleDeleteClick}
          />

          {/* Desktop View (fetches + sends current list to parent) */}
          <StudentTable
            toggleMenu={toggleMenu}
            onStudentsLoaded={handleStudentsLoaded}
            onDeleteClick={handleDeleteClick}
            overrideStudents={students}
            searchQuery={searchQuery}
          />
        </div>
      </div>

      {/* Action Menu */}
      <StudentActionMenu
        student={activeStudent}
        position={menuPosition}
        onClose={() => {
          setOpenMenuId(null);
          setActiveStudent(null);
        }}
        onDeleteClick={handleDeleteClick}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        studentName={deleteModal.studentName}
      />
    </main>
  );
}