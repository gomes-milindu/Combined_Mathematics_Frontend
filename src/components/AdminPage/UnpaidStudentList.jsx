import { useState, useEffect } from "react";
import { getUnpaidStudents } from "../../api/StudentApi";
import api from "../../config/axios";
import {
    Users,
    Building2,
    Layers,
    Phone,
    Mail,
    AlertCircle,
    Search,
} from "lucide-react";

function getCurrentYYYYMM() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
}

export default function UnpaidStudentList() {
    const [students, setStudents] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filters
    const [institutes, setInstitutes] = useState([]);
    const [batches, setBatches] = useState([]);
    const [filterInstitute, setFilterInstitute] = useState("");
    const [filterBatch, setFilterBatch] = useState("");

    const currentMonth = getCurrentYYYYMM();

    // Load institutes from pricing API
    useEffect(() => {
        api
            .get("/pricing/institutes")
            .then((res) => setInstitutes(res.data.institutes || []))
            .catch(() => { });
    }, []);

    // Load batches when institute filter changes
    useEffect(() => {
        setBatches([]);
        setFilterBatch("");
        if (!filterInstitute) return;
        api
            .get(`/pricing/institutes/${encodeURIComponent(filterInstitute)}/batches`)
            .then((res) => setBatches(res.data.batches || []))
            .catch(() => { });
    }, [filterInstitute]);

    // Fetch unpaid students
    useEffect(() => {
        setLoading(true);
        setError(null);

        const params = { month: currentMonth };
        if (filterInstitute) params.institute = filterInstitute;
        if (filterBatch) params.batch = filterBatch;

        getUnpaidStudents(params)
            .then((res) => {
                setStudents(res.data.students || []);
                setCount(res.data.count || 0);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load unpaid students");
                setStudents([]);
                setCount(0);
            })
            .finally(() => setLoading(false));
    }, [currentMonth, filterInstitute, filterBatch]);

    const monthLabel = (() => {
        const [y, m] = currentMonth.split("-");
        const names = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December",
        ];
        return `${names[parseInt(m, 10) - 1]} ${y}`;
    })();

    return (
        <div className="p-6 md:p-8 space-y-6 min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <AlertCircle className="w-6 h-6 text-rose-500" />
                        Unpaid Students
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Students with unpaid enrollments for {monthLabel}
                    </p>
                </div>
                <div className="px-4 py-2 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl">
                    <span className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                        {count}
                    </span>
                    <span className="text-sm text-rose-500 dark:text-rose-400 ml-2">
                        unpaid
                    </span>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                            <Building2 className="w-4 h-4 inline mr-1" />
                            Institute
                        </label>
                        <select
                            value={filterInstitute}
                            onChange={(e) => setFilterInstitute(e.target.value)}
                            className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition"
                        >
                            <option value="">All Institutes</option>
                            {institutes.map((inst) => (
                                <option key={inst} value={inst}>
                                    {inst}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                            <Layers className="w-4 h-4 inline mr-1" />
                            Batch
                        </label>
                        <select
                            value={filterBatch}
                            onChange={(e) => setFilterBatch(e.target.value)}
                            disabled={!filterInstitute}
                            className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition disabled:opacity-50"
                        >
                            <option value="">All Batches</option>
                            {batches.map((b) => (
                                <option key={b} value={b}>
                                    {b}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                    </div>
                ) : error ? (
                    <div className="p-8 text-center text-red-500">{error}</div>
                ) : students.length === 0 ? (
                    <div className="p-12 text-center">
                        <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500 dark:text-slate-400 font-medium">
                            No unpaid students found
                        </p>
                        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                            {filterInstitute || filterBatch
                                ? "Try adjusting your filters"
                                : `All students have paid for ${monthLabel}`}
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-sm min-w-[800px]">
                                <thead className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                    <tr className="text-left">
                                        <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                                            Student
                                        </th>
                                        <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                                            Student ID
                                        </th>
                                        <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                                            Unpaid Enrollments
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {students.map((s) => (
                                        <tr
                                            key={s._id || s.studentId}
                                            className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center font-semibold text-sm shrink-0">
                                                        {s.firstName?.[0]}
                                                        {s.lastName?.[0]}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-800 dark:text-white">
                                                            {s.firstName} {s.lastName}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-mono text-sm">
                                                {s.studentId}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    {s.phone && (
                                                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-sm">
                                                            <Phone className="w-3.5 h-3.5" />
                                                            {s.phone}
                                                        </div>
                                                    )}
                                                    {s.email && (
                                                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-sm">
                                                            <Mail className="w-3.5 h-3.5" />
                                                            {s.email}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1.5">
                                                    {s.unpaidEnrollments.map((e, i) => (
                                                        <div
                                                            key={i}
                                                            className="inline-flex items-center gap-1.5 mr-2 px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 text-xs"
                                                        >
                                                            <Building2 className="w-3 h-3 text-rose-400" />
                                                            <span className="font-medium text-rose-700 dark:text-rose-300">
                                                                {e.institute}
                                                            </span>
                                                            <span className="text-rose-400">—</span>
                                                            <span className="text-rose-600 dark:text-rose-400">
                                                                {e.batch}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden grid grid-cols-1 gap-4 p-4">
                            {students.map((s) => (
                                <div
                                    key={s._id || s.studentId}
                                    className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 space-y-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center font-semibold text-sm shrink-0">
                                            {s.firstName?.[0]}
                                            {s.lastName?.[0]}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-800 dark:text-white">
                                                {s.firstName} {s.lastName}
                                            </p>
                                            <p className="text-xs text-slate-500 font-mono">
                                                {s.studentId}
                                            </p>
                                        </div>
                                    </div>
                                    {s.phone && (
                                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-sm">
                                            <Phone className="w-3.5 h-3.5" />
                                            {s.phone}
                                        </div>
                                    )}
                                    <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-700">
                                        <p className="text-xs font-semibold text-slate-500 uppercase">
                                            Unpaid
                                        </p>
                                        {s.unpaidEnrollments.map((e, i) => (
                                            <div
                                                key={i}
                                                className="px-2.5 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 text-xs"
                                            >
                                                <span className="font-medium text-rose-700 dark:text-rose-300">
                                                    {e.institute}
                                                </span>
                                                <span className="text-rose-400"> — </span>
                                                <span className="text-rose-600 dark:text-rose-400">
                                                    {e.batch}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
