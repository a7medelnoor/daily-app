# Prompts

Every prompt used in the workshop, in order. Copy them as they are, then change one thing at a time.

**Where to paste them**

| Tool | Type | How you use it |
|---|---|---|
| Lovable | Cloud, no code | Paste into the chat on lovable.dev. Builds a web app. |
| Replit Agent | Cloud, no code | Pick "Mobile app" on replit.com and paste. Builds an Expo app. |
| Claude Code | Local agent | Run `claude` in this folder. Reads `CLAUDE.md`. |
| Codex | Local agent | Run `codex` in this folder. Reads `AGENTS.md`. |
| Antigravity | Local agent IDE | Open this folder, paste into the Agent Manager. Add `AGENTS.md` as a workspace rule. |

---

## Warm-up · Tool Arena

Paste the same prompt into one cloud tool and one local tool. Compare the results.

```
Build a mobile habit tracker called Daily.
Screens: Today (list of habits, a round check button and a streak count on each row),
New habit (one name field and a Save button), Habit detail (last 7 days as dots and a Delete button).
Minimal, calm design with a violet accent #5B21B6 on an off-white background.
Save data on the device for now.
```

Vote on: which one ran first, which one looks better, which one you could keep building on.

---

## Mission 0 · First Launch

No prompt. Run these commands:

```bash
git clone https://github.com/YOUR-ORG/daily-app.git
cd daily-app
git checkout 00-start
npm install
npx expo start
```

Scan the QR code with Expo Go (iPhone: Camera app, Android: Expo Go app).

**Prompt 0.1 · Get to know the project**

```
Read CLAUDE.md, AGENTS.md, docs/BRIEF.md and package.json.
Explain in 5 short bullets how this project is organised and how to run it.
Do not change any files.
```

---

## Mission 1 · Screens

**Prompt 1.1 · Today screen**

```
Read docs/BRIEF.md.
Build the Today screen in src/app/index.tsx: a list of habits, each row with a round check
button and the current streak. Keep habits in a React context in src/lib/habits-store.tsx,
in memory for now. Use colors from src/theme.ts and dates from src/lib/dates.ts.
Show a friendly empty state when there are no habits.
```

**Prompt 1.2 · New habit screen**

```
Add a New habit screen at src/app/new.tsx, opened as a modal from a + button in the
Today header. One text field (1–60 characters) and a Save button. Saving returns to Today.
```

**Prompt 1.3 · Habit detail screen**

```
Add a Habit detail screen at src/app/habit/[id].tsx: the habit name, the current streak,
the last 7 days as dots, and a Delete button that asks for confirmation first.
Tapping a row on Today opens it.
```

Checkpoint branch: `01-screens`

---

## Mission 2 · Login

Before you start: create a Supabase project and copy `.env.example` to `.env` (see `docs/SETUP-SUPABASE.md`).

**Prompt 2.1 · Supabase client and route guard**

```
Add Supabase auth.
Create src/lib/supabase.ts using EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_KEY,
storing the session in AsyncStorage with the PKCE flow.
Create an AuthProvider and useAuth hook in src/lib/auth.tsx.
In src/app/_layout.tsx use Stack.Protected so signed-out users only see src/app/sign-in.tsx.
```

**Prompt 2.2 · Email sign-in and Settings**

```
Build the sign-in screen: email and password, a switch between "Sign in" and
"Create account", and clear error messages under the form.
Add a Settings screen (gear icon in the Today header) showing the signed-in email
and a Sign out button.
```

**Prompt 2.3 · Google and Apple**

```
Add "Continue with Google": supabase.auth.signInWithOAuth with skipBrowserRedirect,
open it with expo-web-browser openAuthSessionAsync, then exchangeCodeForSession.
The redirect URL comes from expo-linking createURL('auth/callback').
Add "Sign in with Apple" on iOS with expo-apple-authentication and
supabase.auth.signInWithIdToken, using a SHA-256 nonce from expo-crypto.
Hide the Apple button where it is not available. Put both in src/lib/social-auth.ts.
```

Checkpoint branch: `02-login`

---

## Mission 3 · Save data

**Prompt 3.1 · Tables and security**

```
Write a SQL migration in supabase/migrations/: a habits table and a checkins table
(habit_id, day as a date, user_id). Turn on row-level security on both, so each user
can only read and write their own rows. Explain each policy in one line.
```

Run the SQL in Supabase → SQL Editor.

**Prompt 3.2 · Connect the store**

```
Replace the in-memory store in src/lib/habits-store.tsx with Supabase queries.
Keep the same functions so the screens do not change.
Update the check button instantly and roll it back if the request fails.
Reload the data when the signed-in user changes.
```

**Prompt 3.3 · Security review**

```
Review supabase/migrations and src/lib for security problems:
anything one user could read or change for another user, and any secret key inside the app.
List the problems only. Do not fix anything yet.
```

Checkpoint branch: `03-save-data`

---

## Boss Fight · The Red Screen

Switch to the `boss-fight` branch. The app has three planted bugs.

**Prompt B.1 · Read the error**

```
The app shows a red error screen. Here is the full error and stack trace:
[paste the error]
Find the cause, explain it in two sentences, then fix it with the smallest possible change.
```

**Prompt B.2 · The midnight bug**

```
Habits checked between midnight and 4am count for yesterday. Find out why and fix it.
```

**Prompt B.3 · The leak**

```
Sign in as two different users. User B can see User A's habits.
Find the cause in the database or the app and fix it.
```

---

## Mission 4 · Store-ready

**Prompt 4.1 · Account deletion**

```
Add account deletion (App Store guideline 5.1.1(v)): a "Delete account" button in Settings
with a confirmation step. It calls a Supabase Edge Function at
supabase/functions/delete-account that checks who is calling and deletes that user with
the service role key on the server. The app never sees the service role key.
```

**Prompt 4.2 · Polish**

```
Polish the app: haptic feedback when a habit is checked, loading and error states on every
screen, and a friendly empty state. Set the app name, bundle identifier
com.<yourname>.daily and Android package in app.json.
```

**Prompt 4.3 · Final check**

```
Run npx tsc --noEmit and npx expo-doctor. Fix every problem, then summarise what you changed
in 3 bullets.
```

Final branch: `main`

---

## Rescue prompts (use any time)

```
Stop. Undo your last change and explain what you were trying to do.
```

```
Before writing code, write a 5-step plan and wait for my OK.
```

```
That fixed one thing and broke another. Compare with the last git commit and fix only the new problem.
```
