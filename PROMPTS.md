# Prompts

Every prompt from the workshop, in order. You build **your own app idea**. Daily (this repo) is the reference app: if you get stuck, compare with its branches.

No idea yet? Build Daily. Its brief is already in `docs/BRIEF.md`.

Words in [brackets] are yours to fill in.

**Where to paste them**

| Tool | Type | How you use it |
|---|---|---|
| ChatGPT · Claude · Gemini | Chat | Planning: brief and UI spec |
| Google Stitch · UX Pilot | Design | Screen designs from a prompt |
| Lovable | Cloud, no code | Paste into lovable.dev. Builds a web app |
| Replit Agent | Cloud, no code | Choose a mobile app on replit.com. Builds an Expo app |
| Claude Code | Local agent | Run `claude` in your project folder. Reads `CLAUDE.md` |
| Codex | Local agent | Run `codex` in your project folder. Reads `AGENTS.md` |
| Antigravity | Local agent IDE | Open your folder, use the Agent Manager. Add `AGENTS.md` as a workspace rule |

---

## Mission 1 · Your idea

**P.1 · The brief** (ChatGPT, Claude or Gemini)

```
You are a senior product manager. My app idea: [one sentence].
Ask me 5 questions first. Then write a one-page brief in Markdown: target user, problem,
3–5 screens (what each shows and what the user can do), the data we save,
and what is out of scope for version 1.
```

**P.2 · The UI spec**

```
Turn this brief into a UI spec: for each screen list the components top to bottom,
the empty, loading and error states, and the main action.
Suggest a calm color palette and type scale. Keep it to one page.
```

**D.1 · Screen designs** (Google Stitch or UX Pilot)

```
[App name]: [one sentence]. Design the [main screen]: [what it shows].
Calm and minimal, [accent color] accent on an off-white background, generous spacing, iOS style.
```

Save the brief as `docs/BRIEF.md` (template: [docs/BRIEF-TEMPLATE.md](docs/BRIEF-TEMPLATE.md)) and export your screen designs as images.

---

## Tool Arena

Paste your brief into one cloud tool (Lovable or Replit) and one local tool (Claude Code, Codex or Antigravity):

```
Build the mobile app described below. Start with the main screen only.
Calm, minimal design. Save data on the device for now.
[paste your brief]
```

---

## Mission 2 · Setup

Install once: Node.js LTS, Git, GitHub CLI, an editor (VS Code or Antigravity), Claude Code or Codex, and Expo Go on your phone. See [docs/SETUP-TOOLS.md](docs/SETUP-TOOLS.md).

```bash
git clone -b 00-start --single-branch https://github.com/a7medelnoor/daily-app.git my-app
cd my-app
rm -rf .git
git init -b main
git add . && git commit -m "Start from the workshop starter"
gh repo create my-app --private --source=. --push
npm install
npx expo start
```

Replace `docs/BRIEF.md` with your own brief.

**0.1 · Make it mine**

```
I replaced docs/BRIEF.md with the brief for my own app. Read it, then:
rename the app in app.json (name, slug, scheme, bundle identifier com.[me].[app], Android package),
update the "This project" section in AGENTS.md, and change the home screen text.
Do not build any features yet.
```

Commit and push after every step that works:

```bash
git add . && git commit -m "what you did" && git push
```

---

## Mission 3 · Screens

**1.1 · First screen**

```
Read docs/BRIEF.md. Build the [main screen] in src/app/index.tsx.
Keep the data in a React context in src/lib/store.tsx, in memory for now.
Use colors from src/theme.ts. Show empty, loading and error states.
```

**1.2 · Next screen** (repeat for each screen in your brief)

```
Build the [screen name] screen described in docs/BRIEF.md at src/app/[name].tsx.
Open it from [previous screen]. Reuse the components in src/components.
```

**1.3 · Match the design** (attach your exported design image)

```
Make this screen match the attached image. Use colors from src/theme.ts.
Do not add features that are not in the image.
```

Reference: branch `01-screens`.

---

## Mission 4 · Login

Before you start: create a Supabase project and copy `.env.example` to `.env` (see [docs/SETUP-SUPABASE.md](docs/SETUP-SUPABASE.md)).

**2.1 · Supabase client and route guard**

```
Add Supabase auth.
Create src/lib/supabase.ts using EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_KEY,
storing the session in AsyncStorage with the PKCE flow.
Create an AuthProvider and useAuth hook in src/lib/auth.tsx.
In src/app/_layout.tsx use Stack.Protected so signed-out users only see src/app/sign-in.tsx.
```

**2.2 · Email sign-in and Settings**

```
Build the sign-in screen: email and password, a switch between "Sign in" and
"Create account", and clear error messages under the form.
Add a Settings screen (gear icon in the main screen header) showing the signed-in email
and a Sign out button.
```

**2.3 · Google and Apple**

```
Add "Continue with Google": supabase.auth.signInWithOAuth with skipBrowserRedirect,
open it with expo-web-browser openAuthSessionAsync, then exchangeCodeForSession.
The redirect URL comes from expo-linking createURL('auth/callback').
Add "Sign in with Apple" on iOS with expo-apple-authentication and
supabase.auth.signInWithIdToken, using a SHA-256 nonce from expo-crypto.
Hide the Apple button where it is not available. Put both in src/lib/social-auth.ts.
```

Reference: branch `02-login`.

---

## Mission 5 · Save data

**3.1 · Tables and security**

```
Read the Data section of docs/BRIEF.md. Write a SQL migration in supabase/migrations/
with one table per item, each with a user_id. Turn on row-level security on every table,
so each user can only read and write their own rows. Explain each policy in one line.
```

Run the SQL in Supabase → SQL Editor.

**3.2 · Connect the store**

```
Replace the in-memory store in src/lib/store.tsx with Supabase queries.
Keep the same functions so the screens do not change.
Update the screen instantly and roll back if the request fails.
Reload the data when the signed-in user changes.
```

**3.3 · Security review**

```
Review supabase/migrations and src/lib for security problems:
anything one user could read or change for another user, and any secret key inside the app.
List the problems only. Do not fix anything yet.
```

Reference: branch `03-save-data`.

---

## Boss Fight · The Red Screen

Everyone uses the same reference app for this one:

```bash
git clone https://github.com/a7medelnoor/daily-app.git
cd daily-app
git checkout boss-fight
npm install
```

**B.1 · Read the error**

```
The app shows a red error screen. Here is the full error and stack trace:
[paste the error]
Find the cause, explain it in two sentences, then fix it with the smallest possible change.
```

**B.2 · The midnight bug**

```
Habits checked between midnight and 4am count for yesterday. Find out why and fix it.
```

**B.3 · The leak**

```
Sign in as two different users. User B can see User A's habits.
Find the cause in the database or the app and fix it.
```

---

## Mission 6 · Store-ready

**4.1 · Account deletion**

```
Add account deletion (App Store guideline 5.1.1(v)): a "Delete account" button in Settings
with a confirmation step. It calls a Supabase Edge Function at
supabase/functions/delete-account that checks who is calling and deletes that user with
the service role key on the server. The app never sees the service role key.
```

**4.2 · Polish**

```
Polish the app: haptic feedback on the main action, loading and error states on every
screen, and a friendly empty state. Check the app name, bundle identifier and
Android package in app.json.
```

**4.3 · Final check**

```
Run npx tsc --noEmit and npx expo-doctor. Fix every problem, then summarise what you changed
in 3 bullets.
```

Reference: branch `main`.

---

## Architecture and security

Test prompt: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). Security review prompt: [docs/SECURITY.md](docs/SECURITY.md).

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
