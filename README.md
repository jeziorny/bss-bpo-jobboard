# BSS/BPO Jobboard

Agregator ofert pracy w sektorze BSS/BPO. Projekt MVP oparty o Next.js (App Router, TypeScript, TailwindCSS) i Supabase (Postgres, Auth).

## Konfiguracja Supabase

Utwórz plik `.env.local` w katalogu głównym projektu i dodaj:

```
NEXT_PUBLIC_SUPABASE_URL=twoj_url_z_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=twoj_anon_key_z_supabase
```

Klucze znajdziesz w panelu Supabase: Project Settings → API.

## Struktura projektu

- Frontend: Next.js (App Router)
- Baza danych: Supabase (Postgres)
- Uwierzytelnianie: Supabase Auth (Email)

## Uruchomienie

```bash
npm install
npm run dev
```

Aplikacja będzie dostępna na http://localhost:3000
