import api from "../../config/axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getCurrentYYYYMM() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function buildMonthOptions() {
  const now = new Date();
  const year = now.getFullYear();
  return MONTH_NAMES.map((name, i) => ({
    value: `${year}-${String(i + 1).padStart(2, "0")}`,
    label: `${name} ${year}`,
  }));
}

export default function PaymentDrawer({ isOpen, onClose, student }) {
  const [formData, setFormData] = useState({
    studentId: "",
    institute: "",
    batch: "",
    month: "",
    amount: "",
    cardType: "Full Payment",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form from the student's actual registration data
  useEffect(() => {
    if (student) {
      const institutes = Array.isArray(student.institute)
        ? student.institute
        : student.institute
          ? [student.institute]
          : [];

      setFormData((prev) => ({
        ...prev,
        studentId: student.studentId || "",
        institute: institutes[0] || "",
        batch: student.batch || "",
        month: prev.month || getCurrentYYYYMM(),
      }));
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) return;

    const payload = {
      studentId: formData.studentId,
      institute: formData.institute,
      batch: formData.batch,
      month: formData.month,
      amount: Number(formData.amount),
      status: "PAID",
      cardType: formData.cardType,
    };

    if (
      !payload.studentId ||
      !payload.institute ||
      !payload.batch ||
      !payload.month ||
      !payload.amount ||
      !payload.cardType
    ) {
      toast.error("Fill all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post("/payment/create", payload);
      toast.success("Payment Success");

      // Reset form (keep student data + defaults)
      setFormData({
        studentId: student?.studentId || "",
        institute: formData.institute,
        batch: student?.batch || "",
        month: "",
        amount: "",
        cardType: "Full Payment",
      });

      onClose();
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Derive data BEFORE the early return so hooks always run in the same order
  const monthOptions = buildMonthOptions();

  const institutes = student
    ? Array.isArray(student.institute)
      ? student.institute
      : student.institute
        ? [student.institute]
        : []
    : [];

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

          {/* Institute — from student's actual registration */}
          <div>
            <label className="block text-sm mb-1">Institute</label>
            {institutes.length > 1 ? (
              <select
                name="institute"
                value={formData.institute || ""}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              >
                {institutes.map((inst) => (
                  <option key={inst} value={inst}>
                    {inst}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name="institute"
                value={formData.institute || ""}
                readOnly
                className="w-full px-3 py-2 border rounded bg-gray-100"
              />
            )}
          </div>

          {/* Batch — from student's actual registration (read-only) */}
          <div>
            <label className="block text-sm mb-1">Batch</label>
            <input
              type="text"
              name="batch"
              value={formData.batch || ""}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>

          {/* Month — YYYY-MM format for LMS compatibility */}
          <div>
            <label className="block text-sm mb-1">Month</label>
            <select
              name="month"
              value={formData.month || ""}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            >
              {monthOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm mb-1">Amount</label>
            <select
              name="amount"
              value={formData.amount || ""}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Amount</option>
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
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 text-white py-2 rounded ${isSubmitting
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
                }`}
            >
              {isSubmitting ? "Processing..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
