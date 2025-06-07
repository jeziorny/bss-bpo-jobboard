Architektura systemu — Agregator Ofert Pracy BPO/BSS

Technologie

Frontend: Next.js (React 18, app router, Server Components)

Baza danych: Supabase (Postgres + Realtime + Auth)

Uwierzytelnianie: Supabase Auth (Email, Magic Link, opcjonalnie OAuth)

Admin Panel: Next.js app /admin (lub osobna aplikacja Next.js na subdomenie admin.)

Scraper: Node.js + Puppeteer/Cheerio + CRON job + Supabase Client

Hosting: Vercel / Netlify (Next.js) + Supabase

Struktura plików i folderów

/agregator-pracy-bss
🔼🕼 app/                            # App Router (Next.js 14+)
🔼🕼 components/                     # Reusable React components
🔼🕼 lib/                            # Utilities / hooks / API clients
🔼🕼 types/                          # TypeScript types
🔼🕼 public/                         # Static assets (images, logos, etc.)
🔼🕼 styles/                         # Global CSS / Tailwind config
🔼🕼 admin/                          # Admin Panel (can be part of main app or separate)
🔼🕼 scraper/                        # Scraper microservice
🔼🕼 .env.local                      # Environment variables
🔼🕼 package.json
🔼🕼 README.md

Opis funkcji każdego elementu

Frontend (app/)

app/page.tsx — Landing page, listing ofert (paginacja, nieskończony scroll lub klasyczny paging).

app/job/[id]/page.tsx — Strona pojedynczego ogłoszenia pracy.

app/filters/ — Modal/dialog do wyboru filtrów.

app/apply/ — Strona informująca o sukcesie lub błędzie po aplikacji.

components/

JobCard.tsx — Wizualizacja pojedynczego ogłoszenia na liście.

FilterDialog.tsx — Dialog/modal do wyboru filtrów.

JobFilters.tsx — Komponent filtrów (na overlay lub w sidebarze).

Pagination.tsx — Komponent paginacji lub Infinite Scroll.

Navbar.tsx, Footer.tsx — Standardowa nawigacja.

lib/

supabaseClient.ts — Wrapper na Supabase JS Client — inicjalizacja i config.

api.ts — Klient API do komunikacji (Next.js API routes / Supabase REST).

useFilters.ts — Custom hook obsługujący stan filtrów (React state + URL params).

types/

job.ts — Typy dla ofert pracy (JobOffer).

user.ts — Typy dla userów (User, AdminUser).

filters.ts — Typy dla filtrów (Geo, Branża, SalaryRange, RemoteType, Seniority).

admin/app/

login/ — Logowanie adminów (Supabase Auth).

dashboard/ — Panel główny — statystyki + lista ofert.

jobs/ — CRUD (Create, Read, Update, Delete) dla ogłoszeń.

scrapers/ — Możliwość ręcznego uruchomienia scraperów lub podgląd logów.

scraper/

index.js — Uruchamia scrapowanie.

sites/ — Każdy serwis docelowy (np. pracuj.js, rocketjobs.js).

utils/ — Funkcje do czyszczenia HTML, wyciągania dat, itd.

scheduler.js — Harmonogram CRON do cyklicznego scrapowania (np. raz dziennie).

Przechowywanie stanu i komunikacja usług

Stan aplikacji

Warstwa

Stan

Mechanizm

Frontend (filters)

Local state / URL params

React state + URL query params

Frontend (user session)

Supabase Auth session

Supabase JS client (context)

Frontend (job listing)

Server-side fetch

SSR/ISR lub client-side fetch

Admin panel

Auth session + API fetch

Supabase Auth + direct DB API

Scraper

Brak stanu własnego

Pisze bezpośrednio do bazy

Komunikacja

Frontend → DB:poprzez Supabase client (direct), np. supabase.from('jobs').select(...)

Frontend → API routes (opcjonalnie):np. /api/apply → obsługa aplikacji na ofertę (jeśli chcesz logować clicki)

Admin → DB:Supabase client, pełne uprawnienia (role-based Auth).

Scraper → DB:Node.js script → Supabase REST API lub Supabase JS client → jobs table.

Przykładowe tabele w DB (Supabase/Postgres)

jobs

Column

Type

id

UUID (PK)

title

text

description_html

text

company_name

