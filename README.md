# Daily

A habit tracker you build with AI in the **Your First App, Built With AI** workshop by Infinia Academy.

Expo SDK 54 · Expo Router · Supabase (auth + database) · Email, Google and Apple sign-in

## Branches

Each mission has a checkpoint branch. Stuck? Jump to the next one and keep going.

| Branch | What is done | Mission |
|---|---|---|
| `00-start` | Empty app that runs on your phone, brief, rules, prompts | 0 · First Launch |
| `01-screens` | Today, New habit, Habit detail (data in memory) | 1 · Screens |
| `02-login` | Supabase auth: email, Google, Apple, Settings, sign out | 2 · Login |
| `03-save-data` | Tables with row-level security, data saved in Supabase | 3 · Save data |
| `boss-fight` | `03-save-data` with three planted bugs | Boss Fight |
| `main` | Account deletion, haptics, store-ready config | 4 · Store-ready |

```bash
git checkout 02-login   # jump to any checkpoint
```

## Quick start

You need Node.js 20 or newer, Git, and the **Expo Go** app on your phone.

```bash
git clone https://github.com/YOUR-ORG/daily-app.git
cd daily-app
git checkout 00-start
npm install
npx expo start
```

Scan the QR code. iPhone: Camera app. Android: Expo Go.

From `02-login` onwards you also need a `.env` file: copy `.env.example` and follow [docs/SETUP-SUPABASE.md](docs/SETUP-SUPABASE.md).

> The project is pinned to Expo SDK 54 because that is the Expo Go version in the App Store and Google Play. Do not upgrade during the workshop.

## Files to know

| File | Why |
|---|---|
| [PROMPTS.md](PROMPTS.md) | Every prompt used in the workshop, in order |
| [docs/BRIEF.md](docs/BRIEF.md) | The one-page product brief. The AI reads it before building |
| [AGENTS.md](AGENTS.md) / [CLAUDE.md](CLAUDE.md) | Project rules for Codex, Antigravity and Claude Code |
| [docs/GAME.md](docs/GAME.md) | XP, badges and lifelines |
| [docs/SETUP-SUPABASE.md](docs/SETUP-SUPABASE.md) | Supabase, Google and Apple provider setup |
| [docs/ACCOUNTS.md](docs/ACCOUNTS.md) | Apple Developer, Google Play and Expo accounts |
| [docs/STORE-CHECKLIST.md](docs/STORE-CHECKLIST.md) | Everything to check before you submit |

## License

MIT
