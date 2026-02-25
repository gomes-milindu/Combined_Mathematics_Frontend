import axios from "axios";
import { useState, useEffect } from "react";
import { CreditCard, Banknote, Calendar, CheckCircle2 } from "lucide-react";
import { getPayments } from "../../api/PaymentApi";

export default function AllPayments({ studentId }) {
  const [payment, setPayment] = useState([]);

  useEffect(() => {
    if (!studentId) return;

    // axios
    //   .get(`http://localhost:8080/payment?studentId=${studentId}`)
    getPayments(studentId)
      .then((res) => {
        setPayment(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [studentId]);

  if (!payment.length) return null;

  const hasTheory = payment.some((p) => p.batch === "2028 Theory");
 

  return (
    <div className="space-y-8 mt-8">
      {hasTheory && (
        <PaymentTable
          title="2028 Theory Payments"
          data={payment.filter((p) => p.batch === "2028 Theory")}
        />
      )}

      
    </div>
  );
}

function PaymentTable({ title, data }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
        <CreditCard className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          {title}
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px] whitespace-nowrap">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <th className="p-4 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                Month
              </th>
              <th className="p-4 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                Paid Date
              </th>
              <th className="p-4 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                Payment Method
              </th>
              <th className="p-4 font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {data.map((p, index) => (
              <tr
                key={index}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors duration-150"
              >
                <td className="p-4">
                  <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
                    
                    <span>{p.month}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                    <Calendar className="w-3.5 h-3.5" />
                    {p.paidDate ? p.paidDate.split("T")[0] : "-"}
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      p.cardType === "Card"
                        ? "bg-purple-50 border-purple-100 text-purple-700 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-300"
                        : "bg-blue-50 border-blue-100 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300"
                    }`}
                  >
                    {p.cardType === "Card" ? (
                      <CreditCard size={12} />
                    ) : (
                      <Banknote size={12} />
                    )}
                    {p.cardType}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-sm font-bold">
                    <CheckCircle2 size={14} />
                    PAID
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