text

location

text

salary_from

integer

salary_to

integer

currency

text

remote_type

enum (onsite/hybrid/remote)

seniority

enum (junior/mid/senior/lead)

industry

text

source_url

text

created_at

timestamp

updated_at

timestamp

is_scraped

boolean

users (Supabase Auth)

Automatycznie zarządzane przez Supabase.

applications (opcjonalne — do trackingu kliknięć/aplikacji)

Column

Type

id

UUID (PK)

job_id

FK → jobs.id

user_email

text

applied_at

timestamp

📂 Przepływ danych — schemat

+------------+                +----------------+                  +------------+
|  User FE   | <------------> |  Supabase DB   | <---------------> |  Admin FE  |
|  Next.js   |                | Postgres + API |                  |  Next.js   |
+------------+                +----------------+                  +------------+
        ^                             ^
        |                             |
        |                             |
        v                             v
+------------+                +----------------+
| Scraper    | --------------> | Supabase DB    |
| Node.js    |                | Postgres Table |
+------------+                +----------------+

Przykład typowego flow użytkownika

User wchodzi na stronę — widzi listę ofert (SSR lub Client Fetch).2️⃣ System proponuje overlay do ustawienia filtrów (obowiązkowy krok).3️⃣ User wybiera filtr → URL params aktualizowane → refetch danych.4️⃣ Kliknięcie oferty → przejście do /job/[id].5️⃣ Aplikacja (jeśli istnieje flow aplikowania) → /apply/success lub /apply/error.

Wersje rozwojowe

Etap

Funkcjonalność

V1

Podstawowy frontend + Supabase + ręczny admin + scraper

V2

Zaawansowane filtry + SEO + cache + automatyzacja scrapera

V3

Tracking aplikacji + personalizacja feedu + alerty e-mailowe

📅 Plan budowy MVP krok po kroku (tasks.md)

Zasady:

Każde zadanie bardzo małe i możliwe do przetestowania

Każde zadanie ma wyraźny początek i koniec

Każde zadanie skupia się na jednym zagadnieniu

Zadania:

Setup i baza

Utworzenie repozytorium na GitHub.

Stworzenie projektu Next.js (create-next-app).

Konfiguracja TailwindCSS.

Utworzenie projektu Supabase.

Konfiguracja połączenia Supabase w Next.js (supabaseClient.ts).

Utworzenie tabeli jobs w Supabase.

Utworzenie tabeli applications w Supabase.

Skonfigurowanie Supabase Auth (Email login).

Frontend MVP

Stworzenie komponentu JobCard.tsx.

Zbudowanie strony app/page.tsx z listą ogłoszeń (fetch z Supabase).

Dodanie paginacji (Pagination.tsx).

Stworzenie strony app/job/[id]/page.tsx (widok szczegółów oferty).

Dodanie Navbar + Footer.

Filtry

Stworzenie hooka useFilters.ts.

Zbudowanie komponentu FilterDialog.tsx (modal overlay).

Implementacja filtrowania danych (fetch z Supabase na podstawie URL params).

Uporządkowanie URL params (UX: filtry trzymane w URL).

Flow aplikacji

Stworzenie API route /api/apply.

Stworzenie strony app/apply/success.

Stworzenie strony app/apply/error.

Zaimplementowanie przycisku Apply na stronie oferty.

Dodanie logowania kliknięć w tabeli applications.

Admin Panel MVP

Stworzenie /admin/login (Supabase Auth).

Stworzenie /admin/dashboard (pokaz liczby ofert, liczba applications).

Stworzenie /admin/jobs (CRUD - minimalna wersja).

Dodanie możliwości edycji is_scraped.

Scraper MVP

Utworzenie katalogu /scraper/.

Stworzenie scraper/index.js - baza.

Stworzenie scraper/sites/pracuj.js - scraper dla 1 serwisu.

Stworzenie funkcji zapisującej dane do jobs (Supabase REST).

Zaimplementowanie harmonogramu CRON (scheduler.js).

Podpięcie testowego triggera z Admin Panelu.

Finalizacja MVP V1

Przegląd całego flow end-to-end.

Testowanie UX filtrów.

Testowanie kliknięć i aplikacji.

Testowanie scraper -> DB -> FE.

Wdrożenie na produkcję (Vercel + Supabase).