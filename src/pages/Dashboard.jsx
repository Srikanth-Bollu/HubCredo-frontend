import React from "react";
export default function Dashboard() {
  const token = localStorage.getItem("token");

  if (!token) return <h2 className="text-center mt-20">Please login first</h2>;

  const user = localStorage.getItem("user");

  return (
    <div className="min-h-screen flex justify-center items-center bg-stone-50">
      <div className="bg-white p-12 rounded-2xl shadow-lg border border-stone-100 text-center">
        <h1 className="text-4xl font-bold text-stone-800 mb-4">Welcome back, {user ? user : "User"}! 🎉</h1>
        <p className="text-stone-500">You have successfully logged in.</p>
      </div>
    </div>
  );
}
