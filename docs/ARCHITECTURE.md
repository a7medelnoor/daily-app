# Architecture

Three promises: **scalable** (add features and users without rewrites), **maintainable** (anyone finds the right file and changes it safely), **testable** (each piece is checked on its own).

## MVVM in this app

| Layer | Job | In this repo |
|---|---|---|
| View | Screens and components. Shows state, sends taps | `src/app/`, `src/components/` |
| ViewModel | State and actions a screen needs | `useHabits()` in `src/lib/habits-store.tsx` |
| Model | Data types and the calls that fetch or save them | Supabase queries in `habits-store.tsx` |
| Backend | Database, auth, server code | Supabase, RLS policies, Edge Functions |

Rule: screens never call Supabase directly. Swap Supabase for Firebase and only the Model changes.

Flutter equivalent: Widgets → a Riverpod `Notifier` (or a Bloc) → a Repository class.

## Where the structure grows

```
src/
  app/               screens (View)
  components/        shared UI
  features/habits/
    useHabits.ts     ViewModel
    habits.repo.ts   data access (Model)
    habits.test.ts   tests
  lib/               supabase, auth, dates
  theme.ts           design tokens
supabase/
  migrations/        tables + RLS
  functions/         server code, secrets
```

- One folder per feature.
- Screens stay thin.
- Business logic in pure functions (like `streak()` in `src/lib/dates.ts`), so it can be tested without the app.
- Secrets only in `supabase/functions`.

## Testing

| Level | Checks | Tool |
|---|---|---|
| Unit | One function, no app | Jest |
| Component | One screen with fake data | React Native Testing Library |
| End-to-end | Tap through the real app | Maestro |

First test prompt:

```
Write Jest tests for streak() in src/lib/dates.ts. Cover: no check-ins, today done,
today not done but yesterday done, and a gap of one day.
```
