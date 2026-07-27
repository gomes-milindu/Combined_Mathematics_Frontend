import { useEffect, useState } from "react";
import api from "../../config/axios";
import toast from "react-hot-toast";

export default function AdminRegister() {
  const [name, setAdminName] = useState("");

  const [userName, setUserName] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const [getAdmins, setGetAdmins] = useState([]);

  useEffect(() => {
    api.get("/admin/all").then((res) => {
      setGetAdmins(res.data);
    });
  }, []);

  async function Create() {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await api.post("/admin/", {
        name,
        userName,
        password,
        role,
      });

      toast.success("Admin Created Successfully");
    } catch (e) {
      toast.error("Admin Not Created");
    }
  }

  return (
    <main className="w-full h-auto bg-white flex justify-center items-center py-10 flex-col gap-10">
      {/* Card */}
      <div className="w-[90%] bg-white rounded-2xl border border-purple-200 shadow-xl p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-700">
            Admin Registration
          </h2>
          <p className="text-sm text-slate-500">Enter admin personal details</p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Admin Name */}
          <div>
            <label className="form-label">Admin Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="First name"
              onChange={(e) => setAdminName(e.target.value)}
            />
          </div>

          {/* UserName */}
          <div>
            <label className="form-label">UserName</label>
            <input
              type="text"
              className="form-input"
              placeholder="JoeDoe123"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="@123Sample*$"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/*Role */}
          <div>
            <label className="form-label">Role</label>
            <select
              className="form-input"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option>Admin 1</option>
              <option>Admin 2</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="col-span-1 md:col-span-2 xl:col-span-3 flex justify-end gap-4 mt-4">
            <button className="px-6 py-2 rounded-xl border border-purple-300 text-purple-600 hover:bg-purple-50 transition">
              Cancel
            </button>
            <button
              onClick={Create}
              className="px-6 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              Create Admin
            </button>
          </div>
        </div>
      </div>

      {/* Admin Table */}
      <div className="w-[90%] bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Admin List</h3>
            <p className="text-sm text-slate-500">
              Registered admins and assigned roles
            </p>
          </div>
          <div className="text-xs text-slate-400">
            Total: {getAdmins.length}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-purple-100">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50/60 text-slate-600">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">
                  Admin Name
                </th>
                <th className="text-left px-6 py-4 font-semibold">UserName</th>
                <th className="text-left px-6 py-4 font-semibold">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100">
              {getAdmins.map((admin, index) => (
                <tr
                  key={admin._id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  } hover:bg-slate-50 transition`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center ring-2 ring-slate-100">
                        <svg
                          viewBox="0 0 64 64"
                          className="h-7 w-7 text-slate-500"
                          aria-hidden="true"
                        >
                          <circle cx="32" cy="24" r="12" fill="currentColor" />
                          <path
                            d="M12 58c4-12 18-16 20-16s16 4 20 16"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <span className="font-medium text-slate-800">
                        {admin.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{admin.userName}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                      {admin.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tailwind reusable styles */}
      <style>
        {`
          .form-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            color: #475569;
            margin-bottom: 0.25rem;
          }
          .form-input {
            width: 100%;
            height: 2.5rem;
            padding: 0 0.75rem;
            border-radius: 0.75rem;
            border: 1px solid #e2e8f0;
            background: #ffffff;
            font-size: 0.875rem;
            outline: none;
          }
          .form-input:focus {
            border-color: #c4b5fd;
            box-shadow: 0 0 0 2px #ede9fe;
          }
        `}
      </style>
    </main>
  );
}
