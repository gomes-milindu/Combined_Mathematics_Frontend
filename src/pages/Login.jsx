import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Login(props) {
  const [usergetName, setuserName] = useState("");
  const [Password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  async function login() {
    e.preventDefault();
    try {
      await axios.post(
      "http://localhost:8080/admin/login",
      {
        
          userName: usergetName,
          password: Password,
          role: role
      }
      );
      alert("He")
      navigate("/admin")
      

      toast.success("Admin Login Succesfull");
    } catch (e) {
      toast.error("Admin Not Log");
    }
    return false
  }

return (
  <>
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-10 w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-purple-700 text-center mb-8 tracking-wide">
          Welcome Back
        </h2>

        <form className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 border rounded-lg focus:border-purple-600 focus:ring-purple-300 focus:ring outline-none transition"
            onChange={(e) => {
              setuserName(e.target.value);
              console.log(e.target.value)
            }}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg focus:border-purple-600 focus:ring-purple-300 focus:ring outline-none transition"
            onChange={(e) => {
              setPassword(e.target.value);
              console.log(e.target.value)
            }}
          />

          <select
            className="w-full px-4 py-3 border rounded-lg focus:border-purple-600 focus:ring-purple-300 focus:ring outline-none transition"
            onChange={(e) => {
              setRole(e.target.value);
              console.log(e.target.value);
            }}
          >
            <option value="student" defaultValue>
              Student
            </option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 active:scale-[.98] transition font-medium"
            onClick={login}
          >
            Log In
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Forgot your password?
        </p>
      </div>
    </div>
  </>
);
}

export default Login;
