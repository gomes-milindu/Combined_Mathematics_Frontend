import { useState } from "react";
import api from "../config/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [identifier, setIdentifier] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!identifier) {
      toast.error("Please enter your email or username.");
      return;
    }

    setLoading(true);
    try {
      const endpoint =
        role === "admin" ? "/admin/forgot-password" : "/student/forgot-password";

      const payload =
        role === "admin"
          ? { email: identifier, userName: identifier }
          : { email: identifier };

      await api.post(endpoint, payload);
      setSent(true);
      toast.success("If that account exists, a reset link has been sent.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen font-sans bg-purple-50 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(109,40,217,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(109,40,217,0.10) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-purple-100 p-10 relative">
          <div className="text-center">
            <p className="text-sm font-medium tracking-wide text-[#6D28D9]">
              Combined Mathematics Tutor
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-gray-900">
              Forgot Password
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {sent
                ? "Check your email for a reset link."
                : "Enter your email to receive a password reset link."}
            </p>
          </div>

          {!sent ? (
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-[#6D28D9] focus:ring-2 focus:ring-purple-200 outline-none transition"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {role === "admin" ? "Email or Username" : "Email"}
                </label>
                <input
                  type={role === "admin" ? "text" : "email"}
                  placeholder={
                    role === "admin"
                      ? "Enter your email or username"
                      : "Enter your email"
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-[#6D28D9] focus:ring-2 focus:ring-purple-200 outline-none transition"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#6D28D9] py-3 text-white shadow-lg shadow-purple-200 hover:bg-[#5B21B6] active:scale-[.99] transition font-medium disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <Link
                to="/login"
                className="block text-center text-sm text-[#6D28D9] hover:underline mt-2"
              >
                Back to Login
              </Link>
            </form>
          ) : (
            <div className="mt-8 text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-600">
                If that email is registered, you'll receive a reset link shortly.
              </p>
              <Link
                to="/login"
                className="inline-block rounded-xl border border-[#6D28D9] px-6 py-3 text-sm font-medium text-[#6D28D9] hover:bg-purple-50 transition"
              >
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
