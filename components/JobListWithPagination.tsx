"use client";

import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Pagination from "./Pagination";
import { supabase } from "../lib/supabaseClient";

const PAGE_SIZE = 10;

export default function JobListWithPagination() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const from = (currentPage - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;
        const { data, error: fetchError, count } = await supabase
          .from("jobs")
          .select("*", { count: "exact" })
          .order("created_at", { ascending: false })
          .range(from, to);
        if (fetchError) {
          setError(fetchError.message);
          setJobs([]);
        } else {
          setJobs(data || []);
          setTotalPages(Math.ceil((count || 0) / PAGE_SIZE));
        }
      } catch (e: any) {
        setError(e.message || String(e));
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [currentPage]);

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4">Oferty pracy</h2>
      {error && <div className="text-red-600 mb-2">Błąd: {error}</div>}
      {loading ? (
        <div className="text-gray-500">Ładowanie...</div>
      ) : jobs && jobs.length > 0 ? (
        <div className="flex flex-col gap-4">
          {jobs.map((job: any) => (
            <JobCard
              key={job.id}
              title={job.title}
              company_name={job.company_name}
              location={job.location}
              salary_from={job.salary_from}
              salary_to={job.salary_to}
              currency={job.currency}
              remote_type={job.remote_type}
              seniority={job.seniority}
              industry={job.industry}
              created_at={job.created_at}
            />
          ))}
        </div>
      ) : (
        <div className="text-gray-500">Brak ofert pracy.</div>
      )}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
} 