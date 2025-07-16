"use client";

import React from "react";
import { useFilters } from "../hooks/useFilters";

const locations = ["Warszawa", "Kraków", "Wrocław", "Poznań", "Gdańsk", "Remote"];
const types = ["onsite", "hybrid", "remote"];
const seniorities = ["junior", "mid", "senior", "lead"];
const industries = ["BPO", "SSC", "IT", "HR", "Finance"];

export default function FilterBar() {
  const {
    resetFilters,
    applyFilters,
    tempFilters,
    setTempFilter,
  } = useFilters();

  return (
    <form
      className="flex flex-wrap gap-4 items-end bg-white p-4 rounded-lg shadow border border-gray-100"
      onSubmit={(e) => {
        e.preventDefault();
        applyFilters();
      }}
    >
      {/* Lokalizacja */}
      <div className="flex flex-col min-w-[140px]">
        <label className="text-xs font-semibold mb-1">Lokalizacja</label>
        <select
          className="border rounded px-2 py-1"
          value={tempFilters.location || ""}
          onChange={(e) => setTempFilter("location", e.target.value)}
        >
          <option value="">Wszystkie</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
      {/* Typ pracy */}
      <div className="flex flex-col min-w-[140px]">
        <label className="text-xs font-semibold mb-1">Typ pracy</label>
        <select
          className="border rounded px-2 py-1"
          value={tempFilters.type || ""}
          onChange={(e) => setTempFilter("type", e.target.value)}
        >
          <option value="">Wszystkie</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      {/* Seniority */}
      <div className="flex flex-col min-w-[140px]">
        <label className="text-xs font-semibold mb-1">Seniority</label>
        <select
          className="border rounded px-2 py-1"
          value={tempFilters.seniority || ""}
          onChange={(e) => setTempFilter("seniority", e.target.value)}
        >
          <option value="">Wszystkie</option>
          {seniorities.map((sen) => (
            <option key={sen} value={sen}>
              {sen}
            </option>
          ))}
        </select>
      </div>
      {/* Branża */}
      <div className="flex flex-col min-w-[140px]">
        <label className="text-xs font-semibold mb-1">Branża</label>
        <select
          className="border rounded px-2 py-1"
          value={tempFilters.industry || ""}
          onChange={(e) => setTempFilter("industry", e.target.value)}
        >
          <option value="">Wszystkie</option>
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </div>
      {/* Widełki płacowe */}
      <div className="flex flex-col min-w-[120px]">
        <label className="text-xs font-semibold mb-1">Wynagrodzenie od</label>
        <input
          type="number"
          className="border rounded px-2 py-1"
          value={tempFilters.salaryFrom || ""}
          onChange={(e) => setTempFilter("salaryFrom", e.target.value ? Number(e.target.value) : "")}
          min={0}
        />
      </div>
      <div className="flex flex-col min-w-[120px]">
        <label className="text-xs font-semibold mb-1">Wynagrodzenie do</label>
        <input
          type="number"
          className="border rounded px-2 py-1"
          value={tempFilters.salaryTo || ""}
          onChange={(e) => setTempFilter("salaryTo", e.target.value ? Number(e.target.value) : "")}
          min={0}
        />
      </div>
      {/* Przycisk Szukaj */}
      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition min-w-[100px]"
      >
        Szukaj
      </button>
      {/* Przycisk Wyczyść */}
      <button
        type="button"
        className="ml-2 text-gray-500 underline text-sm"
        onClick={resetFilters}
      >
        Wyczyść filtry
      </button>
    </form>
  );
} 