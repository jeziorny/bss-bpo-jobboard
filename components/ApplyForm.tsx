"use client";

import { useState } from "react";
import type { JobCardProps } from "./JobCard";

export default function ApplyForm({ job }: { job: JobCardProps }) {
  const [email, setEmail] = useState("");
  const [cv, setCV] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("jobId", job.id);
      formData.append("email", email);
      if (cv) formData.append("cv", cv);
      const res = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Aplikacja została wysłana!");
        setEmail("");
        setCV(null);
      } else {
        setError(data.error || "Wystąpił błąd podczas aplikowania.");
      }
    } catch (err) {
      setError("Wystąpił błąd sieci.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="bg-white rounded-lg shadow p-6 mt-8 max-w-md mx-auto flex flex-col gap-4" onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold mb-2">Aplikuj na to stanowisko</h3>
      <label className="flex flex-col gap-1">
        E-mail <span className="text-red-500">*</span>
        <input
          type="email"
          className="border rounded px-3 py-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading}
          placeholder="Twój e-mail"
        />
      </label>
      <label className="flex flex-col gap-1">
        CV (opcjonalnie)
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={e => setCV(e.target.files?.[0] || null)}
          disabled={loading}
        />
      </label>
      <button
        type="submit"
        className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Wysyłanie...' : 'Aplikuj'}
      </button>
      {success && <div className="text-green-600 text-sm text-center">{success}</div>}
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}
    </form>
  );
} 