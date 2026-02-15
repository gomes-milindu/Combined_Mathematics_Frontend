// import { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function StudentRegister() {
//   const [studentId, setStudentID] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [course, setCourse] = useState("");
//   const [batch, setBatch] = useState("");
//   const [dateOfBirth, setBirthday] = useState("");
//   const [isActive, setIsActive] = useState("");

//   async function Create() {
//     try {
//       await axios.post("http://localhost:8080/student/", {
//         studentId,
//         firstName,
//         lastName,
//         email,
//         phone,
//         password,
//         course,
//         batch,
//         dateOfBirth,
//         isActive: isActive === "true",
//         role: "admin",
//       });

//       toast.success("Student Created Successfully");
//     } catch (e) {
//       toast.error("Student Not Created");
//     }
//   }

//   return (
//     <main className="w-full h-auto bg-white flex justify-center py-10">

//       {/* Card */}
//       <div className="w-[90%] bg-white rounded-2xl border border-purple-200 shadow-xl p-8">

//         {/* Header */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-semibold text-purple-700">
//             Student Registration
//           </h2>
//           <p className="text-sm text-slate-500">
//             Enter student personal and academic details
//           </p>
//         </div>

//         {/* Form Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

//           {/* Student ID */}
//           <div>
//             <label className="form-label">Student ID</label>
//             <input
//               type="text"
//               className="form-input"
//               placeholder="ST-001"
//               onChange={(e) => setStudentID(e.target.value)}
//             />
//           </div>

//           {/* First Name */}
//           <div>
//             <label className="form-label">First Name</label>
//             <input
//               type="text"
//               className="form-input"
//               placeholder="First name"
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//           </div>

//           {/* Last Name */}
//           <div>
//             <label className="form-label">Last Name</label>
//             <input
//               type="text"
//               className="form-input"
//               placeholder="Last name"
//               onChange={(e) => setLastName(e.target.value)}
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="form-label">Email</label>
//             <input
//               type="email"
//               className="form-input"
//               placeholder="student@email.com"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="form-label">Phone</label>
//             <input
//               type="text"
//               className="form-input"
//               placeholder="+94 XX XXX XXXX"
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-input"
//               placeholder="••••••••"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           {/* Course */}
//           <div>
//             <label className="form-label">Course</label>
//             <select
//               className="form-input"
//               onChange={(e) => setCourse(e.target.value)}
//             >
//               <option value="">Select course</option>
//               <option>Computer Science</option>
//               <option>Software Engineering</option>
//               <option>Information Technology</option>
//               <option>Data Science</option>
//             </select>
//           </div>

//           {/* Batch */}
//           <div>
//             <label className="form-label">Batch</label>
//             <select
//               className="form-input"
//               onChange={(e) => setBatch(e.target.value)}
//             >
//               <option value="">Select batch</option>
//               <option>2024-A</option>
//               <option>2024-B</option>
//               <option>2025-A</option>
//               <option>2025-B</option>
//             </select>
//           </div>

//           {/* Birthday */}
//           <div>
//             <label className="form-label">Birthday</label>
//             <input
//               type="date"
//               className="form-input"
//               onChange={(e) => setBirthday(e.target.value)}
//             />
//           </div>

//           {/* Active Status */}
//           <div>
//             <label className="form-label">Active Status</label>
//             <select
//               className="form-input"
//               onChange={(e) => setIsActive(e.target.value)}
//             >
//               <option value="">Select status</option>
//               <option value="true">Active</option>
//               <option value="false">Inactive</option>
//             </select>
//           </div>

//           {/* Buttons */}
//           <div className="col-span-1 md:col-span-2 xl:col-span-3 flex justify-end gap-4 mt-4">
//             <button className="px-6 py-2 rounded-xl border border-purple-300 text-purple-600 hover:bg-purple-50 transition">
//               Cancel
//             </button>
//             <button
//               onClick={Create}
//               className="px-6 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition"
//             >
//               Create Student
//             </button>
//           </div>

//         </div>
//       </div>

//       {/* Tailwind reusable styles */}
//       <style>
//         {`
//           .form-label {
//             display: block;
//             font-size: 0.875rem;
//             font-weight: 500;
//             color: #475569;
//             margin-bottom: 0.25rem;
//           }
//           .form-input {
//             width: 100%;
//             height: 2.5rem;
//             padding: 0 0.75rem;
//             border-radius: 0.75rem;
//             border: 1px solid #e2e8f0;
//             background: #ffffff;
//             font-size: 0.875rem;
//             outline: none;
//           }
//           .form-input:focus {
//             border-color: #c4b5fd;
//             box-shadow: 0 0 0 2px #ede9fe;
//           }
//         `}
//       </style>

//     </main>
//   );
// }

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Breadcrumb from "./BreadCrumb";

export default function StudentRegister() {
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

  async function Create() {
    try {
      await axios.post("http://localhost:8080/student/", {
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
                placeholder="+94 XX XXX XXXX"
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
                onChange={(e) => setInstitute(e.target.value)}
              >
                <option value="">Select Institute</option>
                <option>Samathwee</option>
                <option>Sisulka</option>
              </select>
            </div>

            {/* Batch */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Batch
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all bg-white"
                onChange={(e) => setBatch(e.target.value)}
              >
                <option value="">Select batch</option>
                <option>2027 Theory</option>
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
            <button className="w-full md:w-auto px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition text-sm font-medium focus:ring-2 focus:ring-purple-100">
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
