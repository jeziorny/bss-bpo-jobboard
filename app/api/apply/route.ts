import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const jobId = formData.get('jobId');
    const email = formData.get('email');
    const cv = formData.get('cv'); // File lub null
    const userAgent = req.headers.get('user-agent') || '';
    const ip = req.headers.get('x-forwarded-for') || req.ip || '';
    const timestamp = new Date().toISOString();

    if (!jobId || !email) {
      return NextResponse.json({ error: 'Brak wymaganych danych.' }, { status: 400 });
    }
    // Walidacja e-maila
    if (typeof email !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: 'Nieprawidłowy e-mail.' }, { status: 400 });
    }

    // (Opcjonalnie) obsługa uploadu CV do Supabase Storage — do wdrożenia później
    let cvUrl = null;
    if (cv && typeof cv === 'object' && 'name' in cv) {
      // TODO: upload pliku do Supabase Storage i pobranie URL
      // cvUrl = ...
    }

    // Zapis do tabeli applications
    const { error } = await supabase.from('applications').insert([
      {
        job_id: jobId,
        email,
        cv_url: cvUrl,
        user_agent: userAgent,
        ip,
        created_at: timestamp,
      },
    ]);
    if (error) {
      return NextResponse.json({ error: 'Błąd zapisu do bazy.' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Błąd serwera.' }, { status: 500 });
  }
} 