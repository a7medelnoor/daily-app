# Install your tools

Do this before the session. It takes about 20 minutes on good Wi-Fi.

## What to install

| Tool | Why | Check it works |
|---|---|---|
| Node.js (LTS) | Runs Expo and the AI agents | `node -v` |
| Git | Saves every version of your code | `git --version` |
| GitHub CLI | Creates your repo and pushes from the terminal | `gh --version` |
| VS Code or Antigravity | Editor to read and change code | Opens your folder |
| Claude Code or Codex | The AI agent that builds with you | `claude` or `codex` |
| Expo Go (phone) | Runs your app by scanning a QR code | App Store or Google Play |

### macOS (with Homebrew)

```bash
brew install node git gh
npm install -g @anthropic-ai/claude-code   # or: npm install -g @openai/codex
```

### Windows

```bash
winget install OpenJS.NodeJS.LTS Git.Git GitHub.cli
npm install -g @anthropic-ai/claude-code   # or: npm install -g @openai/codex
```

Optional: the Flutter SDK if you want to try the same app in Flutter (flutter.dev).

## Accounts (all free)

- **GitHub** — github.com
- **Supabase** — supabase.com
- **Expo** — expo.dev
- An AI plan for Claude Code (Anthropic) or Codex (OpenAI). Antigravity signs in with a Google account.

## One-time Git setup

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
gh auth login
```

## Start your own app from the workshop starter

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

## Save your work

Commit after every step that works, then push to GitHub:

```bash
git add .
git commit -m "Sign-in screen works"
git push
```
