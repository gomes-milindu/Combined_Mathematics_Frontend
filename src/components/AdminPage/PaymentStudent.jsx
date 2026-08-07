import api from "../../config/axios";
import { useState, useEffect } from "react";
import { CheckCircle2, Building2, Calendar } from "lucide-react";

const monthMap = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

function getMonthNumber(m) {
  if (!m) return 0;
  if (!isNaN(Number(m))) return Number(m);
  return monthMap[m] || 0;
}

function getMonthName(m) {
  if (!m) return "";
  if (isNaN(Number(m))) return m;
  const idx = Number(m) - 1;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[idx] || m;
}

export default function PaymentStudent({ studentId }) {
  const [payment, setPayment] = useState([]);
  const [latestPayments, setLatestPayments] = useState([]);

  useEffect(() => {
    if (!studentId) return;

    api
      .get(`/payment?studentId=${studentId}`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setPayment(data);
      })
      .catch((err) => {
        console.error("Failed to fetch student payments:", err);
      });
  }, [studentId]);

  useEffect(() => {
    if (!payment.length) {
      setLatestPayments([]);
      return;
    }

    // Group payments dynamically by batch
    const batchGroups = {};
    payment.forEach((p) => {
      const b = p.batch || "General";
      if (!batchGroups[b]) batchGroups[b] = [];
      batchGroups[b].push(p);
    });

    // Find the most recent payment record for each batch
    const latest = Object.keys(batchGroups).map((b) => {
      const group = batchGroups[b];
      group.sort((a, bItem) => {
        if (a.paidDate && bItem.paidDate) {
          return new Date(bItem.paidDate) - new Date(a.paidDate);
        }
        return getMonthNumber(bItem.month) - getMonthNumber(a.month);
      });
      return group[0];
    });

    setLatestPayments(latest);
  }, [payment]);

  const currentMonthNum = new Date().getMonth() + 1;

  if (latestPayments.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {latestPayments.map((p, index) => {
        const mNum = getMonthNumber(p.month);
        const isPaid = mNum >= currentMonthNum || p.status === "PAID";
        const displayMonth = getMonthName(p.month);

        return (
          <div
            key={p._id || index}
            className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-all hover:shadow-md"
          >
            {/* Top Accent Line */}
            <div
              className={`absolute top-0 left-0 w-full h-1 ${
                isPaid ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />

            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Calendar size={12} />
                  {displayMonth}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {p.batch}
                </h3>
              </div>

              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                  isPaid
                    ? "bg-emerald-50 border-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400"
                    : "bg-amber-50 border-amber-100 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400"
                }`}
              >
                <CheckCircle2 size={12} strokeWidth={3} />
                {p.status || "PAID"}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300 mt-2">
              <span className="text-xs text-slate-400">Card Type</span>
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                {p.cardType || "Full Payment"}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300 mt-1">
              <span className="text-xs text-slate-400">Amount</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                LKR {Number(p.amount || 0).toLocaleString()}
              </span>
            </div>

            <div className="flex items-end justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm font-medium">
                <Building2 size={16} className="text-slate-400" />
                {p.institute || "Institute"}
              </div>
              <div className="text-xs text-slate-400 font-mono">
                {p.paidDate
                  ? new Date(p.paidDate).toLocaleDateString()
                  : new Date().getFullYear()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

