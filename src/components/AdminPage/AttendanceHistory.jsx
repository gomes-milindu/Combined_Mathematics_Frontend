import { useEffect, useState } from "react";
import api from "../../config/axios";
import Breadcrumb from "./BreadCrumb";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AttendanceHistory() {
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);
  const [institute, setInstitute] = useState("");
  const [batch, setBatch] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [institutes, setInstitutes] = useState([]);
  const [batches, setBatches] = useState([]);

  // Stats
  const [stats, setStats] = useState(null);

  // Load institutes
  useEffect(() => {
    api.get("/pricing/institutes")
      .then((res) => setInstitutes(res.data.institutes || []))
      .catch(() => {});
  }, []);

  // Load batches when institute changes
  const handleInstituteChange = async (value) => {
    setInstitute(value);
    setBatch("");
    setBatches([]);
    if (!value) return;
    try {
      const res = await api.get(`/pricing/institutes/${encodeURIComponent(value)}/batches`);
      setBatches(res.data.batches || []);
    } catch {
      setBatches([]);
    }
  };

  // Fetch attendance when filters change
  useEffect(() => {
    if (!institute || !batch || !date) {
      setRecords([]);
      setStats(null);
      return;
    }

    const params = new URLSearchParams({ institute, batch, date });

    api.get(`/attendance/?${params}`)
      .then((res) => {
        setRecords(res.data.records || []);
        setTotal(res.data.total || 0);
      })
      .catch(() => setRecords([]));

    api.get(`/attendance/stats?${params}`)
      .then((res) => setStats(res.data))
      .catch(() => setStats(null));
  }, [institute, batch, date]);

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this attendance record?")) return;
    try {
      await api.delete(`/attendance/${id}`);
      toast.success("Record removed");
      setRecords((prev) => prev.filter((r) => r._id !== id));
      setTotal((prev) => prev - 1);
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <main className="w-full min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Attendance History
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Browse attendance records by class and date
              </p>
            </div>
            <Breadcrumb />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Institute</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                value={institute}
                onChange={(e) => handleInstituteChange(e.target.value)}
              >
                <option value="">Select Institute</option>
                {institutes.map((inst) => (
                  <option key={inst} value={inst}>{inst}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Batch</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                disabled={!institute}
              >
                <option value="">Select Batch</option>
                {batches.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Total</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{stats.totalStudents}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-emerald-200 p-4 text-center">
              <p className="text-xs text-emerald-600 uppercase tracking-wider">Present</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.presentCount}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-red-200 p-4 text-center">
              <p className="text-xs text-red-500 uppercase tracking-wider">Absent</p>
              <p className="text-2xl font-bold text-red-500 mt-1">{stats.absentCount}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-purple-200 p-4 text-center">
              <p className="text-xs text-purple-600 uppercase tracking-wider">Rate</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{stats.percentage}%</p>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">
              Records {total > 0 && <span className="text-sm text-gray-400 ml-2">({total})</span>}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Student ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {records.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400 text-sm">
                      {!institute || !batch ? "Select institute, batch and date to view records." : "No attendance records found."}
                    </td>
                  </tr>
                )}
                {records.map((rec, idx) => (
                  <tr key={rec._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">{idx + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-600 font-medium text-xs">
                            {rec.studentName?.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{rec.studentName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{rec.studentId}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(rec.scanTime).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                        rec.status === "present"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {rec.status === "present" ? "✓ Present" : "🕐 Late"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(rec._id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
