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
  const [pricing, setPricing] = useState(null);

  // Build enrollment list from student data (new format or legacy fallback)
  const enrollments = student
    ? Array.isArray(student.enrollments) && student.enrollments.length > 0
      ? student.enrollments
      : (() => {
        const insts = Array.isArray(student.institute)
          ? student.institute
          : student.institute
            ? [student.institute]
            : [];
        const b = student.batch || "";
        if (insts.length === 0 && !b) return [];
        if (insts.length === 0) return [{ institute: "", batch: b }];
        return insts.map((inst) => ({ institute: inst, batch: b }));
      })()
    : [];

  // Set default form values when student changes
  useEffect(() => {
    if (student && enrollments.length > 0) {
      const enr = enrollments[0];
      // Auto-select cardType based on enrollment paymentType
      const autoCard = enr.paymentType === "Half Payment" ? "Half Card" : "Full Payment";
      setFormData((prev) => ({
        ...prev,
        studentId: student.studentId || "",
        institute: enr.institute || "",
        batch: enr.batch || "",
        month: prev.month || getCurrentYYYYMM(),
        amount: "",
        cardType: autoCard,
      }));
    }
  }, [student]);

  // Fetch pricing when enrollment selection changes
  useEffect(() => {
    if (!formData.institute || !formData.batch) {
      setPricing(null);
      return;
    }
    api
      .get("/pricing/all")
      .then((res) => {
        const all = res.data.pricing || [];
        const match = all.find(
          (p) =>
            p.institute === formData.institute && p.batch === formData.batch
        );
        setPricing(match || null);
      })
      .catch(() => setPricing(null));
  }, [formData.institute, formData.batch]);

  // Auto-select amount when pricing loads or cardType changes
  useEffect(() => {
    if (!pricing) return;
    let autoAmount = "";
    if (formData.cardType === "Full Payment" && pricing.fullPayment) {
      autoAmount = String(pricing.fullPayment);
    } else if (formData.cardType === "Half Card" && pricing.halfPayment) {
      autoAmount = String(pricing.halfPayment);
    } else if (formData.cardType === "Free Card" && pricing.freePayment !== undefined) {
      autoAmount = String(pricing.freePayment);
    }
    if (autoAmount) {
      setFormData((prev) => ({ ...prev, amount: autoAmount }));
    }
  }, [pricing, formData.cardType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnrollmentChange = (e) => {
    const idx = parseInt(e.target.value, 10);
    if (isNaN(idx) || !enrollments[idx]) return;
    const enr = enrollments[idx];
    setFormData((prev) => ({
      ...prev,
      institute: enr.institute,
      batch: enr.batch,
      amount: "",
      cardType: enr.paymentType === "Half Payment" ? "Half Card" : "Full Payment",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      setFormData({
        studentId: student?.studentId || "",
        institute: enrollments[0]?.institute || "",
        batch: enrollments[0]?.batch || "",
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

  // Find current enrollment index for the select
  const currentEnrollmentIndex = enrollments.findIndex(
    (e) => e.institute === formData.institute && e.batch === formData.batch
  );

  // Build amount options from pricing
  const amountOptions = [];
  if (pricing) {
    if (pricing.fullPayment) amountOptions.push({ value: pricing.fullPayment, label: `Rs. ${pricing.fullPayment} (Full)` });
    if (pricing.halfPayment) amountOptions.push({ value: pricing.halfPayment, label: `Rs. ${pricing.halfPayment} (Half)` });
    if (pricing.freePayment !== undefined && pricing.freePayment !== null) amountOptions.push({ value: pricing.freePayment, label: `Rs. ${pricing.freePayment} (Free Card)` });
  }
  // Always have fallback manual options
  if (amountOptions.length === 0) {
    amountOptions.push(
      { value: "0", label: "0" },
      { value: "1900", label: "1900" },
      { value: "3800", label: "3800" }
    );
  }

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

          {/* Enrollment Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Enrollment
            </label>
            {enrollments.length > 1 ? (
              <select
                value={currentEnrollmentIndex >= 0 ? currentEnrollmentIndex : 0}
                onChange={handleEnrollmentChange}
                className="w-full px-3 py-2 border rounded"
              >
                {enrollments.map((enr, idx) => (
                  <option key={idx} value={idx}>
                    {enr.institute} — {enr.batch}
                  </option>
                ))}
              </select>
            ) : enrollments.length === 1 ? (
              <div className="w-full px-3 py-2 border rounded bg-gray-50 text-sm text-gray-700">
                {enrollments[0].institute} — {enrollments[0].batch}
              </div>
            ) : (
              <div className="w-full px-3 py-2 border rounded bg-red-50 text-sm text-red-600">
                No enrollments found
              </div>
            )}
          </div>

          {/* Institute (read-only, derived from enrollment selection) */}
          <div>
            <label className="block text-sm mb-1">Institute</label>
            <input
              type="text"
              value={formData.institute || ""}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>

          {/* Batch (read-only, derived from enrollment selection) */}
          <div>
            <label className="block text-sm mb-1">Batch</label>
            <input
              type="text"
              value={formData.batch || ""}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
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
              {amountOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
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
