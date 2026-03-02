"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EventsPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const role = localStorage.getItem("user_role");

    if (!token || role !== "Member") {
      router.push("/login");
      return;
    }

    setAuthorized(true);
  }, [router]);

  if (!authorized) return null;

  return (
    <div className="py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Welcome, Member
        </h1>

        <h2 className="text-xl font-bold text-slate-800 mb-4">Events</h2>
        <p className="text-slate-500">No events available yet.</p>
      </div>
    </div>
  );
}
