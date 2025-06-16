# Next Step: Konfiguracja Supabase Auth (Email login)

**Cel:**
Skonfigurować uwierzytelnianie użytkowników przez email w Supabase oraz przygotować aplikację do obsługi logowania.

**Instrukcja:**
1. Wejdź do panelu Supabase i wybierz swój projekt.
2. W menu po lewej wybierz **Authentication → Providers**.
3. W sekcji **Email** upewnij się, że opcja **Enable email sign-ups** jest włączona.
4. (Opcjonalnie) Skonfiguruj magic link lub inne opcje (np. email templates, redirect URLs).
5. Zapisz zmiany.
6. W aplikacji Next.js przygotuj obsługę logowania przez Supabase Auth (np. za pomocą pakietu `@supabase/supabase-js` i funkcji `signInWithOtp` lub `signInWithPassword`).

**Dlaczego to ważne?**
Uwierzytelnianie użytkowników jest niezbędne do obsługi aplikacji na oferty pracy, panelu admina oraz personalizacji doświadczenia użytkownika. 