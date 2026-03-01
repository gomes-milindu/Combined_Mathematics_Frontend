import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createPayment } from "../../api/PaymentApi";
import { getPricing } from "../../api/PricingApi";

export default function PaymentDrawer({ isOpen, onClose, student }) {
  const [formData, setFormData] = useState({
    studentId: "",
    institute: "",
    batch: "",
    month: "",
    cardType: "Full Payment",
  });

  const [pricing, setPricing] = useState(null);

  // ✅ Fill student data when drawer opens
  useEffect(() => {
    if (!student || !isOpen) return;

    const instituteValue = Array.isArray(student.institute)
      ? student.institute[0]
      : student.institute;

    setFormData({
      studentId: student.studentId || "",
      institute: instituteValue || "",
      batch: student.batch || "",
      month: "",
      cardType: "Full Payment",
    });
  }, [student, isOpen]);

  // ✅ Fetch pricing when drawer opens
  useEffect(() => {
    if (!student || !isOpen) return;

  
  getPricing(
  Array.isArray(student.institute)
    ? student.institute[0]
    : student.institute,
  student.batch
)
      .then((res) => {
        setPricing(res.data);
      })
      .catch((err) => {
        console.error("Pricing error:", err);
        toast.error("Pricing not found");
      });
  }, [student, isOpen]);

  // ✅ Calculate amount dynamically
  const calculatedAmount = (() => {
    if (!pricing) return "";

    if (formData.cardType === "Full Payment") return pricing.fullPayment;

    if (formData.cardType === "Half Card") return pricing.halfPayment;

    if (formData.cardType === "Free Card") return pricing.freePayment;

    return "";
  })();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      studentId: formData.studentId,
      institute: formData.institute,
      batch: formData.batch,
      month: formData.month,
      cardType: formData.cardType,
      amount: calculatedAmount,
    };

    if (!payload.studentId || !payload.month || !payload.cardType) {
      toast.error("Fill all fields");
      return;
    }

    const loadingToast = toast.loading("Creating payment...");

    try {
      const response = await createPayment(payload);

      toast.dismiss(loadingToast);

      const smsResult = response.data.sendSMS;

      if (smsResult?.status === "failed") {
        toast.success("Payment saved");
        toast.error(`SMS not sent: ${smsResult.reason}`);
      } else {
        toast.success("Payment saved & SMS sent!");
      }

      setFormData((prev) => ({
        ...prev,
        month: "",
        cardType: "Full Payment",
      }));

      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 2000);
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.response?.data?.message || "Payment failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-transparent" onClick={onClose}></div>

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
              value={formData.studentId}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>

          {/* Institute */}
          <div>
            <label className="block text-sm mb-1">Institute</label>
            <input
              type="text"
              value={formData.institute}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>

          {/* Batch */}
          <div>
            <label className="block text-sm mb-1">Batch</label>
            <input
              type="text"
              value={formData.batch}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>

          {/* Month */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Month
            </label>
            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 
focus:border-purple-600 focus:ring-4 focus:ring-purple-100 
transition-all duration-200 bg-white text-gray-800 
font-medium shadow-sm"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Type
            </label>
            <select
              name="cardType"
              value={formData.cardType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 
focus:border-purple-600 focus:ring-4 focus:ring-purple-100 
transition-all duration-200 bg-white text-gray-800 
font-medium shadow-sm"
            >
              <option value="Full Payment">Full Payment</option>
              <option value="Half Card">Half Card</option>
              <option value="Free Card">Free Card</option>
            </select>
          </div>

          {/* Amount (Auto Calculated) */}
          <div>
            <label className="block text-sm mb-1">Amount</label>
            <input
              type="text"
              value={calculatedAmount}
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
