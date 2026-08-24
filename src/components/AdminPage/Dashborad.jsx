import api from "../../config/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, CreditCard, TrendingUp, Building2, AlertCircle, BarChart3 } from "lucide-react";

/** Format a YYYY-MM string to a short label, e.g. "Aug 2026" */
function fmtMonth(ym) {
  if (!ym) return "";
  const [y, m] = ym.split("-");
  const d = new Date(Number(y), Number(m) - 1);
  return d.toLocaleString("en-US", { month: "short", year: "numeric" });
}

/** Format a number as "LKR 1,234" */
function fmtLKR(v) {
  return `LKR ${Number(v || 0).toLocaleString("en-LK")}`;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [countStudent, setCountStudent] = useState();
  const [unpaidCount, setUnpaidCount] = useState(0);

  useEffect(() => {
    api.get("/dashboard/").then((res) => {
      setCountStudent(res.data);
    });
  }, []);

  // Fetch unpaid count for current YYYY-MM month
  useEffect(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    api
      .get(`/student/unpaid`, { params: { month: `${y}-${m}` } })
      .then((res) => setUnpaidCount(res.data.count || 0))
      .catch(() => setUnpaidCount(0));
  }, []);

  const sixMonth = countStudent?.sixMonthSummary || [];
  const maxGross = Math.max(...sixMonth.map((s) => s.grossProfit), 1);

  // Reusable Stat Card Component
  const StatCard = ({ title, value, icon: Icon, colorClass, bgClass, onClick }) => (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-5 transition-transform hover:scale-[1.02] duration-300 ${onClick ? "cursor-pointer" : ""}`}
    >
      <div
        className={`p-4 rounded-xl ${bgClass} flex items-center justify-center shadow-sm`}
      >
        <Icon className={`w-8 h-8 ${colorClass}`} />
      </div>
      <div>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold tracking-wide uppercase">
          {title}
        </p>
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
          {value}
        </h3>
      </div>
    </div>
  );

  return (
    <div className="p-8 space-y-8 bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={countStudent?.totalStudents || 0}
          icon={Users}
          colorClass="text-purple-600"
          bgClass="bg-purple-50 dark:bg-purple-900/20"
        />
        <StatCard
          title="Total Income"
          value={fmtLKR(countStudent?.totalIncome)}
          icon={CreditCard}
          colorClass="text-blue-600"
          bgClass="bg-blue-50 dark:bg-blue-900/20"
        />
        <StatCard
          title="Net Profit"
          value={fmtLKR(countStudent?.netProfit)}
          icon={TrendingUp}
          colorClass="text-emerald-600"
          bgClass="bg-emerald-50 dark:bg-emerald-900/20"
        />
        <StatCard
          title="Unpaid Students"
          value={unpaidCount}
          icon={AlertCircle}
          colorClass="text-rose-600"
          bgClass="bg-rose-50 dark:bg-rose-900/20"
          onClick={() => navigate("/admin/unpaid-students")}
        />
      </div>

      {/* ── 6-Month Profit Summary ── */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-purple-500" />
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            6-Month Profit Summary
          </h2>
          <div className="ml-auto flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm bg-purple-500" />
              Gross Profit
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm bg-emerald-500" />
              Net Profit
            </span>
          </div>
        </div>

        {/* Chart */}
        <div className="p-6">
          <div className="flex items-end gap-3 md:gap-5 h-56">
            {sixMonth.map((item) => {
              const grossPct = (item.grossProfit / maxGross) * 100;
              const netPct = (item.netProfit / maxGross) * 100;
              return (
                <div
                  key={item.month}
                  className="flex-1 flex flex-col items-center gap-2 group"
                >
                  {/* Bar container */}
                  <div className="relative w-full flex items-end justify-center gap-1 h-44">
                    {/* Gross bar */}
                    <div
                      className="w-[45%] rounded-t-lg bg-purple-400/80 dark:bg-purple-500/60 transition-all duration-500 ease-out relative group-hover:bg-purple-500"
                      style={{ height: `${Math.max(grossPct, 2)}%` }}
                      title={`Gross: ${fmtLKR(item.grossProfit)}`}
                    >
                      {item.grossProfit > 0 && (
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-purple-600 dark:text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {fmtLKR(item.grossProfit)}
                        </span>
                      )}
                    </div>
                    {/* Net bar */}
                    <div
                      className="w-[45%] rounded-t-lg bg-emerald-400/80 dark:bg-emerald-500/60 transition-all duration-500 ease-out relative group-hover:bg-emerald-500"
                      style={{ height: `${Math.max(netPct, 2)}%` }}
                      title={`Net: ${fmtLKR(item.netProfit)}`}
                    >
                      {item.netProfit > 0 && (
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-emerald-600 dark:text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {fmtLKR(item.netProfit)}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Month label */}
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 text-center leading-tight">
                    {fmtMonth(item.month)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Table */}
        <div className="border-t border-slate-100 dark:border-slate-800">
          {/* Mobile cards */}
          <div className="md:hidden grid grid-cols-1 gap-3 p-4">
            {sixMonth.map((item) => (
              <div
                key={item.month}
                className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800"
              >
                <p className="text-sm font-bold text-slate-700 dark:text-white mb-2">
                  {fmtMonth(item.month)}
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">
                    Gross: {fmtLKR(item.grossProfit)}
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    Net: {fmtLKR(item.netProfit)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="p-4 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                    Month
                  </th>
                  <th className="p-4 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider text-right">
                    Gross Profit
                  </th>
                  <th className="p-4 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider text-right">
                    Net Profit (75%)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {sixMonth.map((item) => (
                  <tr
                    key={item.month}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors duration-150"
                  >
                    <td className="p-4 font-semibold text-slate-700 dark:text-slate-200">
                      {fmtMonth(item.month)}
                    </td>
                    <td className="p-4 text-right font-semibold text-purple-600 dark:text-purple-400">
                      {fmtLKR(item.grossProfit)}
                    </td>
                    <td className="p-4 text-right font-semibold text-emerald-600 dark:text-emerald-400">
                      {fmtLKR(item.netProfit)}
                    </td>
                  </tr>
                ))}
                {sixMonth.length === 0 && (
                  <tr>
                    <td
                      colSpan="3"
                      className="p-8 text-center text-slate-500 dark:text-slate-400 italic"
                    >
                      No profit data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Institute Performance Table (preserved) ── */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Building2 className="w-5 h-5 text-slate-500" />
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Institute Performance
          </h2>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden grid grid-cols-1 gap-4 p-4">
          {countStudent?.activeCounts?.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col gap-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">
                    {item.institute}
                  </h3>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200 dark:border-purple-800">
                    {item.batch}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">
                    Revenue
                  </p>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400">
                    {fmtLKR(item.revenue || item.totalAmount)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 pt-3 border-t border-slate-200 dark:border-slate-700">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="font-medium">{item.totalStudents}</span>
                <span className="text-slate-400">Total Students</span>
              </div>
            </div>
          ))}

          {(!countStudent?.activeCounts ||
            countStudent.activeCounts.length === 0) && (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                No institute data available
              </div>
            )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full  text-left border-collapse min-w-[600px] whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="p-5 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                  Institute
                </th>
                <th className="p-5 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                  Batch
                </th>
                <th className="p-5 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                  Total Students
                </th>
                <th className="p-5 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {countStudent?.activeCounts?.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors duration-150 group"
                >
                  <td className="p-5">
                    <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:text-purple-600 transition-colors">
                      {item.institute}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className="px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-100 dark:border-purple-800">
                      {item.batch}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
                      <Users className="w-4 h-4 text-slate-400" />
                      {item.totalStudents}
                    </div>
                  </td>
                  <td className="p-5 font-semibold text-emerald-600 dark:text-emerald-400">
                    {fmtLKR(item.revenue || item.totalAmount)}
                  </td>
                </tr>
              ))}
              {(!countStudent?.activeCounts ||
                countStudent.activeCounts.length === 0) && (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-8 text-center text-slate-500 dark:text-slate-400 italic"
                    >
                      No institute data available
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

