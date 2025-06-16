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