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

  return (
    <>
    </>
  );
}


 