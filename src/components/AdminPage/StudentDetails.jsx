import React, { useState } from "react";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Breadcrumb from "./BreadCrumb";
import DeleteConfirmation from "./DeleteConfirmation";
import { deleteStudent } from "../../api/StudentApi";
import StudentMobileList from "../AdminPage/StudentMobileList";
import StudentTable from "../AdminPage/StudentTable";
import StudentActionMenu from "../AdminPage/StudentActionMenu";

export default function StudentDetails() {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [activeStudent, setActiveStudent] = useState(null);
  const [tableStudents, setTableStudents] = useState([]);

  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    studentId: null,
    studentName: "",
  });

  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const toggleMenu = (index, e, student) => {
    e.stopPropagation();
    if (openMenuId === index) {
      setOpenMenuId(null);
      setActiveStudent(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.right + window.scrollX - 176,
      });
      setOpenMenuId(index);
      setActiveStudent(student);
    }
  };

  const handleDeleteClick = (student) => {
    setDeleteModal({
      isOpen: true,
      studentId: student._id,
      studentName: `${student.firstName} ${student.lastName}`,
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
      await deleteStudent(deleteModal.studentId);
      toast.success("Student deleted successfully");
      closeDeleteModal();
      // Reload the page to refresh the list
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete student");
    }
  };

  return (
    <main className="w-full min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex bg-slate-50 flex-wrap items-center justify-between gap-4 mb-6">
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
              className="inline-flex items-center justify-center rounded-full bg-purple-600 text-white 
              px-5 py-2 text-sm font-medium shadow hover:bg-slate-800 transition"
            >
              + Add New Student
            </Link>
          </div>

          {/* Mobile Card View */}
          <StudentMobileList onDeleteClick={handleDeleteClick} />

          {/* Desktop Table View */}
          <StudentTable
            toggleMenu={toggleMenu}
            onStudentsLoaded={setTableStudents}
          />
        </div>
      </div>

      {/* Action Menu Portal */}
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
