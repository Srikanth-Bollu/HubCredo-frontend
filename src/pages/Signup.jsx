import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, form);
      toast.success(res.data.message || "Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong during signup");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-stone-50">
      <div className="bg-white p-8 w-full max-w-md rounded-2xl shadow-lg border border-stone-100">
        <h2 className="text-3xl font-bold text-center text-stone-800 mb-2">Create Account</h2>
        <p className="text-center text-stone-500 mb-8">Join us and start your journey</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              name="name"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white transition duration-200 text-stone-700 placeholder-stone-400"
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              name="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white transition duration-200 text-stone-700 placeholder-stone-400"
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white transition duration-200 text-stone-700 placeholder-stone-400"
              onChange={handleChange}
            />
          </div>

          <button className="w-full bg-stone-800 text-white py-3 rounded-lg font-medium hover:bg-stone-900 transition duration-200 active:scale-[0.98] shadow-md hover:shadow-lg">
            Sign Up
          </button>

          <div className="text-center mt-4">
            <Link to="/login" className="text-stone-500 hover:text-stone-800 text-sm transition-colors duration-200">
              Already have an account? <span className="font-semibold underline">Login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
