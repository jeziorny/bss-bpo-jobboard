import React, { useState } from "react";
import Link from "next/link";

export type JobCardProps = {
  id: string;
  title: string;
  company_name: string;
  location?: string;
  salary_from?: number;
  salary_to?: number;
  currency?: string;
  remote_type?: "onsite" | "hybrid" | "remote";
  seniority?: "junior" | "mid" | "senior" | "lead";
  industry?: string;
  created_at?: string;
  logoUrl?: string;
  description?: string;
};

// Modal z formularzem aplikacji
function ApplyModal({ open, onClose, job }: { open: boolean; onClose: () => void; job: JobCardProps }) {
  const [email, setEmail] = useState("");
  const [cv, setCV] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
          onClick={onClose}
          aria-label="Zamknij"
        >
          ×
        </button>
        <h3 className="text-lg font-semibold mb-2">Aplikuj na: {job.title}</h3>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            {loading ? "Wysyłanie..." : "Aplikuj"}
          </button>
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        </form>
      </div>
    </div>
  );
}

const JobCard: React.FC<JobCardProps> = (job) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Link
      href={`/job/${job.id}`}
      className="block bg-white rounded-lg shadow p-5 flex flex-col gap-2 hover:shadow-lg hover:ring-2 hover:ring-blue-200 transition cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-400"
      tabIndex={0}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="font-bold text-lg group-hover:text-blue-700 transition">{job.title}</span>
      </div>
      <div className="text-gray-600 text-sm mb-1">{job.company_name} • {job.location}</div>
      <div className="mb-1 flex flex-wrap gap-2 text-xs">
        {job.remote_type && <span className="bg-gray-100 rounded px-2 py-1">{job.remote_type}</span>}
        {job.seniority && <span className="bg-gray-100 rounded px-2 py-1">{job.seniority}</span>}
        {job.industry && <span className="bg-gray-100 rounded px-2 py-1">{job.industry}</span>}
      </div>
      <div className="text-xs text-gray-500 mb-1">
        {job.salary_from && job.salary_to ? (
          <span>{job.salary_from} - {job.salary_to} {job.currency || 'PLN'}</span>
        ) : (
          <span>Wynagrodzenie: nie podano</span>
        )}
      </div>
      <div className="text-xs text-gray-400 mb-2">Dodano: {job.created_at?.slice(0, 10)}</div>
      <button
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition w-full z-20 relative mt-2"
        onClick={e => { e.stopPropagation(); e.preventDefault(); setModalOpen(true); }}
        tabIndex={0}
      >
        Aplikuj
      </button>
      <ApplyModal open={modalOpen} onClose={() => setModalOpen(false)} job={job} />
    </Link>
  );
};

export default JobCard; 