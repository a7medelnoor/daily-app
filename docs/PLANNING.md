# Plan and design before you build

Most AI-built apps get stuck because nobody planned them. Use this order:

| Stage | Tools | Output |
|---|---|---|
| 1. Plan | ChatGPT, Claude or Gemini | `docs/BRIEF.md` |
| 2. Design | Miro (flow), Google Stitch or UX Pilot (screens), Figma (polish) | Screen images |
| 3. Build | Lovable, Replit, Claude Code, Codex or Antigravity | Code in Git |
| 4. Check | Expo Go, tests, a security review prompt | A working build |
| 5. Ship | EAS, App Store Connect, Google Play Console | A store listing |

## Prompt P.1 · The brief (any chat model)

```
You are a senior product manager. My app idea: [one sentence].
Ask me 5 questions first. Then write a one-page brief in Markdown: target user, problem,
3–5 screens (what each shows and what the user can do), the data we save,
and what is out of scope for version 1.
```

## Prompt P.2 · The UI spec

```
Turn this brief into a UI spec: for each screen list the components top to bottom,
the empty, loading and error states, and the main action.
Suggest a calm color palette and type scale. Keep it to one page.
```

## Prompt D.1 · Screens (Google Stitch or UX Pilot)

```
A calm mobile habit tracker called Daily. Today screen: a list of habits with a round
check button and a streak count. Off-white background, violet accent #5B21B6,
generous spacing, iOS style, no gradients.
```

## Prompt D.2 · Design to code (coding agent, with the image attached)

```
Build this screen to match the attached image. Use colors from src/theme.ts and the
components in src/components. Do not add features that are not in the image.
```

## What AI still gets wrong

| Limit | Fix |
|---|---|
| Generic look | Give it a design and your theme file |
| Outdated APIs | Pin versions, point it to the docs |
| Forgets context | Keep the brief and rules in files |
| Invents things | Ask for a plan, check every diff |
| Security blind spots | Run a security review prompt |
| Says "done" too early | Run it yourself, on a phone |
