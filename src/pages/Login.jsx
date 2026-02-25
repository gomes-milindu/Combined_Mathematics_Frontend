import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Login(props) {
  const [usergetName, setuserName] = useState("");
  const [Password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  async function login(e) {
    e?.preventDefault();
    let loadingToast;
    try {
       loadingToast = toast.loading("Checking Details..");
      const response = await axios.post(
      "http://localhost:8080/admin/login",
      {
        
          userName: usergetName,
          password: Password,
          role: role
      }
      );
      
      navigate("/admin")
      
      localStorage.setItem("token", response.data.token);
      
      const message = response.data.message;
      toast.success(message, { id: loadingToast });
    } catch (e) {
      const message = e.response?.data?.message ||  "Password or username is incorrect";
      toast.error(message , { id: loadingToast });
    }
    return false
  }

return (
  <>
    <div className="min-h-screen font-sans bg-purple-50 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(109,40,217,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(109,40,217,0.10) 1px, transparent 1px), url(\"data:image/svg+xml,%3Csvg width='1200' height='800' viewBox='0 0 1200 800' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.3'%3E%3Cpath d='M120 140C220 120 300 200 380 180' stroke='%236D28D9' stroke-width='2'/%3E%3Cpath d='M140 240C220 220 300 300 380 280' stroke='%23C4B5FD' stroke-width='2'/%3E%3Cpath d='M760 160C840 240 920 260 1040 220' stroke='%236D28D9' stroke-width='2'/%3E%3Cpath d='M720 560C820 520 900 580 1040 560' stroke='%23C4B5FD' stroke-width='2'/%3E%3Ctext x='160' y='520' fill='%236D28D9' font-size='32' font-family='sans-serif'%3E%E2%88%AB%3C/text%3E%3Ctext x='980' y='420' fill='%236D28D9' font-size='30' font-family='sans-serif'%3E%E2%88%91%3C/text%3E%3Ctext x='260' y='360' fill='%23C4B5FD' font-size='24' font-family='sans-serif'%3E%E2%88%9E%3C/text%3E%3Ctext x='880' y='640' fill='%23C4B5FD' font-size='26' font-family='sans-serif'%3Ex%5E2%20%2B%20y%5E2%3C/text%3E%3Ccircle cx='520' cy='240' r='24' stroke='%236D28D9' stroke-width='2'/%3E%3Ccircle cx='680' cy='420' r='18' stroke='%23C4B5FD' stroke-width='2'/%3E%3Cpath d='M260 640H420' stroke='%236D28D9' stroke-width='2' stroke-dasharray='6 10'/%3E%3Cpath d='M780 320H980' stroke='%23C4B5FD' stroke-width='2' stroke-dasharray='6 10'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "48px 48px, 48px 48px, cover",
          backgroundPosition: "center, center, center",
        }}
      />

      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-purple-100 p-10 relative">
          <div className="text-center">
            <p className="text-sm font-medium tracking-wide text-[#6D28D9]">
              Combined Mathematics Tutor
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-gray-900">
              Sign in to your account
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Continue your lessons and track your progress.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={login}>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-[#6D28D9] focus:ring-2 focus:ring-purple-200 outline-none transition"
                onChange={(e) => {
                  setuserName(e.target.value);
                  
                }}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-[#6D28D9] focus:ring-2 focus:ring-purple-200 outline-none transition"
                onChange={(e) => {
                  setPassword(e.target.value);
                  
                }}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-[#6D28D9] focus:ring-2 focus:ring-purple-200 outline-none transition"
                onChange={(e) => {
                  setRole(e.target.value);
                  ;
                }}
              >
                <option value="student" defaultValue>
                  Student
                </option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#6D28D9] py-3 text-white shadow-lg shadow-purple-200 hover:bg-[#5B21B6] active:scale-[.99] transition font-medium"
              onSubmit={login}
            >
              Submit
            </button>

            <button
              type="button"
              className="w-full rounded-xl border border-[#6D28D9] py-3 text-sm font-medium text-[#6D28D9] hover:bg-purple-50 transition"
            >
              Forgot Password
            </button>
          </form>
        </div>
      </div>
    </div>
  </>
);
}

export default Login;
