"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Event {
  id: number;
  title: string;
  description: string;
  event_type: string;
  mode_of_event: string;
  registration_type: string;
  registration_fee: string;
  discounted_registration_fee: string;
  event_date: string;
  start_time: string;
  end_time: string;
  registration_deadline: string;
  city: string;
  state: string;
  address_line_1: string;
  address_line_2: string | null;
  pincode: string;
  thumbnail: string;
  capacity: number;
  slots_left: number;
  registered_slots: number;
  days_left: number;
  status: string;
  my_registration_status: string;
  speaker_name: string | null;
  speaker_profession: string | null;
  contact_person_name: string;
  webinar_link: string | null;
  who_can_register: string;
}

interface Filters {
  q: string;
  event_type: string;
  mode_of_event: string;
  registration_type: string;
  schedule: string;
  sort: string;
}

const DEFAULT_FILTERS: Filters = {
  q: "",
  event_type: "",
  mode_of_event: "",
  registration_type: "",
  schedule: "",
  sort: "newest",
};

export default function EventsPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const role = localStorage.getItem("user_role");
    console.log("Auth check - token:", token, "role:", role);
    if (!token || role !== "Member") {
      // router.push("/login");
      // return;
    }

    setAuthorized(true);
  }, [router]);

  // Fetch events
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError("");

    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("per_page", "12");
    params.set("who_can_register", "public_users_bob_members");

    if (filters.q) params.set("q", filters.q);
    if (filters.event_type) params.set("event_type", filters.event_type);
    if (filters.mode_of_event) params.set("mode_of_event", filters.mode_of_event);
    if (filters.registration_type) params.set("registration_type", filters.registration_type);
    if (filters.schedule) params.set("schedule", filters.schedule);
    if (filters.sort) params.set("sort", filters.sort);

    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch(`/api/events?${params.toString()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      console.log("Fetched events data:", data);

      // Response: { status, message, data: { current_page, data: [...events], last_page, total } }
      const pagination = data?.data;
      if (pagination?.data) {
        setEvents(pagination.data);
        setTotalPages(pagination.last_page || 1);
        setTotalEvents(pagination.total || 0);
      } else {
        setEvents([]);
      }
    } catch {
      setError("Failed to load events. Please try again.");
      setEvents([]);
    }

    setLoading(false);
  }, [filters, page]);

  useEffect(() => {
    if (authorized) fetchEvents();
  }, [authorized, fetchEvents]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  };

  if (!authorized) return null;

  return (
    <div className="py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Events</h1>
          <p className="text-slate-500 text-sm mt-1">
            {!loading && `${totalEvents} event${totalEvents !== 1 ? "s" : ""} found`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search events..."
            value={filters.q}
            onChange={(e) => handleFilterChange("q", e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:outline-none transition"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <select
            value={filters.event_type}
            onChange={(e) => handleFilterChange("event_type", e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:outline-none"
          >
            <option value="">All Types</option>
            <option value="connect">Connect</option>
            <option value="elevate">Elevate</option>
          </select>

          <select
            value={filters.mode_of_event}
            onChange={(e) => handleFilterChange("mode_of_event", e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:outline-none"
          >
            <option value="">All Modes</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>

          <select
            value={filters.registration_type}
            onChange={(e) => handleFilterChange("registration_type", e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:outline-none"
          >
            <option value="">All Pricing</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>

          <select
            value={filters.schedule}
            onChange={(e) => handleFilterChange("schedule", e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:outline-none"
          >
            <option value="">Any Time</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
          </select>

          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS) && (
          <button
            onClick={resetFilters}
            className="mt-3 text-sm text-amber-600 hover:text-amber-700 font-medium"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-16 text-slate-500">Loading events...</div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-16">
          <p className="text-red-600 mb-3">{error}</p>
          <button
            onClick={fetchEvents}
            className="px-4 py-2 bg-amber-400 text-black rounded-lg font-bold hover:bg-amber-500 transition text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && events.length === 0 && (
        <div className="text-center py-16 text-slate-500">
          No events found. Try adjusting your filters.
        </div>
      )}

      {/* Events Grid */}
      {!loading && !error && events.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition"
              >
                {/* Thumbnail */}
                <div className="w-full h-36 bg-slate-100 relative">
                  {event.thumbnail ? (
                    <img
                      src={event.thumbnail}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 text-sm">
                      No Image
                    </div>
                  )}
                  {event.days_left > 0 && (
                    <span className="absolute top-2 right-2 bg-black/70 text-white text-xs font-semibold px-2 py-0.5 rounded">
                      {event.days_left}d left
                    </span>
                  )}
                </div>

                <div className="p-3">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-1.5">
                    <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[11px] font-semibold rounded capitalize">
                      {event.event_type}
                    </span>
                    <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[11px] font-semibold rounded capitalize">
                      {event.mode_of_event}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 text-[11px] font-semibold rounded capitalize ${
                        event.registration_type === "free"
                          ? "bg-green-100 text-green-700"
                          : "bg-sky-100 text-sky-700"
                      }`}
                    >
                      {event.registration_type === "free" ? "Free" : "Paid"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-slate-800 mb-1 line-clamp-1">
                    {event.title}
                  </h3>

                  {/* Date | Location */}
                  <p className="text-xs text-slate-500 mb-2">
                    {event.event_date}
                    {event.mode_of_event === "offline" && event.city
                      ? ` · ${event.city}, ${event.state}`
                      : event.mode_of_event === "online"
                        ? " · Online"
                        : ""}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-500">
                      {event.slots_left}/{event.capacity} slots
                    </span>
                    {event.registration_type === "free" ? (
                      <span className="text-green-600 font-bold">Free</span>
                    ) : (
                      <span className="text-slate-800 font-bold">
                        ₹{Number(event.discounted_registration_fee) > 0
                          ? event.discounted_registration_fee
                          : event.registration_fee}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-slate-500">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
