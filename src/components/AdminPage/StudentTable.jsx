import React, { useEffect, useMemo, useState } from "react";
import { MoreVertical } from "lucide-react";
import PaginationPage from "./PaginationPage";
import { getStudents } from "../../api/StudentApi";

export default function StudentTable({
  toggleMenu,
  onStudentsLoaded,
  onDeleteClick, // not used here (delete happens in action menu), but kept for future
  overrideStudents, // optional: if parent updates list after delete
  searchQuery,
}) {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [students, setStudents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPage(1);
    const query = (searchQuery || "").trim();
    if (!query) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    fetchAllStudents(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    if (!isSearching) {
      fetchStudents(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isSearching]);

  const visibleStudents = useMemo(() => {
    if (!isSearching) return students;

    const start = (page - 1) * limit;
    return searchResults.slice(start, start + limit);
  }, [isSearching, students, searchResults, page, limit]);

  // If parent provides override list (after delete), apply it
  useEffect(() => {
    if (Array.isArray(overrideStudents) && overrideStudents.length >= 0) {
      setStudents(overrideStudents);
    }
  }, [overrideStudents]);

  const normalizeList = (raw) => {
    if (Array.isArray(raw)) return raw;
    if (Array.isArray(raw?.students)) return raw.students;
    if (Array.isArray(raw?.data)) return raw.data;
    if (Array.isArray(raw?.data?.students)) return raw.data.students;
    return [];
  };

  const fetchStudents = async (p) => {
    setLoading(true);
    try {
      const res = await getStudents(p, limit);
      const raw = res?.data || {};

      const list = normalizeList(raw);
      const totalPages = raw?.totalPages || raw?.data?.totalPages || 1;

      setStudents(list);
      setPageCount(totalPages);

      if (onStudentsLoaded) onStudentsLoaded(list);
    } catch (err) {
      console.error("Failed to fetch students:", err);
      setStudents([]);
      setPageCount(1);
      if (onStudentsLoaded) onStudentsLoaded([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllStudents = async (query) => {
    setLoading(true);
    try {
      let all = [];
      let currentPage = 1;
      let totalPages = 1;

      do {
        const res = await getStudents(currentPage, limit);
        const raw = res?.data || {};
        const list = normalizeList(raw);

        all = [...all, ...list];
        totalPages = raw?.totalPages || raw?.data?.totalPages || 1;
        currentPage += 1;
      } while (currentPage <= totalPages);

      const filtered = all.filter((item) => {
        const fullName = `${item.firstName || ""} ${item.lastName || ""}`.toLowerCase();
        return fullName.includes(query.toLowerCase());
      });

      setSearchResults(filtered);
      setPageCount(Math.max(1, Math.ceil(filtered.length / limit)));
      setLoading(false);

      if (onStudentsLoaded) onStudentsLoaded(filtered.slice(0, limit));
    } catch (err) {
      console.error("Failed to fetch search students:", err);
      setSearchResults([]);
      setPageCount(1);
      setLoading(false);
      if (onStudentsLoaded) onStudentsLoaded([]);
    }
  };

  const handlePageChange = (e, value) => setPage(value);

  return (
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
            <th className="px-6 md:px-2 lg:px-6 py-4 font-medium text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {loading ? (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center text-slate-500">
                Loading...
              </td>
            </tr>
          ) : visibleStudents.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center text-slate-500">
                No students found
              </td>
            </tr>
          ) : (
            visibleStudents.map((item, index) => (
              <tr
                key={item._id || item.id || index}
                className="hover:bg-slate-50/70 transition"
              >
                <td className="px-6 md:px-2 lg:px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 md:h-8 md:w-8 lg:h-10 lg:w-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold shrink-0">
                      {item.firstName?.[0]}
                      {item.lastName?.[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 break-words md:text-xs lg:text-sm max-w-[120px] lg:max-w-none">
                        {item.firstName} {item.lastName}
                      </p>
                      <p className="text-xs text-slate-400 truncate max-w-[120px] lg:max-w-none">
                        {item.institute}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 md:px-2 lg:px-6 py-4 text-slate-700 md:text-xs lg:text-sm">
                  {item.studentId}
                </td>
                <td className="px-6 md:px-2 lg:px-6 py-4 text-slate-700 md:text-xs lg:text-sm">
                  {item.phone}
                </td>
                <td className="px-6 md:px-2 lg:px-6 py-4 text-slate-700 md:text-xs lg:text-sm">
                  {item.batch}
                </td>
                <td className="px-6 md:px-2 lg:px-6 py-4 text-slate-700 md:text-xs lg:text-sm">
                  {item.institute}
                </td>

                <td className="px-6 md:px-2 lg:px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 md:px-2 md:py-0.5 lg:px-3 lg:py-1 text-xs font-medium ${
                      item.isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-6 md:px-2 lg:px-6 py-4 text-right relative">
                  <button
                    onClick={(e) => toggleMenu && toggleMenu(item, index, e)}
                    className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
                    aria-label="Open actions"
                  >
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
  );
}