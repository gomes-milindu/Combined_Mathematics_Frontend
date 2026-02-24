import React, { useState, useEffect } from "react";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import PaginationPage from "./PaginationPage";
import { getStudents } from "../../api/StudentApi";

export default function StudentMobileList({ onDeleteClick }) {
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [students, setStudents] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    fetchStudents(page);
  }, [page]);

  const fetchStudents = async (p) => {
    try {
      const res = await getStudents(p, limit);
      const d = res.data || {};
      setStudents(d.students || []);
      setPageCount(d.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch students:", err);
    }
  };

  const handlePageChange = (e, value) => setPage(value);

  return (
    <>
      <div className="md:hidden grid grid-cols-1 gap-4">
        {students.map((item) => (
          <div
            key={item._id}
            className="bg-white p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4"
          >
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
                    {item.institute}
                  </p>
                </div>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.isActive ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"}`}
              >
                {item.isActive ? "Active" : "Inactive"}
              </span>
            </div>

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
                onClick={() => onDeleteClick(item)}
                className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center m-4 md:hidden">
        <PaginationPage
          page={page}
          count={pageCount}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
