"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "warning">("error");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      type: "password",
      email,
      password,
    };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("Login data:", data);
      if (res.ok && data?.success) {
        const role = data.role;
        const token = data.token;

        if (role === "Member") {
          // Store auth data only for Members
          if (token) {
            localStorage.setItem("auth_token", token);
          }
          localStorage.setItem("user_role", role);
          router.push("/events");
        } else if (role === "Public Member") {
          setMessageType("warning");
          setMessage("Upgrade Your Account");
        } else {
          setMessageType("error");
          setMessage("Unknown user role. Please contact support.");
        }
      } else {
        setMessageType("error");
        setMessage(data?.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center" style={{ minHeight: "calc(100vh - 160px)" }}>
      <div className="w-full max-w-sm bg-white px-8 py-10 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-8">
          Login to your account
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {message && (
            <p
              className={`text-sm text-center font-medium rounded-lg p-3 ${
                messageType === "warning"
                  ? "text-amber-700 bg-amber-50 border border-amber-200"
                  : "text-red-600 bg-red-50 border border-red-200"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-400 text-black py-2.5 rounded-lg font-bold hover:bg-amber-500 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
