import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Breadcrumb from "./BreadCrumb";

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
    isActive: false,
  });

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:8080/student/student/${id}`)
      .then((res) => {
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
          isActive: !!s.isActive,
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load student");
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
      await axios.put(`http://localhost:8080/student/student/${id}`, form);

      toast.success("Student updated");
      navigate("/admin/students");
    } catch {
      toast.error("Update failed");
    }
  }

  return (
    <main className="w-full h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold">Edit Student</h1>
          <Breadcrumb />
        </div>

        <div className="space-y-3">
          <input
            name="studentId"
            value={form.studentId}
            onChange={updateField}
            placeholder="Student ID"
          />
          <input
            name="firstName"
            value={form.firstName}
            onChange={updateField}
            placeholder="First Name"
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={updateField}
            placeholder="Last Name"
          />
          <input
            name="email"
            value={form.email}
            onChange={updateField}
            placeholder="Email"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={updateField}
            placeholder="Phone"
          />
          <input
            name="password"
            value={form.password}
            onChange={updateField}
            placeholder="Password"
          />
          <input
            name="institute"
            value={form.institute}
            onChange={updateField}
            placeholder="Institute"
          />
          <input
            name="batch"
            value={form.batch}
            onChange={updateField}
            placeholder="Batch"
          />

          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={updateField}
          />

          <label className="flex gap-2">
            Active
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={updateField}
            />
          </label>

          <button
            onClick={handleEdit}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Update Student
          </button>
        </div>
      </div>
    </main>
  );
}
