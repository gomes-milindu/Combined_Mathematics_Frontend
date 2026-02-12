import axios from "axios";
import { useState, useMemo, useEffect } from "react";

export default function PaymentStudent() {
  const [payment, setPayment] = useState([]);
  const studentId = "ST-001";
  useEffect(() => {
    axios
      .get(`http://localhost:8080/payment?studentId=${studentId}`)
      .then((res) => {
        setPayment(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [studentId]);

  return (
    <div className="flex flex-row gap-6">

         {/* 2025 Theory */}
        <div className="">
          {payment
            .filter((p) => p.course === "2025 Theory")
            .map((p) => (
              <div key={p._id} className="w-50 h-50 bg-red-400">
                <p className="text-black">{p.course}</p>
                <p>{p.month}</p>
                <p>{p.status}</p>
              </div>
            ))}
        </div>

         {/* 2024 Revision */}
        <div className="">
          {payment
            .filter((p) => p.course === "2024 Revision")
            .map((p) => (
              <div key={p._id} className="w-50 h-50 bg-red-400">
                <p className="text-black">{p.course}</p>
                <p>{p.month}</p>
                <p>{p.status}</p>
              </div>
            ))}
        </div>


         {/* 2025 Theory */}
        <div className="">
          {payment
            .filter((p) => p.course === "2024 Revision")
            .map((p) => (
              <div key={p._id} className="w-50 h-50 bg-red-400">
                <p className="text-black">{p.course}</p>
                <p>{p.month}</p>
                <p>{p.status}</p>
              </div>
            ))}
        </div>

         {/* 2026 Theory */}
        <div className="">
          {payment
            .filter((p) => p.course === "2024 Revision")
            .map((p) => (
              <div key={p._id} className="w-50 h-50 bg-red-400">
                <p className="text-black">{p.course}</p>
                <p>{p.month}</p>
                <p>{p.status}</p>
              </div>
            ))}
        </div>
    </div>

  );
}
