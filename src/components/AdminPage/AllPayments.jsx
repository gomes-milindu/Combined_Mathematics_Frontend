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

  return (
    <>
  <div className="flex flex-col gap-15 justify-center items-center mt-15">2024 Revision
    <table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Date</th>
          <th>Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {payment
          .filter((p) => p.course === "2024 Revision")
          .map((p, index) => (
            <tr key={index}>
              <td>{p.month}</td>
              <td>{p.paidDate.split("T")[0]}</td>
              <td>{p.cardType}</td>
              <td>{p.status}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>

  <div className="flex flex-col gap-15 justify-center items-center mt-15">2024 Theory
    <table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Date</th>
          <th>Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {payment
          .filter((p) => p.course === "2024 Theory")
          .map((p, index) => (
            <tr key={index}>
              <td>{p.month}</td>
              <td>{p.paidDate.split("T")[0]}</td>
              <td>{p.cardType}</td>
              <td>{p.status}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>

  <div className="flex flex-col gap-15 justify-center items-center mt-15">2026 Theory
    <table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Date</th>
          <th>Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {payment
          .filter((p) => p.course === "2026 Theory")
          .map((p, index) => (
            <tr key={index}>
              <td>{p.month}</td>
              <td>{p.paidDate.split("T")[0]}</td>
              <td>{p.cardType}</td>
              <td>{p.status}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
</>
  );
}
