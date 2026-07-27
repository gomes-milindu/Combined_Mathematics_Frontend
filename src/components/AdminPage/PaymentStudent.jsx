import api from "../../config/axios";
import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Building2, Calendar } from "lucide-react";

export default function PaymentStudent({ studentId }) {
  const [payment, setPayment] = useState([]);
  const [newArr, setNewArr] = useState([]);

  useEffect(() => {
    if (!studentId) return;

    api
      .get(`/payment?studentId=${studentId}`)
      .then((res) => {
        setPayment(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [studentId]);

  useEffect(() => {
    if (!payment.length) {
      setNewArr([]);
      return;
    }

    const theoryPayment = payment.filter((p) => p.batch == "2027 Theory");
    const paperPayments = payment.filter((p) => p.batch == "2027 Paper");

    const maxTheory = theoryPayment.length
      ? Math.max(...theoryPayment.map((p) => Number(p.month)))
      : null;

    const maxPaper = paperPayments.length
      ? Math.max(...paperPayments.map((p) => Number(p.month)))
      : null;

    const finalArray = payment.filter(
      (p) =>
        (p.batch == "2027 Theory" && Number(p.month) == maxTheory) ||
        (p.batch == "2027 Paper" && Number(p.month) == maxPaper),
    );

    setNewArr(finalArray);
  }, [payment]);

  const thisMonth = new Date().getMonth() + 1;
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

  if (newArr.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newArr.map((p, index) => {
        const isPaid = Number(p.month) >= thisMonth;
        const monthName = monthNames[Number(p.month) - 1];

        return (
          <div
            key={index}
            className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-all hover:shadow-md"
          >
            {/* Top Accent Line */}
            <div
              className={`absolute top-0 left-0 w-full h-1 ${
                isPaid ? "bg-emerald-500" : "bg-rose-500"
              }`}
            />

            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Calendar size={12} />
                  {monthName}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {p.batch}
                </h3>
              </div>

              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                  isPaid
                    ? "bg-emerald-50 border-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400"
                    : "bg-emerald-50 border-rose-100 text-emerald-700 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-400"
                }`}
              >
                {isPaid ? (
                  <>
                    <CheckCircle2 size={12} strokeWidth={3} />
                    PAID
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={12} strokeWidth={3} />
                    PAID
                  </>
                )}
              </div>
            </div>

            <div className="flex items-end justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm font-medium">
                <Building2 size={16} className="text-slate-400" />
                {p.institute}
              </div>
              <div className="text-xs text-slate-400 font-mono">
                {new Date().getFullYear()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
