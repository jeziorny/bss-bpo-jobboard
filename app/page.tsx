"use client";

import FilterBar from "../components/FilterBar";
import JobListWithPagination from "../components/JobListWithPagination";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 w-full max-w-6xl mx-auto flex flex-col items-center px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Oferty pracy BSS/BPO</h1>
        <section className="w-full flex flex-col items-center mb-8">
          <FilterBar />
        </section>
        <section className="w-full flex flex-col items-center">
          <JobListWithPagination />
        </section>
      </main>
      <footer className="w-full flex justify-center items-center py-8 mt-8 bg-transparent">
        <Footer />
      </footer>
    </div>
  );
}
