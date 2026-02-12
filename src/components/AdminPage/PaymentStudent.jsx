import axios from "axios";
import { useState, useMemo, useEffect } from "react";

export default function PaymentStudent({ studentId }) {
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
      <div className="flex flex-row gap-15 justify-center items-center mt-15">
        {payment
                .filter((p) => p.course !== "")
                .map((p, index) => (
                  <div
                    key={index}
                    className={`w-55 h-30  border-3 drop-shadow rounded-2xl 
    ${p.month == thisMonth ? "bg-green-300" : "bg-red-50"}`}
                  >
                    <div>{p.course}</div>
                    <div>{p.status}</div>
                    <div>{p.month}</div>
                  </div>
                ))}

        <div className=""></div>
      </div>
    </>
  );
}
