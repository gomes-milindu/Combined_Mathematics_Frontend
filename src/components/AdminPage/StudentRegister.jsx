import { useState, useEffect } from "react";
import api from "../../config/axios";
import toast from "react-hot-toast";
import Breadcrumb from "./BreadCrumb";
import { useNavigate } from "react-router-dom";

export default function StudentRegister() {
  const navigate = useNavigate();
  const [studentId, setStudentID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setBirthday] = useState("");
  const [isActive, setIsActive] = useState("");

  // Dynamic institute list from pricing API
  const [institutes, setInstitutes] = useState([]);

  // Multi-enrollment state: each row has { institute, batch, batches[] }
  const [enrollments, setEnrollments] = useState([
    { institute: "", batch: "", batches: [], paymentType: "Full Payment" },
  ]);

  useEffect(() => {
    api.get("/pricing/institutes")
      .then((res) => setInstitutes(res.data.institutes || []))
      .catch(() => toast.error("Failed to load institutes"));
  }, []);

  // Handle institute change for a specific enrollment row
  const handleEnrollmentInstituteChange = async (index, value) => {
    const updated = [...enrollments];
    updated[index] = { institute: value, batch: "", batches: [], paymentType: updated[index].paymentType || "Full Payment" };
    setEnrollments(updated);

    if (!value) return;
    try {
      const res = await api.get(`/pricing/institutes/${encodeURIComponent(value)}/batches`);
      const newEnrollments = [...enrollments];
      newEnrollments[index] = { institute: value, batch: "", batches: res.data.batches || [], paymentType: enrollments[index].paymentType || "Full Payment" };
      setEnrollments(newEnrollments);
    } catch (err) {
      console.error("Failed to load batches:", err);
    }
  };

  // Handle batch change for a specific enrollment row
  const handleEnrollmentBatchChange = (index, value) => {
    const updated = [...enrollments];
    updated[index] = { ...updated[index], batch: value };
    setEnrollments(updated);
  };

  // Add a new empty enrollment row
  const addEnrollment = () => {
    setEnrollments([...enrollments, { institute: "", batch: "", batches: [], paymentType: "Full Payment" }]);
  };

  // Remove an enrollment row (minimum 1)
  const removeEnrollment = (index) => {
    if (enrollments.length <= 1) {
      toast.error("At least one enrollment is required");
      return;
    }
    setEnrollments(enrollments.filter((_, i) => i !== index));
  };

  async function Create() {
    // Validate enrollments
    for (let i = 0; i < enrollments.length; i++) {
      if (!enrollments[i].institute || !enrollments[i].batch) {
        toast.error(`Enrollment ${i + 1}: Both institute and batch are required`);
        return;
      }
    }

    // Check for duplicate enrollment pairs
    const seen = new Set();
    for (const enr of enrollments) {
      const key = `${enr.institute}|||${enr.batch}`;
      if (seen.has(key)) {
        toast.error(`Duplicate enrollment: ${enr.institute} + ${enr.batch}`);
        return;
      }
      seen.add(key);
    }

    try {
      await api.post("/student/", {
        studentId,
        firstName,
        lastName,
        email,
        phone,
        password,
        enrollments: enrollments.map((e) => ({
          institute: e.institute,
          batch: e.batch,
          paymentType: e.paymentType || "Full Payment",
        })),
        dateOfBirth,
        isActive: isActive === "true",
        role: "admin",
      });

      toast.success("Student Created Successfully");
      navigate("/admin/students");
    } catch (e) {
      const msg = e.response?.data?.message || "Student Not Created";
      toast.error(msg);
    }
  }

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all";
  const selectClass = `${inputClass} bg-white`;

  return (
    <main className="w-full min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Student Registration
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Enter student personal and academic details
              </p>
            </div>
            <Breadcrumb />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10">
          {/* Personal Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Student ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Student ID
              </label>
              <input
                type="text"
                className={inputClass}
                placeholder="ST-001"
                onChange={(e) => setStudentID(e.target.value)}
              />
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                First Name
              </label>
              <input
                type="text"
                className={inputClass}
                placeholder="First name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                className={inputClass}
                placeholder="Last name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                className={inputClass}
                placeholder="student@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone
              </label>
              <input
                type="text"
                className={inputClass}
                placeholder="07X XXX XXXX"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                className={inputClass}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Birthday */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Birthday
              </label>
              <input
                type="date"
                className={inputClass}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>

            {/* Active Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Active Status
              </label>
              <select
                className={selectClass}
                onChange={(e) => setIsActive(e.target.value)}
              >
                <option value="">Select status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          {/* Enrollments Section */}
          <div className="mt-10 pt-6 border-t border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Institute & Batch Enrollments
            </h2>

            <div className="space-y-4">
              {enrollments.map((enr, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600">
                      Enrollment {index + 1}
                    </span>
                    {enrollments.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEnrollment(index)}
                        className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Institute */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Institute
                      </label>
                      <select
                        className={selectClass}
                        value={enr.institute}
                        onChange={(e) =>
                          handleEnrollmentInstituteChange(index, e.target.value)
                        }
                      >
                        <option value="">Select Institute</option>
                        {institutes.map((inst) => (
                          <option key={inst} value={inst}>
                            {inst}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Batch */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Batch
                      </label>
                      <select
                        className={selectClass}
                        value={enr.batch}
                        onChange={(e) =>
                          handleEnrollmentBatchChange(index, e.target.value)
                        }
                        disabled={!enr.institute}
                      >
                        <option value="">Select Batch</option>
                        {enr.batches.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Payment Type per enrollment */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Payment Type
                      </label>
                      <select
                        className={selectClass}
                        value={enr.paymentType || "Full Payment"}
                        onChange={(e) => {
                          const updated = [...enrollments];
                          updated[index] = { ...updated[index], paymentType: e.target.value };
                          setEnrollments(updated);
                        }}
                      >
                        <option value="Full Payment">Full Payment</option>
                        <option value="Half Payment">Half Payment</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addEnrollment}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors"
            >
              <span className="text-lg leading-none">+</span>
              Add Another Institute / Batch
            </button>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse md:flex-row justify-end gap-3 mt-10 pt-6 border-t border-gray-100">
            <button
              onClick={() => navigate("/admin/students")}
              className="w-full md:w-auto px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition text-sm font-medium focus:ring-2 focus:ring-purple-100"
            >
              Cancel
            </button>
            <button
              onClick={Create}
              className="w-full md:w-auto px-6 py-2.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition text-sm font-medium shadow-sm hover:shadow focus:ring-2 focus:ring-purple-400 focus:ring-offset-1"
            >
              Create Student
            </button>
          </div>
        </div>
      </div>
    </main >
  );
}
