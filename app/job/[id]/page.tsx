import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';

interface JobDetailsProps {
  params: { id: string };
}

export default async function JobDetails({ params }: JobDetailsProps) {
  const { id } = params;
  let job = null;
  let error = null;
  try {
    const { data, error: fetchError } = await supabase.from('jobs').select('*').eq('id', id).single();
    job = data;
    error = fetchError;
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  if (error || !job) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-red-600 font-bold mb-4">Nie znaleziono oferty lub wystąpił błąd.</div>
        <Link href="/" className="text-blue-600 underline">Powrót do listy ofert</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <Link href="/" className="text-blue-600 underline mb-4 inline-block">&larr; Powrót do listy ofert</Link>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl">🏢</div>
        <div>
          <h1 className="text-2xl font-bold mb-1">{job.title}</h1>
          <div className="text-gray-700">{job.company_name}{job.location && ` • ${job.location}`}</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4 text-xs text-gray-500">
        {job.remote_type && <span className="px-2 py-0.5 bg-gray-100 rounded">{job.remote_type}</span>}
        {job.seniority && <span className="px-2 py-0.5 bg-gray-100 rounded">{job.seniority}</span>}
        {job.industry && <span className="px-2 py-0.5 bg-gray-100 rounded">{job.industry}</span>}
        {job.salary_from && job.salary_to && (
          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded">
            {job.salary_from} - {job.salary_to} {job.currency}
          </span>
        )}
      </div>
      <div className="prose prose-sm max-w-none mb-4" dangerouslySetInnerHTML={{ __html: job.description_html || '' }} />
      <div className="text-xs text-gray-400 mb-2">Dodano: {job.created_at ? new Date(job.created_at).toLocaleDateString() : ''}</div>
      {job.source_url && (
        <a href={job.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">Zobacz oryginalne ogłoszenie</a>
      )}
    </div>
  );
} 