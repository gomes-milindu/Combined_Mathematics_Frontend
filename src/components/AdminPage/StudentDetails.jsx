import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import api from "../../config/axios";
import { MoreVertical, Eye, Edit, Trash2, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Breadcrumb from "./BreadCrumb";
import DeleteConfirmation from "./DeleteConfirmation";
import PaginationPage from "./PaginationPage";

export default function StudentDetails() {
  const [students, setStudents] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(false);

  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    studentId: null,
    studentName: "",
  });

  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  // Fetch page whenever page or rowsPerPage changes
  useEffect(() => {
    loadStudents(page, rowsPerPage);
  }, [page, rowsPerPage]);

  function loadStudents(currentPage = page, limitVal = rowsPerPage) {
    setLoading(true);
    api
      .get("/student/", {
        params: { page: currentPage, limit: limitVal },
      })
      .then((res) => {
        const data = res.data || {};
        setStudents(data.students || []);
        setTotalPages(data.totalPages || 1);
        setTotalStudents(data.total || (data.students?.length || 0));
      })
      .catch((err) => {
        console.error("Failed to load students:", err);
        toast.error("Failed to load students");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const toggleMenu = (index, e) => {
    e.stopPropagation();
    if (openMenuId === index) {
      setOpenMenuId(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.right + window.scrollX - 176, // Align right edge
      });
      setOpenMenuId(index);
    }
  };

  const handleDeleteClick = (student) => {
    setDeleteModal({
      isOpen: true,
      studentId: student._id,
      studentName: `${student.firstName} ${student.lastName}`,
    });
    setOpenMenuId(null);
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
      toast.success("Student deleted successfully");
      closeDeleteModal();
      loadStudents(page, rowsPerPage);
    } catch {
      toast.error("Failed to delete student");
    }
  };

  return (
    <main className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Administration
            </p>
            <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
              Student Management
            </h1>
          </div>
          <Breadcrumb />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0_6px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                Student List
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Overview of registered students ({totalStudents} total).
              </p>
            </div>
            <Link
              to="/admin/register"
              className="inline-flex items-center justify-center rounded-full bg-purple-600 text-white px-5 py-2 text-sm font-medium shadow hover:bg-purple-700 transition"
            >
              + Add New Student
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-12 text-slate-400">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600 mb-2" />
              <p className="text-sm">Loading students...</p>
            </div>
          ) : students.length === 0 ? (
            <div className="p-12 text-center text-slate-500 dark:text-slate-400">
              No students found.
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="md:hidden grid grid-cols-1 gap-4 p-4">
                {students.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4"
                  >
                    {/* Header: Avatar + Info + Status */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-lg">
                          {item.firstName?.[0]}
                          {item.lastName?.[0]}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                            {item.firstName} {item.lastName}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {Array.isArray(item.institute)
                              ? item.institute.join(", ")
                              : item.institute}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          item.isActive
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                        }`}
                      >
                        {item.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    {/* Body: Details Grid */}
                    <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <div>
                        <span className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider block">
                          ID
                        </span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {item.studentId}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider block">
                          Batch
                        </span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {item.batch}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider block">
                          Contact
                        </span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {item.phone}
                        </span>
                      </div>
                    </div>

                    {/* Footer: Actions */}
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 mt-1">
                      <Link
                        to={`/admin/students/studentView/${item._id}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                      >
                        <Eye size={16} /> View
                      </Link>
                      <Link
                        to={`/admin/students/studentEdit/${item._id}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                      >
                        <Edit size={16} /> Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(item)}
                        className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm min-w-[1000px] md:min-w-0 md:w-full lg:min-w-[1000px]">
                  <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    <tr className="text-left">
                      <th className="px-6 md:px-2 lg:px-6 py-4 font-medium">
                        Student
                      </th>
                      <th className="px-6 md:px-2 lg:px-6 py-4 font-medium">
                        Student ID
                      </th>
                      <th className="px-6 md:px-2 lg:px-6 py-4 font-medium">
                        Contact
                      </th>
                      <th className="px-6 md:px-2 lg:px-6 py-4 font-medium">
                        Batch
                      </th>
                      <th className="px-6 md:px-2 lg:px-6 py-4 font-medium">
                        Institute
                      </th>
                      <th className="px-6 md:px-2 lg:px-6 py-4 font-medium">
                        Status
                      </th>
                      <th className="px-6 md:px-2 lg:px-6 py-4 font-medium text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {students.map((items, index) => (
                      <tr
                        key={items._id || index}
                        className="hover:bg-slate-50/70 dark:hover:bg-slate-800/60 transition"
                      >
                        <td className="px-6 md:px-2 lg:px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 md:h-8 md:w-8 lg:h-10 lg:w-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold shrink-0">
                              {items.firstName?.[0]}
                              {items.lastName?.[0]}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-800 dark:text-slate-100 break-words md:text-xs lg:text-sm max-w-[120px] lg:max-w-none">
                                {items.firstName} {items.lastName}
                              </p>
                              <p className="text-xs text-slate-400 truncate max-w-[120px] lg:max-w-none">
                                {Array.isArray(items.institute)
                                  ? items.institute.join(", ")
                                  : items.institute}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 md:px-2 lg:px-6 py-4 text-slate-700 dark:text-slate-300 md:text-xs lg:text-sm font-mono">
                          {items.studentId}
                        </td>
                        <td className="px-6 md:px-2 lg:px-6 py-4 text-slate-700 dark:text-slate-300 md:text-xs lg:text-sm">
                          {items.phone}
                        </td>
                        <td className="px-6 md:px-2 lg:px-6 py-4 text-slate-700 dark:text-slate-300 md:text-xs lg:text-sm">
                          {items.batch}
                        </td>
                        <td className="px-6 md:px-2 lg:px-6 py-4 text-slate-700 dark:text-slate-300 md:text-xs lg:text-sm">
                          {Array.isArray(items.institute)
                            ? items.institute.join(", ")
                            : items.institute}
                        </td>

                        <td className="px-6 md:px-2 lg:px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 md:px-2 md:py-0.5 lg:px-3 lg:py-1 text-xs font-medium ${
                              items.isActive
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                : "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                            }`}
                          >
                            {items.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>

                        <td className="px-6 md:px-2 lg:px-6 py-4 text-right relative">
                          <button
                            onClick={(e) => toggleMenu(index, e)}
                            className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                            aria-label="Open actions"
                          >
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Pagination Footer */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Showing{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {totalStudents === 0 ? 0 : (page - 1) * rowsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {Math.min(page * rowsPerPage, totalStudents)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {totalStudents}
              </span>{" "}
              students
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Per page:
                </span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setPage(1);
                  }}
                  className="px-2 py-1 border border-slate-200 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <PaginationPage
                page={page}
                count={totalPages}
                onChange={(e, val) => setPage(val)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Menu Portal */}
      {openMenuId !== null &&
        students[openMenuId] &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpenMenuId(null)}
            />
            <div
              className="fixed z-50 bg-white dark:bg-slate-900 shadow-lg rounded-xl border border-slate-100 dark:border-slate-800 w-44 overflow-hidden"
              style={{
                top: menuPosition.top,
                left: menuPosition.left,
              }}
            >
              <Link
                to={`/admin/students/studentView/${students[openMenuId]._id}`}
                onClick={() => setOpenMenuId(null)}
                className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-2 text-sm"
              >
                <Eye size={16} />
                View
              </Link>

              <Link
                to={`/admin/students/studentEdit/${students[openMenuId]._id}`}
                onClick={() => setOpenMenuId(null)}
                className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-2 text-sm"
              >
                <Edit size={16} />
                Edit
              </Link>

              <button
                onClick={() => handleDeleteClick(students[openMenuId])}
                className="block w-full text-left px-4 py-3 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-600 dark:text-rose-400 flex items-center gap-2 text-sm cursor-pointer"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </>,
          document.body,
        )}

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

