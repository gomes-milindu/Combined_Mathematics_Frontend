// import axios from "axios";
// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";

// export default function PaymentDrawer({ isOpen, onClose, studentId }) {
//   const [formData, setFormData] = useState({});

//   // Update studentId when prop changes
//   useEffect(() => {
//     if (studentId) {
//       setFormData((prev) => ({ ...prev, studentId }));
//     }
//   }, [studentId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Payment Data:", formData);

//     try {
//       const payload = {
//         studentId: formData.studentId,
//         course: formData.course,
//         month: formData.month,
//         amount: Number(formData.amount),
//         status:"PAID",
//         cardType: formData.cardType,
//       };

//       const response = await axios.post(
//         "http://localhost:8080/payment/create",
//         payload,
//       );

//       console.log("This is Response", response.data);
//       toast.success("Payment Success")
//       onClose();
//     } catch (err) {
//       console.log("ERROR:", err.response?.data || err.message);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex justify-end">
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-transparent transition-opacity"
//         onClick={onClose}
//       ></div>

//       {/* Drawer */}
//       <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out">
//         <div className="flex justify-between items-center mb-6 border-b pb-4">
//           <h2 className="text-xl font-semibold text-gray-800">
//             Process Payment
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 transition"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Student ID */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Student ID
//             </label>
//             <input
//               type="text"
//               name="studentId"
//               value={formData.studentId}
//               onChange={handleChange}
//               readOnly
//               className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 focus:outline-none"
//             />
//           </div>

//           {/* Course */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Course
//             </label>
//             <select
//               name="course"
//               value={formData.course}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
//             >
//               <option value="2024 Theory">2024 Theory</option>
//               <option value="2024 Revision">2024 Revision</option>
//               <option value="2025 Theory">2025 Theory</option>
//             </select>
//           </div>

//           {/* Month */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Month
//             </label>
//             <input
//               type="month"
//               name="month"
//               value={formData.month}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
//               required
//             />
//           </div>

//           {/* Amount */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Amount (LKR)
//             </label>
//             <input
//               type="number"
//               name="amount"
//               value={formData.amount}
//               onChange={handleChange}
//               placeholder="e.g. 2500"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
//               required
//             />
//           </div>

//           {/* Card Type */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Card Type
//             </label>
//             <select
//               name="cardType"
//               value={formData.cardType}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
//             >
//               <option value="Full Payment">Full Payment</option>
//               <option value="Half Card">Half Card</option>
//               <option value="Free Card">Free Card</option>
//             </select>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition font-medium"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition font-medium"
//             >
//               Confirm
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import api from "../../config/axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function PaymentDrawer({ isOpen, onClose, studentId }) {
  // ✅ Proper initial state (fixes missing fields + controlled warnings)
  const [formData, setFormData] = useState({
    studentId: "",
    batch: "2027 Theory",
    month: "",
    amount: "",
    cardType: "Full Payment",
  });

  // ✅ Update studentId when prop changes
  useEffect(() => {
    if (studentId) {
      setFormData((prev) => ({ ...prev, studentId }));
    }
  }, [studentId]);

  // ✅ Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      studentId: formData.studentId,
      batch: formData.batch,
      month: formData.month,
      amount: Number(formData.amount),
      status: "PAID",
      cardType: formData.cardType,
    };



    // frontend guard
    if (
      !payload.studentId ||
      !payload.batch ||
      !payload.month ||
      !payload.amount ||
      !payload.cardType
    ) {
      toast.error("Fill all fields");
      return;
    }

    try {
      const response = await api.post(
        "/payment/create",
        payload,
      );

      toast.success("Payment Success");

      // ✅ reset form (keep student + defaults)
      setFormData({
        studentId,
        batch: "2027 Theory",
        month: "",
        amount: "",
        cardType: "Full Payment",
      });

      onClose();
      window.location.reload()
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-transparent" onClick={onClose}></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Process Payment
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Student ID */}
          <div>
            <label className="block text-sm mb-1">Student ID</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId || ""}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>

          {/* batch */}
          <div>
            <label className="block text-sm mb-1">Batch</label>
            <select
              name="batch"
              value={formData.batch || ""}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            >
              <option value="2027 Theory">2028 Theory</option>
              <option value="2027 Paper">2028 Paper</option>
              
            </select>
          </div>

          

          <div>
            <label className="block text-sm mb-1">Month</label>
            <select
              name="month"
              value={formData.month || ""}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Month</option>
              <option value="1">1 - January</option>
              <option value="2">2 - February</option>
              <option value="3">3 - March</option>
              <option value="4">4 - April</option>
              <option value="5">5 - May</option>
              <option value="6">6 - June</option>
              <option value="7">7 - July</option>
              <option value="8">8 - August</option>
              <option value="9">9 - September</option>
              <option value="10">10 - October</option>
              <option value="11">11 - November</option>
              <option value="12">12 - December</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm mb-1">Amount</label>
            <select
              type="number"
              name="amount"
              value={formData.amount || ""}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            >
              
              <option value="0">0</option>
              <option value="1900">1900</option>
              <option value="3800">3800</option>
            </select>
          </div>

          {/* Card Type */}
          <div>
            <label className="block text-sm mb-1">Card Type</label>
            <select
              name="cardType"
              value={formData.cardType || ""}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            >
              <option value="Full Payment">Full Payment</option>
              <option value="Half Card">Half Card</option>
              <option value="Free Card">Free Card</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
