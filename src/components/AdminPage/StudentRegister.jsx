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
  const [institute, setInstitute] = useState("");
  const [batch, setBatch] = useState("");
  const [dateOfBirth, setBirthday] = useState("");
  const [isActive, setIsActive] = useState("");
  const [institutes, setInstitutes] = useState([]);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    api.get("/pricing/institutes")
      .then((res) => setInstitutes(res.data.institutes || []))
      .catch(() => toast.error("Failed to load institutes"));
  }, []);

  const handleInstituteChange = async (value) => {
    setInstitute(value);
    setBatch("");
    setBatches([]);
    if (!value) return;
    try {
      const res = await api.get(`/pricing/institutes/${encodeURIComponent(value)}/batches`);
      setBatches(res.data.batches || []);
    } catch (err) {
      console.error("Failed to load batches:", err);
      setBatches([]);
    }
  };

  async function Create() {
    try {
      await api.post("/student/", {
        studentId,
        firstName,
        lastName,
        email,
        phone,
        password,
        institute,
        batch,
        dateOfBirth,
        isActive: isActive === "true",
        role: "admin",
      });

      toast.success("Student Created Successfully");
      navigate("/admin/students");
    } catch (e) {
      toast.error("Student Not Created");
    }
  }

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
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Student ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Student ID
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Institute */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Institute
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all bg-white"
                value={institute}
                onChange={(e) => handleInstituteChange(e.target.value)}
              >
                <option value="">Select Institute</option>
                {institutes.map((inst) => (
                  <option key={inst} value={inst}>{inst}</option>
                ))}
              </select>
            </div>

            {/* Batch */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Batch
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all bg-white"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                disabled={!institute}
              >
                <option value="">Select batch</option>
                {batches.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Birthday */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Birthday
              </label>
              <input
                type="date"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>

            {/* Active Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Active Status
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all bg-white"
                onChange={(e) => setIsActive(e.target.value)}
              >
                <option value="">Select status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
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
    </main>
  );
}
