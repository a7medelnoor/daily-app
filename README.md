# Daily

A habit tracker you build with AI in the **Your First App, Built With AI** workshop by [Ahmed Elnoor](https://www.ahmedelnoor.com) · [Infinia Software](https://www.infiniasoftware.ai).

Expo SDK 54 · Expo Router · Supabase (auth + database) · Email, Google and Apple sign-in

## Branches

Each branch is a working checkpoint of the reference app. Stuck on your own app? Compare with the matching branch.

| Branch | What is done | Workshop mission |
|---|---|---|
| `00-start` | Empty app that runs on your phone, brief, rules, prompts | 2 · Setup |
| `01-screens` | Today, New habit, Habit detail (data in memory) | 3 · Screens |
| `02-login` | Supabase auth: email, Google, Apple, Settings, sign out | 4 · Login |
| `03-save-data` | Tables with row-level security, data saved in Supabase | 5 · Save data |
| `boss-fight` | `03-save-data` with three planted bugs | Boss Fight |
| `main` | Account deletion, haptics, store-ready config | 6 · Store-ready |

```bash
git checkout 02-login   # jump to any checkpoint
```

## Build your own app

In the workshop you build **your own idea**. Daily is the reference: each branch shows a working version of one mission.

1. Install the tools: [docs/SETUP-TOOLS.md](docs/SETUP-TOOLS.md)
2. Write your brief with prompt P.1 in [PROMPTS.md](PROMPTS.md), using [docs/BRIEF-TEMPLATE.md](docs/BRIEF-TEMPLATE.md)
3. Start your repo from the starter:

```bash
git clone -b 00-start --single-branch https://github.com/a7medelnoor/daily-app.git my-app
cd my-app
rm -rf .git
git init -b main
git add . && git commit -m "Start from the workshop starter"
gh repo create my-app --private --source=. --push
```

4. Replace `docs/BRIEF.md` with your brief and follow the missions in [PROMPTS.md](PROMPTS.md).

## Run the reference app

You need Node.js 20 or newer, Git, and the **Expo Go** app on your phone.

```bash
git clone https://github.com/a7medelnoor/daily-app.git
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
| [PROMPTS.md](PROMPTS.md) | Every prompt used in the workshop, written for your own app |
| [docs/BRIEF.md](docs/BRIEF.md) | The one-page product brief. The AI reads it before building |
| [AGENTS.md](AGENTS.md) / [CLAUDE.md](CLAUDE.md) | Project rules for Codex, Antigravity and Claude Code |
| [docs/PLANNING.md](docs/PLANNING.md) | Plan and design prompts: ChatGPT, Claude, Gemini, Stitch, UX Pilot, Figma |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | MVVM, project structure, testing |
| [docs/SECURITY.md](docs/SECURITY.md) | Five security layers, attacks and defences |
| [docs/SETUP-TOOLS.md](docs/SETUP-TOOLS.md) | Node, Git, GitHub CLI, AI agents, Expo Go |
| [docs/BRIEF-TEMPLATE.md](docs/BRIEF-TEMPLATE.md) | Blank brief for your own app |
| [docs/SETUP-SUPABASE.md](docs/SETUP-SUPABASE.md) | Supabase, Google and Apple provider setup |
| [docs/ACCOUNTS.md](docs/ACCOUNTS.md) | Apple Developer, Google Play and Expo accounts |

## License

MIT
