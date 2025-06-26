Plan budowy MVP krok po kroku

Zasady

Każde zadanie bardzo małe i możliwe do przetestowania

Każde zadanie ma wyraźny początek i koniec

Każde zadanie skupia się na jednym zagadnieniu

Zadania

1. Setup i baza

Utworzenie repozytorium na GitHub.

Stworzenie projektu Next.js (create-next-app).

Konfiguracja TailwindCSS.

Utworzenie projektu Supabase.

Konfiguracja połączenia Supabase w Next.js (supabaseClient.ts).

Utworzenie tabeli jobs w Supabase.

Utworzenie tabeli applications w Supabase.

Skonfigurowanie Supabase Auth (Email login).

2. Frontend MVP

Stworzenie komponentu JobCard.tsx.

Zbudowanie strony app/page.tsx z listą ogłoszeń (fetch z Supabase).

Dodanie paginacji (Pagination.tsx).

Stworzenie strony app/job/[id]/page.tsx (widok szczegółów oferty).

Dodanie Navbar i Footer.

3. Filtry

Stworzenie hooka useFilters.ts.

Zbudowanie komponentu FilterDialog.tsx (modal overlay).

Implementacja filtrowania danych (fetch z Supabase na podstawie URL params).

Uporządkowanie URL params (UX: filtry trzymane w URL).

4. Flow aplikacji

Stworzenie API route /api/apply.

Stworzenie strony app/apply/success.

Stworzenie strony app/apply/error.

Zaimplementowanie przycisku Apply na stronie oferty.

Dodanie logowania kliknięć w tabeli applications.

5. Admin Panel MVP

Stworzenie /admin/login (Supabase Auth).

Stworzenie /admin/dashboard (pokaz liczby ofert, liczba applications).

Stworzenie /admin/jobs (CRUD - minimalna wersja).

Dodanie możliwości edycji is_scraped.

6. Scraper MVP

Utworzenie katalogu /scraper/.

Stworzenie scraper/index.js - baza.

Stworzenie scraper/sites/pracuj.js - scraper dla 1 serwisu.

Stworzenie funkcji zapisującej dane do jobs (Supabase REST).

Zaimplementowanie harmonogramu CRON (scheduler.js).

Podpięcie testowego triggera z Admin Panelu.

7. Finalizacja MVP V1

Przegląd całego flow end-to-end.

Testowanie UX filtrów.

Testowanie kliknięć i aplikacji.

Testowanie scraper → DB → FE.

Wdrożenie na produkcję (Vercel + Supabase).

# Różnice względem checklisty

- Komunikaty sukcesu/błędu po aplikacji są wyświetlane inline na stronie szczegółów oferty, a nie na osobnych stronach `app/apply/success` i `app/apply/error`. Jest to zgodne z decyzją UX podjętą w trakcie implementacji (lepszy, szybszy feedback dla użytkownika).