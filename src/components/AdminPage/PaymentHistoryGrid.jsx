import api from "../../config/axios";
import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Building2, Calendar } from "lucide-react";

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function getLastSixMonths() {
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    months.push({
      value: `${yyyy}-${mm}`,
      label: `${MONTH_NAMES[d.getMonth()]} ${yyyy}`,
    });
  }
  return months;
}

export default function PaymentHistoryGrid({ studentId }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentId) return;
    setLoading(true);
    api
      .get(`/payment?studentId=${studentId}`)
      .then((res) => {
        setPayments(res.data || []);
      })
      .catch(() => setPayments([]))
      .finally(() => setLoading(false));
  }, [studentId]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          Loading payment history...
        </div>
      </div>
    );
  }

  if (!payments.length) return null;

  const months = getLastSixMonths();

  // Build enrollments list from payment data
  const enrollmentMap = {};
  payments.forEach((p) => {
    const key = `${p.institute || "Unknown"}|||${p.batch || "Unknown"}`;
    if (!enrollmentMap[key]) {
      enrollmentMap[key] = {
        institute: p.institute || "Unknown",
        batch: p.batch || "Unknown",
      };
    }
  });
  const enrollments = Object.values(enrollmentMap);

  // Build lookup: "institute|||batch|||month" -> payment
  const paymentLookup = {};
  payments.forEach((p) => {
    const key = `${p.institute || "Unknown"}|||${p.batch || "Unknown"}|||${p.month}`;
    if (!paymentLookup[key]) {
      paymentLookup[key] = p;
    }
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            6-Month Payment History
          </h2>
        </div>
      </div>

      {/* Desktop/Tablet Grid */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <th className="p-4 text-left font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                Enrollment
              </th>
              {months.map((m) => (
                <th
                  key={m.value}
                  className="p-4 text-center font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider"
                >
                  {m.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {enrollments.map((enr) => {
              const rowKey = `${enr.institute}|||${enr.batch}`;
              return (
                <tr
                  key={rowKey}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-slate-800 dark:text-slate-200 text-sm truncate">
                          {enr.institute}
                        </p>
                        <p className="text-xs text-slate-400">{enr.batch}</p>
                      </div>
                    </div>
                  </td>
                  {months.map((m) => {
                    const lookupKey = `${rowKey}|||${m.value}`;
                    const payment = paymentLookup[lookupKey];
                    const isPaid = payment && payment.status === "PAID";
                    return (
                      <td key={m.value} className="p-4 text-center">
                        {isPaid ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-100 dark:border-emerald-800">
                            <CheckCircle2 size={12} strokeWidth={3} />
                            Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-xs font-medium border border-slate-100 dark:border-slate-700">
                            <XCircle size={12} />
                            —
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden divide-y divide-slate-100 dark:divide-slate-800">
        {enrollments.map((enr) => {
          const rowKey = `${enr.institute}|||${enr.batch}`;
          return (
            <div key={rowKey} className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-4 h-4 text-purple-500" />
                <span className="font-medium text-slate-800 dark:text-slate-200 text-sm">
                  {enr.institute}
                </span>
                <span className="text-xs text-slate-400">• {enr.batch}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {months.map((m) => {
                  const lookupKey = `${rowKey}|||${m.value}`;
                  const payment = paymentLookup[lookupKey];
                  const isPaid = payment && payment.status === "PAID";
                  return (
                    <div
                      key={m.value}
                      className={`text-center p-2 rounded-lg border text-xs font-medium ${
                        isPaid
                          ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400"
                      }`}
                    >
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 mb-0.5">
                        {m.label}
                      </div>
                      {isPaid ? (
                        <span className="flex items-center justify-center gap-0.5">
                          <CheckCircle2 size={10} /> Paid
                        </span>
                      ) : (
                        "—"
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
