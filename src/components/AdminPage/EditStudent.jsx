import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import {
  User,
  Mail,
  Phone,
  Lock,
  Building2,
  Calendar,
  Layers,
  Hash,
  Save,
  X,
  CheckCircle2,
} from "lucide-react";
import Breadcrumb from "./BreadCrumb";
import { editStudent, updateEdit } from "../../api/StudentApi";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    institute: "",
    batch: "",
    dateOfBirth: "",
    paymentType: "",
    isActive: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

      editStudent(id).then((res) => {
        const s = res.data;

        setForm({
          studentId: s.studentId || "",
          firstName: s.firstName || "",
          lastName: s.lastName || "",
          email: s.email || "",
          phone: s.phone || "",
          password: "",
          institute: s.institute || "",
          batch: s.batch || "",
          dateOfBirth: s.dateOfBirth ? s.dateOfBirth.substring(0, 10) : "",
          paymentType: s.paymentType || "",
          isActive: !!s.isActive,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load student");
        setIsLoading(false);
      });
  }, [id]);

  function updateField(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleEdit() {
    try {
      
      await updateEdit(id, form);

      toast.success("Student updated successfully");
      navigate("/admin/students");
    } catch {
      toast.error("Update failed. Please try again.");
    }
  }

  // Reusable Input Component
  const InputField = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    icon: Icon,
    fullWidth = false,
  }) => (
    <div className={`space-y-2 ${fullWidth ? "col-span-1 md:col-span-2" : ""}`}>
      <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-slate-700 dark:text-slate-200"
          placeholder={`Enter ${label}`}
        />
      </div>
    </div>
  );

  // Reusable Select Component
  const SelectField = ({
    label,
    name,
    value,
    onChange,
    icon: Icon,
    options,
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-slate-400" />
        </div>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-slate-700 dark:text-slate-200 appearance-none"
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              Edit Student
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Update student information and academic details
            </p>
          </div>
          <Breadcrumb />
        </div>

        {/* Main Form Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Personal Information Section */}
              <div className="col-span-1 md:col-span-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-600" />
                  Personal Information
                </h2>
              </div>
              <InputField
                label="Student ID"
                name="studentId"
                value={form.studentId}
                onChange={updateField}
                icon={Hash}
              />
              <div className="hidden md:block"></div>{" "}
              {/* Spacer for alignment if needed, or remove to flow naturally */}
              <InputField
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={updateField}
                icon={User}
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={updateField}
                icon={User}
              />
              <InputField
                label="Email Address"
                name="email"
                value={form.email}
                onChange={updateField}
                icon={Mail}
              />
              <InputField
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={updateField}
                icon={Phone}
              />
              <InputField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={updateField}
                icon={Calendar}
              />

              <SelectField
                label="Payment Type"
                name="paymentType"
                value={form.paymentType}
                onChange={updateField}
                icon={Calendar}
                options={["Full Payment", "Half Payment", "Free Payment"]}
              />
              {/* Academic Details Section */}
              <div className="col-span-1 md:col-span-2 pt-4 pb-2 border-b border-slate-100 dark:border-slate-800 mt-2">
                <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-600" />
                  Academic & Security
                </h2>
              </div>
              <SelectField
                label="Institute"
                name="institute"
                value={form.institute}
                onChange={updateField}
                icon={Building2}
                options={["Samathwee", "Sisulka"]}
              />
              <SelectField
                label="Batch"
                name="batch"
                value={form.batch}
                onChange={updateField}
                icon={Layers}
                options={["2027 Theory"]}
              />
              <InputField
                label="New Password"
                name="password"
                type="password"
                value={form.password}
                onChange={updateField}
                icon={Lock}
                fullWidth={true}
              />
              {/* Active Status Toggle */}
              <div className="col-span-1 md:col-span-2 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${form.isActive ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-500"}`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">
                      Active Status
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Enable or disable student access
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={form.isActive}
                    onChange={updateField}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>
              {/* Action Buttons */}
              <div className="col-span-1 md:col-span-2 flex items-center gap-4 pt-6 mt-2">
                <button
                  onClick={handleEdit}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-purple-200 hover:shadow-purple-300 transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]"
                >
                  <Save className="w-5 h-5" />
                  Update Student
                </button>
                <button
                  onClick={() => navigate("/admin/students")}
                  className="px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-all flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
