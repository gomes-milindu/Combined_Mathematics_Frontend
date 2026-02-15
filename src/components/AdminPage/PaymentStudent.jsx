import axios from "axios";
import { useState, useMemo, useEffect } from "react";

export default function PaymentStudent({ studentId }) {
  const [payment, setPayment] = useState([]);
  const [newArr, setNewArr] = useState([]);

  useEffect(() => {
    if (!studentId) return;

    axios
      .get(`http://localhost:8080/payment?studentId=${studentId}`)
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

  console.log("All payments:", payment); 

  const theoryPayment = payment.filter(
    (p) => p.batch == "2027 Theory"
  );
  const paperPayments = payment.filter(
    (p) => p.batch == "2027 Paper"
  );

  console.log("Theory payments:", theoryPayment); 

  const maxTheory = theoryPayment.length
    ? Math.max(...theoryPayment.map((p) => Number(p.month))) 
    : null;

  const maxPaper = paperPayments.length
    ? Math.max(...paperPayments.map((p) => Number(p.month))) 
    : null;

  console.log("Max theory:", maxTheory); 
  console.log("Max paper:", maxPaper); 

  const finalArray = payment.filter(
    (p) =>
      (p.batch == "2027 Theory" && Number(p.month) == maxTheory) ||
      (p.batch == "2027 Paper" && Number(p.month) == maxPaper)
  );

  console.log("Final array:", finalArray); 
  setNewArr(finalArray);
}, [payment]);

const thisMonth = new Date().getMonth() + 1; // Get current month (1-12)
console.log("Current month:", typeof(thisMonth));
  

  return (
    <>
  <div className="flex flex-row gap-15 justify-center items-center mt-15">
    {newArr.map((p, index) => {
      const monthNames = ["January", "February", "March", "April", "May", "June", 
                          "July", "August", "September", "October", "November", "December"];
      
      return (
        <div
          key={index}
          className={`w-64 h-36 border-4 shadow-xl rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden bg-white transition-all duration-300 hover:shadow-2xl ${
            Number(p.month) >= thisMonth 
              ? 'border-green-500' 
              : 'border-red-500'
          }`}
        >
          {/* Status Badge */}
          <div className="flex justify-between items-start relative z-10">
            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
              Number(p.month) >= thisMonth 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {Number(p.month) >= thisMonth ? '✓ PAID' : '✗ UNPAID'}
            </div>
            
            <div className="text-lg font-bold text-gray-700">
              {monthNames[Number(p.month) - 1]}
            </div>
          </div>

          {/* Large Watermark Icon */}
          <div className={`absolute top-1/2 right-4 transform -translate-y-1/2 text-8xl opacity-5 ${
            Number(p.month) >= thisMonth ? 'text-green-500' : 'text-red-500'
          }`}>
            {Number(p.month) >= thisMonth ? '✓' : '✗'}
          </div>

          {/* Content */}
          <div className="relative z-10 space-y-2">
            <div className="font-bold text-xl text-gray-800">
              {p.institute}
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${
                Number(p.month) >= thisMonth ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className="text-sm font-medium capitalize text-gray-600">
                {p.batch}
              </span>
            </div>
          </div>
        </div>
      );
    })}
  </div>
</>
  );
}
