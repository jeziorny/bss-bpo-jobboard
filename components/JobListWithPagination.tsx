"use client";

import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Pagination from "./Pagination";
import { supabase } from "../lib/supabaseClient";
import { useFilters } from "../hooks/useFilters";

const PAGE_SIZE = 10;

export default function JobListWithPagination() {
  const { filters, page, setPage, applyFilters } = useFilters();
  const [jobs, setJobs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        let query = supabase.from("jobs").select("*", { count: "exact" });
        // Filtry
        if (filters.location) query = query.eq("location", filters.location);
        if (filters.type) query = query.eq("remote_type", filters.type);
        if (filters.seniority) query = query.eq("seniority", filters.seniority);
        if (filters.industry) query = query.eq("industry", filters.industry);
        if (filters.salaryFrom) query = query.gte("salary_from", filters.salaryFrom);
        if (filters.salaryTo) query = query.lte("salary_to", filters.salaryTo);
        // Paginacja
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;
        query = query.order("created_at", { ascending: false }).range(from, to);
        const { data, error: fetchError, count } = await query;
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
  }, [filters, page]);

  return (
    <div>
      {/* FilterBar pojawi się nad listą */}
      {/* <FilterBar /> */}
      {loading && <div>Ładowanie...</div>}
      {error && <div className="text-red-500">Błąd: {error}</div>}
      {!loading && jobs.length === 0 && <div>Brak ofert spełniających wybrane kryteria</div>}
      <div className="flex flex-col gap-4 my-6">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
} 