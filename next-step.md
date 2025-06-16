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