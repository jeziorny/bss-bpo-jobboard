# Next Step: Utworzenie tabeli applications w Supabase

**Cel:**
Stworzyć tabelę `applications` w bazie danych Supabase, zgodnie z wymaganiami architektury projektu.

**Instrukcja:**
1. Zaloguj się do panelu Supabase i wybierz swój projekt.
2. W menu po lewej wybierz **Database → Tables**.
3. Kliknij **"New Table"**.
4. Uzupełnij dane:
   - **Table Name:** `applications`
   - **ID:** `id` (typ: UUID, Primary Key, default: `gen_random_uuid()` lub `uuid_generate_v4()`)
   - Dodaj pozostałe kolumny, np.:
     - `job_id`: uuid (foreign key do jobs.id)
     - `user_email`: text
     - `applied_at`: timestamp (default: now())
     - (opcjonalnie: inne pola, np. status, message, itp.)
5. Kliknij **"Save"** lub **"Create Table"**.

**Przykładowy skrypt SQL:**

```sql
create table public.applications (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid references public.jobs(id) on delete cascade,
  user_email text,
  applied_at timestamp with time zone default timezone('utc', now())
);
```

**Dlaczego to ważne?**
Tabela `applications` pozwala rejestrować aplikacje użytkowników na oferty pracy i jest niezbędna do dalszego rozwoju funkcjonalności serwisu. 