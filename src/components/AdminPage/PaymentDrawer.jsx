import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createPayment } from "../../api/PaymentApi";

export default function PaymentDrawer({ isOpen, onClose, studentId }) {
  const [formData, setFormData] = useState({
    studentId: "",
    batch: "2028 Theory",
    month: "",
    amount: "",
    cardType: "Full Payment",
  });

  useEffect(() => {
    if (studentId) {
      setFormData((prev) => ({ ...prev, studentId }));
    }
  }, [studentId]);

  
  useEffect(() => {
    const amountMap = {
      "Full Payment": "3800",
      "Half Card": "1900",
      "Free Card": "0",
    };
    setFormData((prev) => ({
      ...prev,
      amount: amountMap[prev.cardType] || "",
    }));
  }, [formData.cardType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      studentId: formData.studentId,
      batch: formData.batch,
      month: formData.month,
      cardType: formData.cardType,
      amount: Number(formData.amount),
    };

    if (
      !payload.studentId ||
      !payload.batch ||
      !payload.month ||
      !payload.cardType
    ) {
      toast.error("Fill all fields");
      return;
    }

    const loadingToast = toast.loading("Creating payment...");

    try {
      // await axios.post(
      //   "http://localhost:8080/payment/create",
      //   payload,
      // );

      const response = await createPayment(payload);
      console.log("response", response.data);
      toast.dismiss(loadingToast);

      const smsResult = response.data.sendSMS;
      if (smsResult?.status === "failed") {
        toast.success("Payment saved", { duration: 3000 });
        toast.error(`SMS not sent: ${smsResult.reason}`, { duration: 3000 });
      } else {
        toast.success("Payment saved & SMS sent!", { duration: 3000 });
      }

      setFormData({
        studentId,
        batch: "2028 Theory",
        month: "",
        amount: "",
        cardType: "Full Payment",
      });

      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 3000);
    } catch (err) {
      toast.dismiss(loadingToast);
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

          {/* Batch */}
          <div>
            <label className="block text-sm mb-1">Batch</label>
            <select
              name="batch"
              value={formData.batch || ""}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Batch</option>
              <option value="2028 Theory">2028 Theory</option>
            </select>
          </div>

          {/* Month */}
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
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
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

          {/* Amount */}
          {/* Amount */}
          <div>
            <label className="block text-sm mb-1">Amount</label>
            <input
              type="text"
              name="amount"
              value={formData.amount || ""}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
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
