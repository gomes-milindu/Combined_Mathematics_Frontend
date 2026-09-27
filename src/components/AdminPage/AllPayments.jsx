import api from "../../config/axios";
import { useState, useEffect } from "react";
import { CreditCard, Calendar, CheckCircle2 } from "lucide-react";

export default function AllPayments({ studentId }) {
  const [payment, setPayment] = useState([]);

  useEffect(() => {
    if (!studentId) return;

    api
      .get(`/payment?studentId=${studentId}`)
      .then((res) => {
        setPayment(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch payments:", err);
      });
  }, [studentId]);

  if (!payment.length) return null;

  // Extract all unique batches dynamically
  const uniqueBatches = [
    ...new Set(payment.map((p) => p.batch).filter(Boolean)),
  ];

  return (
    <div className="space-y-8 mt-8">
      {uniqueBatches.map((batchName) => (
        <PaymentTable
          key={batchName}
          title={`${batchName} Payments`}
          data={payment.filter((p) => p.batch === batchName)}
        />
      ))}
    </div>
  );
}

function formatPaidDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function PaymentTable({ title, data }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
        <CreditCard className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          {title}
        </h2>
      </div>

      <div className="overflow-x-auto pb-2">
        <table className="w-full text-left border-collapse min-w-[700px] whitespace-nowrap">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <th className="p-4 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                Month
              </th>
              <th className="p-4 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                Paid Date
              </th>
              <th className="p-4 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                Card Type
              </th>
              <th className="p-4 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                Amount
              </th>
              <th className="p-4 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {data.map((p, index) => (
              <tr
                key={p._id || index}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors duration-150"
              >
                <td className="p-4">
                  <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700">
                      {p.month}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {formatPaidDate(p.paidDate)}
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      p.cardType === "Full Payment"
                        ? "bg-slate-100 border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
                        : p.cardType === "Half Card"
                        ? "bg-blue-50 border-blue-100 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300"
                        : "bg-emerald-50 border-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300"
                    }`}
                  >
                    <CreditCard size={12} />
                    {p.cardType || "Full Payment"}
                  </span>
                </td>
                <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                  LKR {Number(p.amount || 0).toLocaleString()}
                </td>
                <td className="p-4 text-right">
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-sm font-bold">
                    <CheckCircle2 size={14} />
                    {p.status || "PAID"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

