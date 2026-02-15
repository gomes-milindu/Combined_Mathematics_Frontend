import axios from "axios";
import { useState, useMemo, useEffect } from "react";

export default function AllPayments({ studentId }) {
  const [payment, setPayment] = useState([]);

  useEffect(() => {
    if (!studentId) return;

    axios
      .get(`http://localhost:8080/payment?studentId=${studentId}`)
      .then((res) => {
        setPayment(res.data);
        console.log("Payment data:", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [studentId]);

  const thisMonth = new Date().getMonth() + 1;
  // console.log("This Month " + thisMonth + typeof(thisMonth))

  return (
    <>
 <div>
  {payment.length > 0 && payment.some(p => p.batch === "2027 Theory") && (
    <div className="flex flex-col gap-15 justify-center items-center mt-15">
      <h2 className="text-2xl font-bold text-gray-800">2027 Theory</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Month</th>
            <th className="border border-gray-300 px-4 py-2">Paid Date</th>
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {payment
            .filter((p) => p.batch === "2027 Theory")
            .map((p, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-center">{p.month}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{p.paidDate.split("T")[0]}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{p.cardType}</td>
                <td className="border border-gray-300 px-4 py-2 text-center capitalize">{p.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )}
</div>

<div>
  {payment.length > 0 && payment.some(p => p.batch === "2027 Paper") && (
    <div className="flex flex-col gap-15 justify-center items-center mt-15">
      <h2 className="text-2xl font-bold text-gray-800">2027 Paper</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Month</th>
            <th className="border border-gray-300 px-4 py-2">Paid Date</th>
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {payment
            .filter((p) => p.batch === "2027 Paper")
            .map((p, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-center">{p.month}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{p.paidDate.split("T")[0]}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{p.cardType}</td>
                <td className="border border-gray-300 px-4 py-2 text-center capitalize">{p.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  
</>
  );
}
