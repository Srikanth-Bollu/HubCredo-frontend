import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, form);
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                if (res.data.user && res.data.user.name) {
                    localStorage.setItem("user", res.data.user.name);
                }
                toast.success("Login successful!");
                navigate("/dashboard");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-stone-50">
            <div className="bg-white p-8 w-full max-w-md rounded-2xl shadow-lg border border-stone-100">
                <h2 className="text-3xl font-bold text-center text-stone-800 mb-2">Welcome Back</h2>
                <p className="text-center text-stone-500 mb-8">Please enter your details to sign in</p>

                <form onSubmit={handleSubmit} className="space-y-5">
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
                        Sign In
                    </button>

                    <div className="text-center mt-4">
                        <Link to="/" className="text-stone-500 hover:text-stone-800 text-sm transition-colors duration-200">
                            Don't have an account? <span className="font-semibold underline">Sign up</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
