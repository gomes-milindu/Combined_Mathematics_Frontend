
import { useState } from "react";
import TopNav from "./TopNav";
import {
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Calendar,
  Save,
  RotateCcw,
} from "lucide-react";
import axios from "axios";

export default function StudentRegister() {

  const [studentId, setStudentID] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [course, setCourse] = useState("")
  const [batch, setBatch] = useState("")
  const [isActive, setIsActive] = useState("")
  const [birthday, setBirthday] = useState("")
  const [role, setRole] = useState("")

  console.log(typeof firstName)

  async function Create(){
    const response = await axios.post("http://localhost:8080/student/",
      {
        studentId: studentId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: role
      })

      console.log(response.data)
  }
  return (
    <>
      <TopNav pageTitle="Student Register" />

      <main className="w-full flex justify-center items-end">
        
          

          {/* Main Form Card */}
          <div className="h-[80vh] w-[80%] rounded-2xl border flex flex-col justify-center items-center shadow-2xl  border-purple-400">
            <div className=" w-[90%] h-[95%] flex flex-col justify-center items-center">
              <div className="grid grid-cols-2 w-full h-full gap-5">
                
                {/* Student ID */}
                <div className="space-y-2 group flex flex-col gap-3">
                  <label className="flex items-center text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                    </div>
                    Student ID
                  </label>
                  <input
                    type="text"
                    className="w-[400px] text-[14px] h-[30px] bg-gray-50 border border-gray-200 rounded"
                    placeholder="Enter student ID"
                    onChange={(e) => {
                      setStudentID(e.target.value)
                    }}
                  />
                </div>

                {/* First Name */}
                <div className="space-y-2 group flex flex-col gap-3">
                  <label className="flex items-center text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-[400px] text-[14px] h-[30px] bg-gray-50 border border-gray-200 rounded"
                    placeholder="Enter first name"
                    onChange={(e) => {
                      setFirstName(e.target.value)
                    }}
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2 group flex flex-col gap-3">
                  <label className="flex items-center text-sm font-semibold text-gray-700 group-hover:text-cyan-600 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-[400px] text-[14px] h-[30px] bg-gray-50 border border-gray-200 rounded"
                    placeholder="Enter last name"
                    onChange={(e) => {
                      setLastName(e.target.value)
                    }}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2 group flex flex-col gap-3">
                  <label className="flex items-center text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    Email Address
                  </label>
                  <input
                    type="text"
                    className="w-[400px] text-[14px] h-[30px] bg-gray-50 border border-gray-200 rounded"
                    placeholder="student@example.com"
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2 group flex flex-col gap-3">
                  <label className="flex items-center text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="w-[400px] text-[14px] h-[30px] bg-gray-50 border border-gray-200 rounded"
                    placeholder="+94 XX XXX XXXX"
                    onChange={(e) => {
                      setPhone(e.target.value)
                    }}
                  />
                </div>

                {/* Password */}
                <div className="space-y-2 group flex flex-col gap-3">
                  <label className="flex items-center text-sm font-semibold text-gray-700 group-hover:text-cyan-600 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    Password
                  </label>
                  <input
                    type="text"
                    className="w-[400px] text-[14px] h-[30px] bg-gray-50 border border-gray-200 rounded"
                    placeholder="Enter password"
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                  />
                </div>

                {/* Course */}
                <div className="space-y-2 group flex flex-col gap-3">
                  <label className="flex items-center text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    Course
                  </label>
                  <select
                    className="w-[400px] text-[14px] h-[30px] bg-gray-50 border border-gray-200 rounded"
                    onChange={(e) => {
                      setCourse(e.target.value)
                    }}
                  >
                    <option value="">Select a course</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Business Administration">Business Administration</option>
                  </select>
                </div>

                {/* Batch */}
                <div className="space-y-2 group flex flex-col gap-3">
                  <label className="flex items-center text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    Batch
                  </label>
                  <select
                    className="w-[400px] text-[14px] h-[30px] bg-gray-50 border border-gray-200 rounded"
                    onChange={(e) => {
                      setBatch(e.target.value)
                    }}
                  >
                    <option value="">Select a batch</option>
                    <option value="2024-A">2024-A</option>
                    <option value="2024-B">2024-B</option>
                    <option value="2025-A">2025-A</option>
                    <option value="2025-B">2025-B</option>
                    <option value="2026-A">2026-A</option>
                    <option value="2026-B">2026-B</option>
                  </select>
                </div>

                {/* Birthday */}
                <div className="space-y-2 group flex flex-col gap-3">
                  <label className="flex items-center text-sm font-semibold text-gray-700 group-hover:text-cyan-600 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    Birthday
                  </label>
                  <input
                    type="text"
                    className="w-[400px] text-[14px] h-[30px] bg-gray-50 border border-gray-200 rounded"
                    placeholder="YYYY-MM-DD"
                    onChange={(e) => {
                      setBirthday(e.target.value)
                    }}
                  />
                </div>

                {/* Role */}
                <div className="space-y-2 group flex flex-col gap-3">
                  <label className="flex items-center text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    Role
                  </label>
                  <input
                    type="text"
                    className="w-[400px] text-[14px] h-[30px] bg-gray-50 border border-gray-200 rounded"
                    placeholder="Enter role"
                    onChange={(e) => {
                      setRole(e.target.value)
                    }}
                  />
                </div>

                {/* Active Status */}
                <div className="space-y-2 group flex flex-col gap-3">
                  <label className="flex items-center text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Active Status
                  </label>
                  <input
                    type="text"
                    className="w-[400px] text-[14px] h-[30px] bg-gray-50 border border-gray-200 rounded"
                    placeholder="Enter active status (true/false)"
                    onChange={(e) => {
                      setIsActive(e.target.value)
                    }}
                  />
                </div>

                {/* Action Buttons */}
              <div className=" flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  type="button"
                  className="w-full h-full bg-purple-200 rounded-2xl"
                >
                  Cancel
                </button>
                <button
                  onClick={Create}
                  className="w-full h-full bg-purple-200 rounded-2xl"
                >
                  Create Student
                </button>
              </div>

              </div>

              
            </div>
          </div>

        
        
      </main>
    </>
  );
}


