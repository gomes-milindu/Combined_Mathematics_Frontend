import { useState } from "react";
import toast from "react-hot-toast";
import Breadcrumb from "./BreadCrumb";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../../api/StudentApi";

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
  const [paymentType, setPaymentType] = useState("Full Payment");
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  async function Create() {
    setIsLoading(true);
    let loadingToast;
    try {
      loadingToast = toast.loading("Creating student...");

      const res = await createStudent({
        studentId,
        firstName,
        lastName,
        email,
        phone,
        password,
        institute,
        batch,
        dateOfBirth,
        paymentType,
        isActive,
        role: "student",
      });

      toast.success("Student Created Successfully", { id: loadingToast });

      const newStudentId = res.data?.student?._id;
      navigate(`/admin/students/studentView/${newStudentId}`);
    } catch (e) {
      const message = e.response?.data?.message || "Something went wrong";

      toast.error(message, { id: loadingToast });
    } finally {
      setIsLoading(false);
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

            {/* Institute */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Institute
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all bg-white"
                onChange={(e) => setInstitute(e.target.value)}
              >
                <option value="">Select Institute</option>
                <option>Samathwee</option>
                <option>New Sense</option>
                <option>Sarwa</option>
                <option>Sky Zone</option>
                <option>Savidma</option>
              </select>
            </div>

            {/* Batch */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Batch
              </label>
              <select
                value={batch}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all bg-white"
                onChange={(e) => setBatch(e.target.value)}
              >
                <option value="">Select Batch</option>
                <option value="2028 Theory">2028 Theory</option>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Payment Type
              </label>
              <select
                type="date"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
                onChange={(e) => setPaymentType(e.target.value)}
              >
              <option value={paymentType}>{paymentType}</option>
              {/* <option value="Full Payment">Full Payment</option> */}
              <option value="Half Payment">Half Payment</option>
              <option value="Free Payment">Free Payment</option>
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
              disabled={isLoading}
              className="w-full md:w-auto px-6 py-2.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition text-sm font-medium shadow-sm hover:shadow focus:ring-2 focus:ring-purple-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating.." : "Create Student"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
