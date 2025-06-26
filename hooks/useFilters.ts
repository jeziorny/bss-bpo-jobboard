'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export type Filters = {
  location?: string;
  type?: string;
  seniority?: string;
  industry?: string;
  salaryFrom?: number;
  salaryTo?: number;
};

export function useFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Stan filtrów aktualnie zastosowanych (z URL)
  const [filters, setFilters] = useState<Filters>({});
  // Stan tymczasowy (edycja przed kliknięciem Szukaj)
  const [tempFilters, setTempFilters] = useState<Filters>({});
  // Paginacja
  const [page, setPage] = useState(1);

  // Synchronizacja z URL na start
  useEffect(() => {
    const params: Filters = {};
    if (searchParams.get("location")) params.location = searchParams.get("location")!;
    if (searchParams.get("type")) params.type = searchParams.get("type")!;
    if (searchParams.get("seniority")) params.seniority = searchParams.get("seniority")!;
    if (searchParams.get("industry")) params.industry = searchParams.get("industry")!;
    if (searchParams.get("salaryFrom")) params.salaryFrom = Number(searchParams.get("salaryFrom"));
    if (searchParams.get("salaryTo")) params.salaryTo = Number(searchParams.get("salaryTo"));
    setFilters(params);
    setTempFilters(params);
    setPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  // Zmiana pojedynczego filtra (tymczasowo)
  function setTempFilter(key: keyof Filters, value: any) {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  }

  // Zastosowanie filtrów (ustawia URL, resetuje paginację)
  function applyFilters() {
    const params = new URLSearchParams();
    Object.entries(tempFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") params.set(key, String(value));
    });
    params.set("page", "1");
    router.replace("?" + params.toString());
  }

  // Reset filtrów do "wszystko"
  function resetFilters() {
    setTempFilters({});
    setFilters({});
    router.replace("?page=1");
  }

  // Zmiana strony (paginacja)
  function setPageAndUrl(newPage: number) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") params.set(key, String(value));
    });
    params.set("page", String(newPage));
    router.replace("?" + params.toString());
    setPage(newPage);
  }

  return {
    filters,
    tempFilters,
    setTempFilter,
    applyFilters,
    resetFilters,
    page,
    setPage: setPageAndUrl,
  };
} 