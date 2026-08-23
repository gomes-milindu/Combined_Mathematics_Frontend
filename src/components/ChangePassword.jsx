import { useState } from "react";
import api from "../config/axios";
import toast from "react-hot-toast";

/**
 * Reusable Change Password component.
 * Props:
 *   role: "admin" | "student" — determines API endpoint
 *   onClose: optional callback to close a modal
 */
export default function ChangePassword({ role = "student", onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const endpoint =
        role === "admin" ? "/admin/change-password" : "/student/change-password";

      const res = await api.put(endpoint, {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      toast.success(res.data.message || "Password changed!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      if (onClose) onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 max-w-md w-full">
      <h3 className="text-lg font-semibold text-slate-800 mb-1">Change Password</h3>
      <p className="text-sm text-slate-500 mb-5">
        Update your password to keep your account secure.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Current Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>

        <p className="text-xs text-slate-400">
          Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character.
        </p>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-lg transition text-sm disabled:opacity-50"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium py-2.5 rounded-lg transition text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
