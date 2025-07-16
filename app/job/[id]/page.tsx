import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';
import ApplyForm from '../../../components/ApplyForm';

interface JobDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetails({ params }: JobDetailsProps) {
  const { id } = await params;
  const { data: job, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !job) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <h2 className="text-xl font-bold mb-4">Nie znaleziono oferty</h2>
        <Link href="/" className="text-blue-700 underline">Wróć do listy ofert</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
        <div className="text-gray-600 mb-2">{job.company_name} • {job.location}</div>
        <div className="mb-2">
          <span className="inline-block bg-gray-100 rounded px-2 py-1 text-xs mr-2">{job.remote_type}</span>
          <span className="inline-block bg-gray-100 rounded px-2 py-1 text-xs mr-2">{job.seniority}</span>
          <span className="inline-block bg-gray-100 rounded px-2 py-1 text-xs">{job.industry}</span>
        </div>
        <div className="mb-2 text-sm text-gray-500">
          {job.salary_from && job.salary_to ? (
            <span>{job.salary_from} - {job.salary_to} {job.currency || 'PLN'}</span>
          ) : (
            <span>Wynagrodzenie: nie podano</span>
          )}
        </div>
        <div className="mb-2 text-xs text-gray-400">Dodano: {job.created_at?.slice(0, 10)}</div>
        <div className="mt-4 text-gray-800 text-sm whitespace-pre-line">
          {job.description || 'Brak opisu.'}
        </div>
      </div>
      {/* Formularz aplikacji */}
      <ApplyForm job={job} />
    </div>
  );
} 