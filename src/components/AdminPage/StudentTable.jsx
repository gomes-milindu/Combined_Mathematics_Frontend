import React, { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
import PaginationPage from "./PaginationPage";
import { getStudents } from "../../api/StudentApi";

export default function StudentMobileList({ students, toggleMenu }) {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [localStudents, setLocalStudents] = useState(students || []);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (students && Array.isArray(students) && students.length > 0) {
      // Client-side pagination when parent passes full students list
      const total = students.length;
      setPageCount(Math.max(1, Math.ceil(total / limit)));
      const start = (page - 1) * limit;
      setLocalStudents(students.slice(start, start + limit));
    } else {
      fetchStudents(page);
    }
  }, [page, students]);

  // If parent-provided students changes, reset to first page
  useEffect(() => {
    if (students && Array.isArray(students)) setPage(1);
  }, [students]);

  const fetchStudents = async (p) => {
    setLoading(true);
    try {
      const res = await getStudents(p, limit);
      const d = res.data || {};

      // Try common response shapes from paginated APIs
      const list = d.students || d.docs || d.data || d.items || d;
      const totalPages = d.totalPages || d.totalPagesCount || d.total_pages || (d.total ? Math.ceil(d.total / limit) : undefined);

      setLocalStudents(Array.isArray(list) ? list : []);
      if (totalPages) setPageCount(totalPages);
      else if (Array.isArray(list)) setPageCount(Math.ceil(list.length / limit) || 1);
    } catch (err) {
      console.error("Failed to fetch students:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (e, value) => setPage(value);

  const rows = localStudents || [];

  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm min-w-[1000px] md:min-w-0 md:w-full lg:min-w-[1000px]">
          <thead className="bg-slate-50 text-slate-500">
            <tr className="text-left">
              <th className="px-6 md:px-2 lg:px-6 py-4 font-medium">Student</th>
              <th className="px-6 md:px-2 lg:px-6 py-4 font-medium">Student ID</th>
              <th className="px-6 md:px-2 lg:px-6 py-4 font-medium">Contact</th>
              <th className="px-6 md:px-2 lg:px-6 py-4 font-medium">Batch</th>
              <th className="px-6 md:px-2 lg:px-6 py-4 font-medium">Institute</th>
              <th className="px-6 md:px-2 lg:px-6 py-4 font-medium">Status</th>
              <th className="px-6 md:px-2 lg:px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-slate-500">Loading...</td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-slate-500">No students found</td>
              </tr>
            ) : (
              rows.map((items, index) => (
                <tr key={items._id || index} className="hover:bg-slate-50/70 transition">
                  <td className="px-6 md:px-2 lg:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 md:h-8 md:w-8 lg:h-10 lg:w-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold shrink-0">
                        {items.firstName?.[0]}
                        {items.lastName?.[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800 break-words md:text-xs lg:text-sm max-w-[120px] lg:max-w-none">
                          {items.firstName} {items.lastName}
                        </p>
                        <p className="text-xs text-slate-400 truncate max-w-[120px] lg:max-w-none">
                          {items.institute}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 md:px-2 lg:px-6 py-4 text-slate-700 md:text-xs lg:text-sm">{items.studentId}</td>
                  <td className="px-6 md:px-2 lg:px-6 py-4 text-slate-700 md:text-xs lg:text-sm">{items.phone}</td>
                  <td className="px-6 md:px-2 lg:px-6 py-4 text-slate-700 md:text-xs lg:text-sm">{items.batch}</td>
                  <td className="px-6 md:px-2 lg:px-6 py-4 text-slate-700 md:text-xs lg:text-sm">{items.institute}</td>

                  <td className="px-6 md:px-2 lg:px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 md:px-2 md:py-0.5 lg:px-3 lg:py-1 text-xs font-medium ${items.isActive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                      {items.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 md:px-2 lg:px-6 py-4 text-right relative">
                    <button onClick={(e) => toggleMenu && toggleMenu(index, e)} className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 transition" aria-label="Open actions">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex justify-center items-center m-4">
          <PaginationPage page={page} count={pageCount} onChange={handlePageChange} />
        </div>
      </div>
    </>
  );
}
