import Image from "next/image";
import styles from "./page.module.css";
import { supabase } from "../lib/supabaseClient";
import JobCard from "../components/JobCard";

export default async function Home() {
  // Testowy fetch do Supabase
  let jobs = null;
  let error = null;
  try {
    const { data, error: fetchError } = await supabase.from("jobs").select("*").limit(5);
    jobs = data;
    error = fetchError;
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
        {/* Testowy blok Supabase */}
        <div className="bg-blue-100 text-blue-900 p-4 rounded mb-4">
          <div className="font-bold mb-2">Test połączenia z Supabase:</div>
          {error && <div className="text-red-600">Błąd: {typeof error === 'string' ? error : JSON.stringify(error)}</div>}
          {jobs && Array.isArray(jobs) && jobs.length > 0 ? (
            <ul>
              {jobs.map((job: any) => (
                <li key={job.id}>{job.title || JSON.stringify(job)}</li>
              ))}
            </ul>
          ) : (
            <div>Brak danych lub tabela nie istnieje.</div>
          )}
        </div>
        {/* Przykładowy JobCard */}
        <div className="my-8">
          <JobCard
            title="Junior Frontend Developer"
            company_name="Example Corp"
            location="Warszawa"
            salary_from={7000}
            salary_to={10000}
            currency="PLN"
            remote_type="remote"
            seniority="junior"
            industry="IT"
            created_at={new Date().toISOString()}
          />
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
