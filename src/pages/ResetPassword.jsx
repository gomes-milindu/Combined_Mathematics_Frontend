import { useState } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import api from "../config/axios";
import toast from "react-hot-toast";

function ResetPassword() {
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "student";
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const endpoint =
        role === "admin"
          ? `/admin/reset-password/${token}`
          : `/student/reset-password/${token}`;

      const res = await api.post(endpoint, { password, confirmPassword });
      toast.success(res.data.message || "Password reset successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed.");
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
              Reset Password
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Enter your new password below.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-[#6D28D9] focus:ring-2 focus:ring-purple-200 outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-[#6D28D9] focus:ring-2 focus:ring-purple-200 outline-none transition"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <p className="text-xs text-gray-400">
              Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#6D28D9] py-3 text-white shadow-lg shadow-purple-200 hover:bg-[#5B21B6] active:scale-[.99] transition font-medium disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <Link
              to="/login"
              className="block text-center text-sm text-[#6D28D9] hover:underline mt-2"
            >
              Back to Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
