# Next Step: Zbudowanie strony app/page.tsx z listą ogłoszeń (fetch z Supabase)

**Cel:**
Wyświetlić na stronie głównej (`app/page.tsx`) listę ogłoszeń pobranych z Supabase, korzystając z komponentu `JobCard`.

**Instrukcja:**
1. Usuń przykładowe użycie `JobCard` z `app/page.tsx`.
2. Zaimplementuj pobieranie wszystkich ogłoszeń z tabeli `jobs` w Supabase (możesz użyć już istniejącego fetchu, ale teraz wyświetl całą listę).
3. Dla każdego ogłoszenia wyświetl komponent `JobCard` z odpowiednimi danymi.
4. Zadbaj o estetyczny układ listy (np. grid lub lista z odstępami, responsywność).
5. Obsłuż przypadek braku danych (komunikat: "Brak ofert pracy").

**Dlaczego to ważne?**
To kluczowy widok aplikacji — użytkownik od razu widzi dostępne oferty pracy. To także podstawa do dalszego rozwoju (filtry, paginacja, szczegóły ogłoszenia).

# Next Step: Dodanie paginacji (Pagination.tsx)

**Cel:**
Zaimplementować paginację listy ogłoszeń na stronie głównej, aby użytkownik mógł przeglądać kolejne strony ofert pracy.

**Instrukcja:**
1. Utwórz komponent `Pagination.tsx` w folderze `components/`.
2. Dodaj do zapytania do Supabase obsługę limitu i offsetu (np. po 10 ogłoszeń na stronę).
3. Wyświetlaj odpowiednią stronę ogłoszeń na podstawie aktualnej strony (możesz użyć parametru w URL lub lokalnego stanu).
4. Dodaj na dole listy prosty komponent paginacji (przyciski "Poprzednia", "Następna", numery stron).
5. Obsłuż przypadki brzegowe (brak poprzedniej/następnej strony, pusta strona).

**Dlaczego to ważne?**
Paginacja poprawia UX i wydajność — użytkownik nie musi ładować wszystkich ogłoszeń naraz, a aplikacja lepiej skaluje się przy większej liczbie ofert.

# Next Step: Filtry ofert pracy (MVP)

**Cel:**
Pozwolić użytkownikowi filtrować listę ogłoszeń po wybranych kryteriach (np. lokalizacja, typ pracy, seniority, branża) z zachowaniem stanu filtrów w URL.

**Instrukcja:**
1. Stwórz hook `useFilters.ts` (zarządzanie stanem filtrów, synchronizacja z URL params).
2. Zbuduj komponent `FilterDialog.tsx` (modal/overlay z polami wyboru filtrów: lokalizacja, typ pracy, seniority, branża, itp.).
3. Dodaj do fetchowania ogłoszeń w Supabase obsługę filtrów na podstawie URL params.
4. Uporządkuj URL params (UX: filtry trzymane w URL, łatwe kopiowanie linku do wyników).
5. Zadbaj o estetyczny wygląd i responsywność (TailwindCSS).
6. Obsłuż przypadek braku wyników po filtracji (komunikat: "Brak ofert spełniających wybrane kryteria").

**Dlaczego to ważne?**
Filtry znacząco poprawiają UX, pozwalają użytkownikom szybko znaleźć interesujące ich oferty i są kluczowe dla skalowalności aplikacji.

# Next Step: Stworzenie strony app/job/[id]/page.tsx (widok szczegółów oferty)

**Cel:**
Zaimplementować stronę szczegółów pojedynczej oferty pracy, dostępną pod adresem `/job/[id]`, która wyświetli wszystkie informacje o wybranej ofercie.

**Instrukcja:**
1. Utwórz plik `app/job/[id]/page.tsx` (dynamiczna ścieżka Next.js App Router).
2. Pobierz dane ogłoszenia z Supabase na podstawie parametru `id` z URL.
3. Wyświetl szczegóły oferty: tytuł, firma, lokalizacja, opis (HTML), widełki płacowe, typ pracy, seniority, branża, data dodania, link źródłowy itp.
4. Zadbaj o estetyczny i czytelny layout (TailwindCSS, responsywność).
5. Obsłuż przypadek braku oferty (np. komunikat "Nie znaleziono oferty").
6. (Opcjonalnie) Dodaj przycisk powrotu do listy lub nawigację.

**Dlaczego to ważne?**
Szczegóły oferty to kluczowy widok dla użytkownika — pozwala zapoznać się z pełną treścią ogłoszenia i podjąć decyzję o aplikowaniu.

# Next Step: Dodanie Navbar i Footer

**Cel:**
Zaimplementować nawigację górną (Navbar) i stopkę (Footer) widoczne na wszystkich stronach aplikacji.

**Instrukcja:**
1. Utwórz komponenty `Navbar.tsx` i `Footer.tsx` w folderze `components/`.
2. Dodaj do `app/layout.tsx` import i użycie tych komponentów, aby były widoczne na wszystkich podstronach.
3. W `Navbar` umieść logo, nazwę serwisu i (opcjonalnie) linki do głównych sekcji (np. Oferty, Panel admina).
4. W `Footer` umieść informacje o serwisie, linki do polityki prywatności, kontaktu itp.
5. Zadbaj o estetyczny wygląd i responsywność (TailwindCSS).

**Dlaczego to ważne?**
Spójna nawigacja i stopka poprawiają UX, ułatwiają poruszanie się po serwisie i budują profesjonalny wizerunek aplikacji.

# Next Step: Flow aplikacji — aplikowanie na ofertę pracy

**Cel:**
Pozwolić użytkownikowi aplikować na wybraną ofertę pracy oraz obsłużyć flow sukcesu/błędu i logowanie aplikacji w bazie.

**Instrukcja:**
1. Stwórz API route `/api/apply` (Next.js API route lub route handler w app/api/apply/route.ts) — endpoint do obsługi aplikowania na ofertę (np. POST z danymi aplikacji).
2. Stwórz stronę `app/apply/success` — komunikat o sukcesie aplikacji.
3. Stwórz stronę `app/apply/error` — komunikat o błędzie aplikacji.
4. Dodaj przycisk "Aplikuj" na stronie szczegółów oferty (`app/job/[id]/page.tsx`), który wywołuje API apply i przekierowuje na success/error.
5. Dodaj logowanie kliknięć/aplikacji do tabeli `applications` w Supabase (zapisz id oferty, e-mail, timestamp, itp.).
6. Zadbaj o walidację danych i obsługę błędów (np. brak e-maila, błąd zapisu).
7. Zadbaj o estetyczny wygląd i UX (feedback, loading, komunikaty).

**Dlaczego to ważne?**
To kluczowy element MVP — użytkownik może realnie aplikować na ofertę, a Ty masz logi aplikacji w bazie. To podstawa do dalszego rozwoju (np. powiadomienia, panel admina, statystyki). 