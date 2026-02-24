import axios from "axios";
import { useEffect, useState } from "react";
import { Users, CreditCard, TrendingUp, Building2 } from "lucide-react";
import { getStats } from "../../api/DashboardApi";

export function Dashboard() {
  const [countStudent, setCountStudent] = useState();

  useEffect(() => {
    // axios.get("http://localhost:8080/dashboard/")
    getStats()
    .then((res) => {
      setCountStudent(res.data);
      console.log("response data:", res.data);
    });
  }, []);

  const monthName = new Date().toLocaleString('default', { month: 'long' });

  // Reusable Stat Card Component
  const StatCard = ({ title, value, icon: Icon, colorClass, bgClass }) => (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-5 transition-transform hover:scale-[1.02] duration-300">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Students "
          value={countStudent?.totalStudents || 0}
          icon={Users}
          colorClass="text-purple-600"
          bgClass="bg-purple-50 dark:bg-purple-900/20"
        />
        <StatCard
          title={`Total Income (${monthName})`}
          value={`LKR ${countStudent?.totalIncome || 0}`}
          icon={CreditCard}
          colorClass="text-blue-600"
          bgClass="bg-blue-50 dark:bg-blue-900/20"
        />
        <StatCard
          title={`Net Profit (${monthName})`}
          value={`LKR ${countStudent?.netProfit || 0}`}
          icon={TrendingUp}
          colorClass="text-emerald-600"
          bgClass="bg-emerald-50 dark:bg-emerald-900/20"
        />
      </div>

      {/* Modern Table Section */}
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
                    LKR 5000
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
              {countStudent?.totalByInstituteAndMonth?.map((item, index) => (
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
                      {item.studentCount}
                    </div>
                  </td>
                  <td className="p-5 font-semibold text-emerald-600 dark:text-emerald-400">
                    {item.totalAmount}
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
