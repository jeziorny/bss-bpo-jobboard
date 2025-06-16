import React from "react";

export type JobCardProps = {
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
};

export const JobCard: React.FC<JobCardProps> = ({
  title,
  company_name,
  location,
  salary_from,
  salary_to,
  currency = "PLN",
  remote_type,
  seniority,
  industry,
  created_at,
  logoUrl,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md border border-gray-100 transition-all">
      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
        {logoUrl ? (
          <img src={logoUrl} alt={company_name} className="w-full h-full object-contain" />
        ) : (
          <span className="text-2xl text-gray-400">🏢</span>
        )}
      </div>
      <div className="flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {seniority && (
            <span className="ml-2 px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 font-medium">
              {seniority}
            </span>
          )}
        </div>
        <div className="text-gray-700 text-sm mt-1">{company_name}{location && ` • ${location}`}</div>
        <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-500">
          {remote_type && <span className="px-2 py-0.5 bg-gray-100 rounded">{remote_type}</span>}
          {industry && <span className="px-2 py-0.5 bg-gray-100 rounded">{industry}</span>}
          {salary_from && salary_to && (
            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded">
              {salary_from} - {salary_to} {currency}
            </span>
          )}
        </div>
        {created_at && (
          <div className="text-xs text-gray-400 mt-2">Dodano: {new Date(created_at).toLocaleDateString()}</div>
        )}
      </div>
    </div>
  );
};

export default JobCard; 